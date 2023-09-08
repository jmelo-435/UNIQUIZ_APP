from django.urls import path
from .apis import StartQuiz, Answer

urlpatterns = [
    path('start_quiz/', StartQuiz.as_view()),
    path('answer/', Answer.as_view()),
]