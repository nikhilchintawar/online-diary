from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination

from .serializers import NotesSerializer
from .models import Notes


class NotesPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"


class NotesViewSet(viewsets.ModelViewSet):
    queryset = Notes.objects.all().order_by("title")
    lookup_field = "pk"
    pagination_class = NotesPagination
    serializer_class = NotesSerializer
