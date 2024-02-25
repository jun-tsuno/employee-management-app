from django_filters import rest_framework as filters
from django.db.models import Q

from ..models import Employees


class EmployeeFilter(filters.FilterSet):
  q = filters.CharFilter(method='filter_by_query')
  is_on_leave = filters.BooleanFilter()
  employment_type = filters.CharFilter()
  position = filters.CharFilter()
  order = filters.OrderingFilter(
    fields = (
      ('hired_date', 'hired_date')
    )
  )

  class Meta:
    model = Employees
    fields = ['is_on_leave', 'employment_type', 'position']

  def filter_by_query(self, queryset, name, value):
    return queryset.filter(
      Q(first_name__icontains=value) | Q(last_name__icontains=value)
    )

  # Filter can be done in view like this...
  # is_on_leave = request.query_params.get('is_on_leave')
  # if is_on_leave is not None:
  #   if is_on_leave.lower() in ['true']:
  #     queryset = queryset.filter(is_on_leave=True)
  #   elif is_on_leave.lower() in ['false']:
  #     queryset = queryset.filter(is_on_leave=False)

  # employment_type = request.query_params.get('employment_type')
  # if employment_type is not None:
  #   queryset = queryset.filter(employment_type=employment_type)

  # order_by = request.query_params.get('order_by', 'dec')
  # if order_by == 'dec':
  #   queryset = queryset.order_by('-hired_date')
  # elif order_by == 'asc':
  #   queryset = queryset.order_by('hired_date')

  # position = request.query_params.get('position')
  # if position is not None:
  #   queryset = queryset.filter(position=position)