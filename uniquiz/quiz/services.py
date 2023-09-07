from quiz.models import Quiz

#FUncção que recebe um nome d ejogador e inicia um quiz para ele
def start_quiz(player_name: str) -> Quiz:
    quiz = Quiz(player_name=player_name)
    quiz.save()
    return quiz