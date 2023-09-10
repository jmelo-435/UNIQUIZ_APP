from rest_framework.response import Response
from rest_framework.views import APIView
from .services import start_quiz,get_question,answer_question
from rest_framework import generics
from .serializers import QuizSerializer
from quiz.models import Quiz
from rest_framework.pagination import PageNumberPagination

#Classe que define a paginação dos resultados do ranking
class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

#Endpoint que retorna o ranking (uma lista de quizzes ordenados por score).
class QuizList(generics.ListAPIView):
    permission_classes = []
    #Acrescenta a posição do quiz no rank ao resultado
    def get_queryset(self):
        queryset = Quiz.objects.all().order_by('-total_score')
        for i in range(len(queryset)):
            queryset[i].rank = i+1
        return queryset
    #Acrescenta o ranking ao serializer
    def get_serializer_class(self):
        return QuizSerializer


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

#Endpoint que recebe a resposta da pergunta atual e retorna a próxima pergunta, ou o score e a posição do quiz no rank caso o quiz tenha acabado.
class Answer(APIView):
    permission_classes = []
    
    def post(self, request):
        quiz_id = request.COOKIES.get('quiz_id')
        answer = request.data.get('answer')
        answer_question(quiz_id, answer)
        next_question = get_question(quiz_id)
        try:
            if next_question['is_quiz_over'] == True:
                response = Response({'status': 'ok', 'is_quiz_over': True, 'score': next_question['score'], 'rank': next_question['rank']})
                response.set_cookie('quiz_id', '', max_age=0)
                return response
        except:
            pass
        return Response({'status': 'ok', 'is_quiz_over': False, 'question': next_question})
    