from rest_framework.response import Response
from rest_framework.views import APIView
from .services import start_quiz,get_question,answer_question



#Endpoint que recebe um nome de jogador e inicia um quiz para ele, retornando o id do quiz via cookie
class StartQuiz(APIView):
    permission_classes = []
    def get(self, request):
        player_name = request.query_params.get('player_name')
        quiz = start_quiz(player_name)
        first_question = get_question(quiz.id)
        response = Response({'player_name': player_name,'start_time':quiz.start_time,'question':first_question})
        response.set_cookie('quiz_id', quiz.id)
        return response

#Endpoint que recebe a resposta da pergunta atual e retorna a próxima pergunta
class Answer(APIView):
    permission_classes = []
    
    def post(self, request):
        quiz_id = request.COOKIES.get('quiz_id')
        answer = request.data.get('answer')
        answer_question(quiz_id, answer)
        next_question = get_question(quiz_id)
        if next_question == True:
            response = Response({'status': 'ok', 'is_quiz_over': True})
            response.set_cookie('quiz_id', '', max_age=0)
            return response
        return Response({'status': 'ok', 'is_quiz_over': False, 'question': next_question})
    