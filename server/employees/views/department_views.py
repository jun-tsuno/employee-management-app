from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from ..models import Departments
from ..serializers import DepartmentsSerializer, DepartmentWiteSerializer

# Create your views here.

class DepartmentsView(APIView):
  authentication_classes = [SessionAuthentication, TokenAuthentication]
  permission_classes = [IsAuthenticated]

  def get(self, request):
    departments = Departments.objects.all()
    serializer = DepartmentsSerializer(departments, many=True)
    return Response({"data": serializer.data})

  def post(self, request):
    serializer = DepartmentWiteSerializer(data=request.data)
    if serializer.is_valid():
      department = serializer.save()
      read_serializer = DepartmentsSerializer(department)
      return Response({"data": read_serializer.data}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DepartmentDetailView(APIView):
  authentication_classes = [SessionAuthentication, TokenAuthentication]
  permission_classes = [IsAuthenticated]

  def get(self, request, id):
    department = get_object_or_404(Departments, pk=id)
    serializer = DepartmentsSerializer(department)
    return Response({"data": serializer.data})

  def patch(self, request, id):
    department = get_object_or_404(Departments, pk=id)
    serializer = DepartmentsSerializer(department, data=request.data)
    if serializer.is_valid():
      updated_department = serializer.save()
      read_serializer = DepartmentsSerializer(updated_department)
      return Response({"data": read_serializer.data})
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  def delete(self, request, id):
    department = get_object_or_404(Departments, pk=id)
    department.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)