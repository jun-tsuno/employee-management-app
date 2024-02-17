from django.urls import path

from .views import employee_views, department_views

urlpatterns = [
  path('', employee_views.EmployeesView.as_view()),
  path('<int:id>/', employee_views.EmployeeDetailView.as_view()),
  path('departments/', department_views.DepartmentsView.as_view()),
  path('departments/<int:id>/', department_views.DepartmentDetailView.as_view())
]