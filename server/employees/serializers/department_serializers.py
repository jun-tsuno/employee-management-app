from rest_framework import serializers

from ..models import Departments

class DepartmentsSerializer(serializers.ModelSerializer):
  head_data = serializers.SerializerMethodField()

  class Meta:
    model = Departments
    fields = [
      'id',
      'name',
      'description',
      'head_data'
    ]

  def get_head_data(self, obj):
    return {'id': obj.head.id, 'name': f"{obj.head.first_name} {obj.head.last_name}"} if obj.head else None


class DepartmentWiteSerializer(serializers.ModelSerializer):
  class Meta:
    model = Departments
    exclude = ['id']