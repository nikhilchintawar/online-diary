from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views as drf_views
from .views import NotesViewSet

router = DefaultRouter()
router.register(r"notes", NotesViewSet, basename="notes")

urlpatterns = [
    path("", include(router.urls)),
    path("auth-token/", drf_views.obtain_auth_token, name="auth_token"),
]
