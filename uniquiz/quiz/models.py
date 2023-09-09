from django.db import models
from django.utils import timezone
import random



#Cria um modelo para as perguntas, com um campo para o texto da pergunta e cinco opções de resposta, alem do campo contendo qual a resposta correta
class Question(models.Model):
    question_text = models.CharField(max_length=200)
    option1 = models.CharField(max_length=200)
    option2 = models.CharField(max_length=200)
    option3 = models.CharField(max_length=200)
    option4 = models.CharField(max_length=200)
    option5 = models.CharField(max_length=200)
    correct_answer = models.IntegerField(default=1)

    def __str__(self):
        return self.question_text



#Cria um modelo para o quiz, contendo o time stamp de início e o time stamp do fim. Além de dez perguntas , que são definidas 
# como chaves estrangeiras para o modelo de perguntas. As perguntas podem ser definidas como certas, erradas ou não respondidas.
class Quiz(models.Model):

    id = models.AutoField(primary_key=True)
    player_name = models.CharField(max_length=200)
    start_time = models.DateTimeField('start time', auto_now_add=True)
    end_time = models.DateTimeField('end time', null=True)
    question1 = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='question1')
    question2 = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='question2')
    question3 = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='question3')
    question4 = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='question4')
    question5 = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='question5')
    question6 = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='question6')
    question7 = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='question7')
    question8 = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='question8')
    question9 = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='question9')
    question10 = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='question10')
    answer1 = models.IntegerField(default=0)
    answer2 = models.IntegerField(default=0)
    answer3 = models.IntegerField(default=0)
    answer4 = models.IntegerField(default=0)
    answer5 = models.IntegerField(default=0)
    answer6 = models.IntegerField(default=0)
    answer7 = models.IntegerField(default=0)
    answer8 = models.IntegerField(default=0)
    answer9 = models.IntegerField(default=0)
    answer10 = models.IntegerField(default=0)
    current_question = models.IntegerField(default=1)
    total_score = models.DecimalField(default=0, max_digits=5, decimal_places=2)

    def __str__(self):
        return str(self.start_time) + " - " + str(self.end_time)
        
    #Define o tempo de fim do quiz como o momento atual, e calcula o score do quiz, dividindo o número de acertos pela duração do quiz
    def finish_quiz(self):
        self.end_time = timezone.now()
        score = 0
        duration = self.duration
        if self.answer1 == self.question1.correct_answer:
            score += 1
        if self.answer2 == self.question2.correct_answer:
            score += 1
        if self.answer3 == self.question3.correct_answer:
            score += 1
        if self.answer4 == self.question4.correct_answer:
            score += 1
        if self.answer5 == self.question5.correct_answer:
            score += 1
        if self.answer6 == self.question6.correct_answer:
            score += 1
        if self.answer7 == self.question7.correct_answer:
            score += 1
        if self.answer8 == self.question8.correct_answer:
            score += 1
        if self.answer9 == self.question9.correct_answer:
            score += 1
        if self.answer10 == self.question10.correct_answer:
            score += 1
        points=score/duration
        self.total_score=points
        self.save()

    #Associa uma pergunta aleatória(sem que hajam perguntas repetidas) a cada campo de pergunta do quiz no momento da criação do quiz
    def save(self, *args, **kwargs):
        if self.pk is not None:
            return super(Quiz, self).save(*args, **kwargs)
        questions = list(Question.objects.all())

        random_items = random.sample(questions, 10)
        self.question1 = random_items[0]
        self.question2 = random_items[1]
        self.question3 = random_items[2]
        self.question4 = random_items[3]
        self.question5 = random_items[4]
        self.question6 = random_items[5]
        self.question7 = random_items[6]
        self.question8 = random_items[7]
        self.question9 = random_items[8]
        self.question10 = random_items[9]
        super(Quiz, self).save(*args, **kwargs)

    #Define se o quiz está em andamento ou não
    @property
    def is_active(self)->bool:
        return self.end_time is None

    #Retorna o tempo de duração do quiz
    @property
    def duration(self)->int:
        if self.end_time is None:
            return 0
        return (self.end_time - self.start_time).seconds