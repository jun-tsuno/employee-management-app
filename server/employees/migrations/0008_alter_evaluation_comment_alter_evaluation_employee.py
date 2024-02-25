# Generated by Django 5.0.1 on 2024-02-25 08:23

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employees', '0007_remove_departments_head_departments_head'),
    ]

    operations = [
        migrations.AlterField(
            model_name='evaluation',
            name='comment',
            field=models.TextField(blank=True, max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='evaluation',
            name='employee',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='evaluation', to='employees.employees'),
        ),
    ]
