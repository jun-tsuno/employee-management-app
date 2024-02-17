from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

import uuid

# Create your models here.
class Positions(models.Model):
  POSITION_CHOICES = (
    ('manager', 'Manager'),
    ('head', 'Head'),
    ('leader', 'Leader'),
    ('staff', 'Staff')
  )
  title = models.CharField(max_length=50, choices=POSITION_CHOICES)
  description = models.CharField(max_length=120)

  def __str__(self):
    return self.get_title_display()


class Departments(models.Model):
  name = models.CharField(max_length=80)
  description = models.CharField(max_length=120)
  head = models.ManyToManyField('Employees', related_name='head', blank=True)

  def __str__(self):
    return self.name


class Employees(models.Model):
  EMPLOYMENT_TYPE = (
    ('full_time', 'Full-time'),
    ('part_time', 'Part-time'),
    ('contract', 'Contract'),
    ('freelance', 'Freelance')
  )
  employee_id = models.CharField(max_length=80, unique=True)
  first_name = models.CharField(max_length=50)
  last_name = models.CharField(max_length=50)
  tel = models.CharField(max_length=50, null=True)
  email = models.EmailField(unique=True)
  hired_date = models.DateField()
  is_on_leave = models.BooleanField(default=False)
  salary = models.IntegerField(validators=[MinValueValidator(0)], default=0)
  employment_type = models.CharField(max_length=30, choices=EMPLOYMENT_TYPE, null=True)
  position = models.ForeignKey(Positions, on_delete=models.SET_NULL, null=True, related_name='employees')
  department = models.ForeignKey(Departments, on_delete=models.SET_NULL, null=True, related_name='employees')
  updated_at = models.DateTimeField(auto_now=True)

  def save(self, *args, **kwargs):
    if not self.employee_id:
      self.employee_id = uuid.uuid4().hex
    super().save(*args, **kwargs)

  def __str__(self):
    return f"{self.first_name} {self.last_name}"


class Evaluation(models.Model):
  employee = models.OneToOneField(Employees, on_delete=models.CASCADE, related_name='evaluation')
  performance = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(5)], default=0)
  communication = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(5)], default=0)
  problem_solving = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(5)], default=0)
  team_work = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(5)], default=0)
  adaptability = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(5)], default=0)
  date = models.DateTimeField(auto_now=True)
  comment = models.TextField(max_length=500, null=True)

  def __str__(self):
    return f"Evaluation for {self.employee}"