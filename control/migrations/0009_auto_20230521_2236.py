# Generated by Django 3.1.7 on 2023-05-21 21:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('control', '0008_auto_20230521_2235'),
    ]

    operations = [
        migrations.AlterField(
            model_name='management',
            name='last_access',
            field=models.DateField(),
        ),
    ]
