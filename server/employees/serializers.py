from rest_framework import serializers

from .models import Employees

class EmployeesSerializer(serializers.ModelSerializer):
  employment_type_display = serializers.SerializerMethodField()
  position_name = serializers.SerializerMethodField()
  department_name = serializers.SerializerMethodField()

  class Meta:
    model = Employees
    fields = [
      'id',
      'employee_id',
      'first_name',
      'last_name',
      'tel',
      'email',
      'hired_date',
      'is_on_leave',
      'salary',
      'employment_type_display',
      'position_name',
      'department_name',
      'updated_at'
    ]

  def get_employment_type_display(self, obj):
    return obj.get_employment_type_display()

  def get_position_name(self, obj):
    return obj.position.title if obj.position else None

  def get_department_name(self, obj):
    return obj.department.name if obj.department else None


class EmployeeWriteSerializer(serializers.ModelSerializer):
  class Meta:
    model = Employees
    exclude = ['id', 'employee_id', 'updated_at']
    read_only_fields = ['employee_id']