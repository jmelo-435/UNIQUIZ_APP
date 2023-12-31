# Generated by Django 4.2.4 on 2023-09-06 21:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Question",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("question_text", models.CharField(max_length=200)),
                ("option1", models.CharField(max_length=200)),
                ("option2", models.CharField(max_length=200)),
                ("option3", models.CharField(max_length=200)),
                ("option4", models.CharField(max_length=200)),
                ("option5", models.CharField(max_length=200)),
                ("correct_answer", models.IntegerField(default=1)),
            ],
        ),
        migrations.CreateModel(
            name="Quiz",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("player_name", models.CharField(max_length=200)),
                ("start_time", models.DateTimeField(auto_now_add=True, verbose_name="start time")),
                ("end_time", models.DateTimeField(verbose_name="end time")),
                ("answer1", models.IntegerField(default=0)),
                ("answer2", models.IntegerField(default=0)),
                ("answer3", models.IntegerField(default=0)),
                ("answer4", models.IntegerField(default=0)),
                ("answer5", models.IntegerField(default=0)),
                ("answer6", models.IntegerField(default=0)),
                ("answer7", models.IntegerField(default=0)),
                ("answer8", models.IntegerField(default=0)),
                ("answer9", models.IntegerField(default=0)),
                ("answer10", models.IntegerField(default=0)),
                (
                    "question1",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, related_name="question1", to="quiz.question"
                    ),
                ),
                (
                    "question10",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, related_name="question10", to="quiz.question"
                    ),
                ),
                (
                    "question2",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, related_name="question2", to="quiz.question"
                    ),
                ),
                (
                    "question3",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, related_name="question3", to="quiz.question"
                    ),
                ),
                (
                    "question4",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, related_name="question4", to="quiz.question"
                    ),
                ),
                (
                    "question5",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, related_name="question5", to="quiz.question"
                    ),
                ),
                (
                    "question6",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, related_name="question6", to="quiz.question"
                    ),
                ),
                (
                    "question7",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, related_name="question7", to="quiz.question"
                    ),
                ),
                (
                    "question8",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, related_name="question8", to="quiz.question"
                    ),
                ),
                (
                    "question9",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, related_name="question9", to="quiz.question"
                    ),
                ),
            ],
        ),
    ]
