from django.urls import path
from .apis import StartQuiz

urlpatterns = [
    path('start_quiz/', StartQuiz.as_view()),
]