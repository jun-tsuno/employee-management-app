# Generated by Django 5.0.1 on 2024-02-17 09:22

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employees', '0002_employees_is_on_leave_alter_employees_department_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employees',
            name='email',
            field=models.EmailField(max_length=254, unique=True),
        ),
        migrations.AlterField(
            model_name='employees',
            name='employee_id',
            field=models.CharField(max_length=80, unique=True),
        ),
        migrations.AlterField(
            model_name='employees',
            name='salary',
            field=models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0)]),
        ),
    ]
