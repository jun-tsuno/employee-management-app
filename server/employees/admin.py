from django.contrib import admin

from .models import Positions, Departments, Employees, Evaluation

# Register your models here.
admin.site.register(Positions)
admin.site.register(Departments)
admin.site.register(Employees)
admin.site.register(Evaluation)
