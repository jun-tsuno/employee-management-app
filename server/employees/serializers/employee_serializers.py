from rest_framework import serializers

from ..models import Employees

class EmployeesSerializer(serializers.ModelSerializer):
  employment_type_data = serializers.SerializerMethodField()
  position_data = serializers.SerializerMethodField()
  department_data = serializers.SerializerMethodField()

  class Meta:
    model = Employees
    fields = [
      'id',
      'employee_number',
      'first_name',
      'last_name',
      'tel',
      'email',
      'hired_date',
      'is_on_leave',
      'salary',
      'employment_type_data',
      'position_data',
      'department_data',
      'updated_at'
    ]

  def get_employment_type_data(self, obj):
    return {'key': obj.employment_type, 'name': obj.get_employment_type_display()}

  def get_position_data(self, obj):
    return { 'id': obj.position.id, 'name': obj.position.get_title_display() } if obj.position else None

  def get_department_data(self, obj):
    return { 'id': obj.department.id, 'name': obj.department.name }if obj.department else None


class EmployeeWriteSerializer(serializers.ModelSerializer):
  class Meta:
    model = Employees
    exclude = ['id', 'employee_number', 'updated_at']
    read_only_fields = ['employee_number']