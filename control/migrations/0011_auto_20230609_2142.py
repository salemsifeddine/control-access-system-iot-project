# Generated by Django 3.1.7 on 2023-06-09 20:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('control', '0010_management_accessed'),
    ]

    operations = [
        migrations.CreateModel(
            name='HallInfos',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('hall_name', models.CharField(default='GYM', max_length=50)),
                ('description', models.TextField(default='GYM ALGERIA')),
            ],
        ),
        migrations.AlterField(
            model_name='addathlete',
            name='image',
            field=models.ImageField(blank=True, default='image_management/default.png', null=True, upload_to='image_management'),
        ),
        migrations.AlterField(
            model_name='management',
            name='last_access',
            field=models.DateField(auto_now_add=True),
        ),
    ]
