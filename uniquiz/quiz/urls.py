from django.urls import path
from .apis import StartQuiz, Answer, QuizList

urlpatterns = [
    path('start_quiz/', StartQuiz.as_view()),
    path('answer/', Answer.as_view()),
    path('ranking/', QuizList.as_view()),
]