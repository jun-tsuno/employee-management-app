from django.urls import path

from . import views

urlpatterns = [
  path('', views.EmployeesView.as_view()),
  path('<int:id>', views.EmployeeDetailView.as_view()),
]