# Generated by Django 5.0.1 on 2024-02-23 03:08

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employees', '0006_rename_employee_id_employees_employee_number'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='departments',
            name='head',
        ),
        migrations.AddField(
            model_name='departments',
            name='head',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='head', to='employees.employees'),
        ),
    ]