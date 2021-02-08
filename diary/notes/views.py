from rest_framework import viewsets

from .serializers import NotesSerializer
from .models import Notes

# Create your views here.
class NotesViewSet(viewsets.ModelViewSet):
    queryset = Notes.objects.all().order_by('title')
    serializer_class = NotesSerializer

