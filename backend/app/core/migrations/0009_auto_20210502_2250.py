# Generated by Django 2.2.20 on 2021-05-02 22:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0008_auto_20210324_1555'),
    ]

    operations = [
        migrations.AddField(
            model_name='diagramstat',
            name='assets',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='diagramstat',
            name='security_control',
            field=models.IntegerField(default=0),
        ),
    ]
