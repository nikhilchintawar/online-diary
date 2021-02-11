from django.db.models.fields import Field
from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination

from .serializers import NotesSerializer
from .models import Notes


class NotesPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"


class NotesViewSet(viewsets.ModelViewSet):
    lookup_field = "pk"
    pagination_class = NotesPagination
    serializer_class = NotesSerializer

    def get_queryset(self):
        notes = Notes.objects.all()
        default_order = "asc"
        sorts = {"asc": "created_at", "desc": "-created_at"}
        order_by = sorts.get(self.request.GET.get("sort", default_order))

        notes = notes.order_by(order_by)
        return notes

    # def save_note(self, serializer, is_update=Field, id):

    # def perform_create(self, serializer, **kwargs):
    #     id = kwargs.get('id', None)
