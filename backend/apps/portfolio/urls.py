"""URL patterns for portfolio API endpoints using DRF routers."""

from django.urls import include, path
from rest_framework.routers import DefaultRouter

from . import views

app_name = "portfolio"

router = DefaultRouter()
router.register(r"hero", views.HeroSectionViewSet, basename="hero")
router.register(r"about", views.AboutSectionViewSet, basename="about")
router.register(r"skills", views.SkillViewSet, basename="skill")
router.register(r"projects", views.ProjectViewSet, basename="project")
router.register(r"education", views.EducationViewSet, basename="education")
router.register(r"contact", views.ContactMessageViewSet, basename="contact")

urlpatterns = [
    path("", include(router.urls)),
]
