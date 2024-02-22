from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from collections import OrderedDict

class CustomPageNumberPagination(PageNumberPagination):
  page_size_query_param = 'size'
  max_page_size = 15

  def get_paginated_response(self, data):
    return Response(
      OrderedDict(
        [
          ('total_count', self.page.paginator.count),
          ('current_page', self.page.number),
          ('results', data)
        ]
      )
    )