from django.db import models
from django.db.models import fields
from rest_framework import serializers

from .models import Notes

class NotesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Notes
        fields = ('title', 'description')