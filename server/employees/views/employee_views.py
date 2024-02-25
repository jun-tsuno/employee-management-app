from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from ..models import Employees
from ..serializers import EmployeesSerializer, EmployeeWriteSerializer
from ..utils.pagination import CustomPageNumberPagination
from ..filters.employee_filters import EmployeeFilter
# Create your views here.

class EmployeesView(APIView):
  authentication_classes = [SessionAuthentication, TokenAuthentication]
  permission_classes = [IsAuthenticated]
  filter_class = EmployeeFilter

  def get(self, request):
    queryset = Employees.objects.all()
    filter_set = EmployeeFilter(request.query_params, queryset=queryset)
    if filter_set.is_valid():
      queryset = filter_set.qs

    paginator = CustomPageNumberPagination()
    page = paginator.paginate_queryset(queryset, request)
    if page is not None:
      serializer = EmployeesSerializer(page, many=True)
      return paginator.get_paginated_response(serializer.data)

    serializer = EmployeesSerializer(queryset, many=True)
    return Response(serializer.data)


  def post(self, request):
    serializer = EmployeeWriteSerializer(data=request.data)
    if serializer.is_valid():
      user = serializer.save()
      read_serializer = EmployeesSerializer(user)
      return Response({"data": read_serializer.data})
    print(serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EmployeeDetailView(APIView):
  authentication_classes = [SessionAuthentication, TokenAuthentication]
  permission_classes = [IsAuthenticated]

  def get(self, request, id):
    employee = get_object_or_404(Employees, pk=id)
    serializer = EmployeesSerializer(employee)
    return Response(serializer.data)

  def patch(self, request, id):
    employee = get_object_or_404(Employees, pk=id)
    serializer = EmployeeWriteSerializer(employee, data=request.data)
    if serializer.is_valid():
      employee = serializer.save()
      read_serializer = EmployeesSerializer(employee)
      return Response(read_serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  def delete(self, request, id):
    employee = get_object_or_404(Employees, pk=id)
    employee.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)