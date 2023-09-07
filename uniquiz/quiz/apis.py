from rest_framework.response import Response
from rest_framework.views import APIView
from .services import start_quiz


#Endpoint que recebe um nome de jogador e inicia um quiz para ele, retornando o id do quiz via cookie
class StartQuiz(APIView):
    permission_classes = []
    def get(self, request):
        player_name = request.query_params.get('player_name')
        quiz = start_quiz(player_name)
        response = Response({'player_name': player_name,'start_time':quiz.start_time})
        response.set_cookie('quiz_id', quiz.id)
        return response