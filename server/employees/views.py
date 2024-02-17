from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import Employees
from .serializers import EmployeesSerializer, EmployeeWriteSerializer

# Create your views here.

class EmployeesView(APIView):
  authentication_classes = [SessionAuthentication, TokenAuthentication]
  permission_classes = [IsAuthenticated]

  def get(self, request):
    employees = Employees.objects.all().order_by('-updated_at')
    serializer = EmployeesSerializer(employees, many=True)
    return Response({"data": serializer.data})

  def post(self, request):
    serializer = EmployeeWriteSerializer(data=request.data)
    if serializer.is_valid():
      user = serializer.save()
      read_serializer = EmployeesSerializer(user)
      return Response({"data": read_serializer.data})
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EmployeeDetailView(APIView):
  authentication_classes = [SessionAuthentication, TokenAuthentication]
  permission_classes = [IsAuthenticated]

  def get(self, request, id):
    employee = get_object_or_404(Employees, pk=id)
    serializer = EmployeesSerializer(employee)
    return Response({"data": serializer.data})