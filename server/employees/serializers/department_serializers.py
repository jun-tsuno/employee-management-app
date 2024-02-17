from rest_framework import serializers

from ..models import Departments

class DepartmentsSerializer(serializers.ModelSerializer):
  class Meta:
    model = Departments
    fields = '__all__'


class DepartmentWiteSerializer(serializers.ModelSerializer):
  class Meta:
    model = Departments
    exclude = ['id']