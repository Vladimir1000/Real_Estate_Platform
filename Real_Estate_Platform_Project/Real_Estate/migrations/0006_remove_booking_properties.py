# Generated by Django 5.0.7 on 2024-07-25 15:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Real_Estate', '0005_booking_properties'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='booking',
            name='properties',
        ),
    ]
