from rest_framework import serializers
from quiz.models import Quiz, Question

class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = ['player_name', 'start_time', 'total_score','duration']

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['id','question_text', 'option1', 'option2', 'option3', 'option4','option5']