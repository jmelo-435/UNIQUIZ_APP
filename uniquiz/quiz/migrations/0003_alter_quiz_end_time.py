# Generated by Django 4.2.4 on 2023-09-07 15:20

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("quiz", "0002_alter_quiz_id"),
    ]

    operations = [
        migrations.AlterField(
            model_name="quiz",
            name="end_time",
            field=models.DateTimeField(null=True, verbose_name="end time"),
        ),
    ]