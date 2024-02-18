from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from ..models import Evaluation
from ..serializers import EvaluationSerializer, EvaluationWriteSerializer

# Create your views here.
class EvaluationView(APIView):
  authentication_classes = [SessionAuthentication, TokenAuthentication]
  permission_classes = [IsAuthenticated]

  def get(self, request, employee_id):
    evaluation = get_object_or_404(Evaluation, employee=employee_id)
    serializer = EvaluationSerializer(evaluation)
    return Response({"data": serializer.data})

  def post(self, request, employee_id):
    if Evaluation.objects.filter(employee_id=employee_id).exists():
      return Response({"detail": "Evaluation for this employee exists"}, status=status.HTTP_400_BAD_REQUEST)

    serializer = EvaluationWriteSerializer(data=request.data)
    if serializer.is_valid():
      evaluation = serializer.save(employee_id=employee_id)
      read_serializer = EvaluationSerializer(evaluation)
      return Response({"data": read_serializer.data}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EvaluationUpdateView(APIView):
  authentication_classes = [SessionAuthentication, TokenAuthentication]
  permission_classes = [IsAuthenticated]

  def patch(self, request, employee_id, evaluation_id):
    evaluation = get_object_or_404(Evaluation, pk=evaluation_id)
    serializer = EvaluationWriteSerializer(evaluation, data=request.data, partial=True)
    if serializer.is_valid():
      evaluation = serializer.save()
      read_serializer = EvaluationSerializer(evaluation)
      return Response({"data": read_serializer.data})
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


  def delete(self, request, employee_id, evaluation_id):
    evaluation = get_object_or_404(Evaluation, pk=evaluation_id)
    evaluation.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)