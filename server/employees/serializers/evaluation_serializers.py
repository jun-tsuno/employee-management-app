from rest_framework import serializers

from ..models import Evaluation

class EvaluationSerializer(serializers.ModelSerializer):
  class Meta:
    model = Evaluation
    fields = '__all__'


class EvaluationWriteSerializer(serializers.ModelSerializer):
  class Meta:
    model = Evaluation
    exclude = ['id', 'employee', 'date']