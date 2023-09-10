from rest_framework import serializers
from quiz.models import Quiz, Question

class QuizSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    player_name = serializers.CharField(max_length=200)
    start_time = serializers.DateTimeField()
    total_score = serializers.DecimalField(max_digits=5, decimal_places=2)
    rank = serializers.IntegerField()
    duration = serializers.IntegerField()
    
class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['id','question_text', 'option1', 'option2', 'option3', 'option4','option5']