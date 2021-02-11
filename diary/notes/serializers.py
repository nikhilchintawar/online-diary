from django.db import models
from django.db.models import fields
from rest_framework import serializers

from .models import Notes


class NotesSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="notes-detail")

    class Meta:
        model = Notes
        fields = (
            "id",
            "title",
            "description",
            "url",
            "created_at",
            "updated_at",
        )
