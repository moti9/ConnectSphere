# Generated by Django 4.1.13 on 2024-01-04 10:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blogapp', '0008_blog_username'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='blog',
            name='username',
        ),
    ]