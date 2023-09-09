from quiz.models import Quiz
from .serializers import  QuestionSerializer

#Função que recebe um nome de jogador e inicia um quiz para ele
def start_quiz(player_name: str) -> Quiz:
    quiz = Quiz(player_name=player_name)
    quiz.save()
    return quiz

#Função que retorna um quiz dado o id do quiz
def _get_quiz(quiz_id: int) -> Quiz:
    quiz = Quiz.objects.get(id=quiz_id)
    return quiz

#Função que retorna uma questão dado o id do quiz
def get_question(quiz_id: int) -> dict:
    quiz = _get_quiz(quiz_id)
    question_number = quiz.current_question
    if question_number > 10:
        quiz.finish_quiz()
        score = get_score(quiz_id)
        rank = get_rank(quiz_id)
        return {'is_quiz_over': True, 'score': score, 'rank': rank}
    question = getattr(quiz, f'question{question_number}')
    serializer = QuestionSerializer(question)
    return serializer.data

#Função que recebe o id do quiz e a resposta dada pelo jogador e salva a resposta no quiz
def answer_question(quiz_id: int, answer: int) -> bool:
    quiz = _get_quiz(quiz_id)
    question_number = quiz.current_question
    setattr(quiz, f'answer{question_number}', answer)
    quiz.current_question = question_number + 1
    quiz.save()

#Função que retorna o score do quiz.
def get_score(quiz_id: int) -> int:
    quiz = _get_quiz(quiz_id)
    score = quiz.total_score
    return score

#Função que retorna a posição do quiz no rank.
def get_rank(quiz_id: int) -> int:
    quiz = _get_quiz(quiz_id)
    rank = Quiz.objects.filter(total_score__gt=quiz.total_score).count() + 1
    return rank
