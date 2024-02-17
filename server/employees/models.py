from django.db import models
from django.core.validators import MinValueValidator

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
  employee_id = models.CharField(max_length=80, unique=True)
  first_name = models.CharField(max_length=50)
  last_name = models.CharField(max_length=50)
  tel = models.CharField(max_length=50, null=True)
  email = models.EmailField(unique=True)
  hired_date = models.DateField()
  is_on_leave = models.BooleanField(default=False)
  salary = models.IntegerField(validators=[MinValueValidator(0)], default=0)
  position = models.ForeignKey(Positions, on_delete=models.SET_NULL, null=True, related_name='employees')
  department = models.ForeignKey(Departments, on_delete=models.SET_NULL, null=True, related_name='employees')

  def __str__(self):
    return f"{self.first_name} {self.last_name}"
