from django.contrib import admin

from .models import Positions, Departments, Employees

# Register your models here.
admin.site.register(Positions)
admin.site.register(Departments)
admin.site.register(Employees)
