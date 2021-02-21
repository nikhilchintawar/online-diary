from django.db import models
from django.db.models import fields
from rest_framework import serializers

from .models import Notes


class NotesSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="notes-detail")
    year = serializers.SerializerMethodField()

    class Meta:
        model = Notes
        fields = (
            "id",
            "title",
            "description",
            "url",
            "year",
            "created_at",
            "updated_at",
        )

    def get_year(self, obj):
        return obj.created_at.year
