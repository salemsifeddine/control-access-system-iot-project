# Generated by Django 3.1.7 on 2023-05-09 00:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('control', '0006_remove_programtab_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='management',
            name='image',
        ),
        migrations.AddField(
            model_name='addathlete',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='image_management'),
        ),
        migrations.AlterField(
            model_name='addathlete',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='management',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='programtab',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='schedule',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]