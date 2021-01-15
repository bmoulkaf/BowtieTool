# Generated by Django 2.2.17 on 2021-01-13 19:55

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import taggit.managers


class Migration(migrations.Migration):

    dependencies = [
        ('taggit', '0003_taggeditem_add_unique_index'),
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='DiagramStat',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('threats', models.IntegerField(default=0)),
                ('consequences', models.IntegerField(default=0)),
                ('barriers', models.IntegerField(default=0)),
                ('time_Spent', models.FloatField(default=0)),
            ],
        ),
        migrations.RenameField(
            model_name='diagram',
            old_name='public',
            new_name='is_public',
        ),
        migrations.RenameField(
            model_name='diagram',
            old_name='user',
            new_name='owner',
        ),
        migrations.RemoveField(
            model_name='diagram',
            name='diagram',
        ),
        migrations.AddField(
            model_name='diagram',
            name='description',
            field=models.TextField(default=''),
        ),
        migrations.AddField(
            model_name='diagram',
            name='diagram_content',
            field=models.TextField(default=''),
        ),
        migrations.AddField(
            model_name='diagram',
            name='hours_spent',
            field=models.FloatField(default=0),
        ),
        migrations.AddField(
            model_name='diagram',
            name='reader',
            field=models.ManyToManyField(related_name='readers', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='diagram',
            name='tags',
            field=taggit.managers.TaggableManager(help_text='A comma-separated list of tags.', through='taggit.TaggedItem', to='taggit.Tag', verbose_name='Tags'),
        ),
        migrations.AddField(
            model_name='diagram',
            name='writer',
            field=models.ManyToManyField(related_name='writers', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='user',
            name='is_Researcher',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='diagram',
            name='diagram_stat',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='core.DiagramStat'),
        ),
    ]
