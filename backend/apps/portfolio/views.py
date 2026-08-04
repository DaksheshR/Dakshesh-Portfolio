"""
ViewSets for portfolio content models.

Permission strategy:
- Public visitors: GET (list/retrieve) on all content endpoints + POST on contact.
- Authenticated admin users: Full CRUD on all content endpoints.
"""

from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import (
    AboutSection,
    ContactMessage,
    Education,
    HeroSection,
    Project,
    Skill,
)
from .serializers import (
    AboutSectionSerializer,
    ContactMessageAdminSerializer,
    ContactMessageSerializer,
    EducationSerializer,
    HeroSectionSerializer,
    ProjectSerializer,
    SkillSerializer,
)


class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Custom permission: read-only for unauthenticated users,
    full access for admin (is_staff) users.
    """

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_staff


class HeroSectionViewSet(viewsets.ModelViewSet):
    """
    ViewSet for the Hero section.

    GET /api/portfolio/hero/ — Returns the hero section (public).
    PUT/PATCH /api/portfolio/hero/<id>/ — Update hero section (admin only).
    """

    queryset = HeroSection.objects.all()
    serializer_class = HeroSectionSerializer
    permission_classes = [IsAdminOrReadOnly]
    pagination_class = None  # Singleton — no pagination needed


class AboutSectionViewSet(viewsets.ModelViewSet):
    """
    ViewSet for the About section.

    GET /api/portfolio/about/ — Returns the about section (public).
    PUT/PATCH /api/portfolio/about/<id>/ — Update about section (admin only).
    """

    queryset = AboutSection.objects.all()
    serializer_class = AboutSectionSerializer
    permission_classes = [IsAdminOrReadOnly]
    pagination_class = None  # Singleton — no pagination needed


class SkillViewSet(viewsets.ModelViewSet):
    """
    ViewSet for skills.

    GET /api/portfolio/skills/ — List all skills grouped by category (public).
    POST /api/portfolio/skills/ — Create a skill (admin only).
    PUT/PATCH/DELETE /api/portfolio/skills/<id>/ — Manage skills (admin only).
    """

    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [IsAdminOrReadOnly]
    pagination_class = None  # Skills list is small enough

    def get_queryset(self):
        """Optionally filter by category."""
        queryset = super().get_queryset()
        category = self.request.query_params.get("category")
        if category:
            queryset = queryset.filter(category=category)
        return queryset


class ProjectViewSet(viewsets.ModelViewSet):
    """
    ViewSet for portfolio projects.

    GET /api/portfolio/projects/ — List all projects (public).
    POST /api/portfolio/projects/ — Create a project (admin only).
    PUT/PATCH/DELETE /api/portfolio/projects/<id>/ — Manage projects (admin only).
    """

    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAdminOrReadOnly]
    lookup_field = "slug"

    def get_queryset(self):
        """Optionally filter by featured status."""
        queryset = super().get_queryset()
        is_featured = self.request.query_params.get("featured")
        if is_featured is not None:
            queryset = queryset.filter(is_featured=is_featured.lower() == "true")
        return queryset


class EducationViewSet(viewsets.ModelViewSet):
    """
    ViewSet for education entries.

    GET /api/portfolio/education/ — List education timeline (public).
    POST /api/portfolio/education/ — Create entry (admin only).
    PUT/PATCH/DELETE /api/portfolio/education/<id>/ — Manage entries (admin only).
    """

    queryset = Education.objects.all()
    serializer_class = EducationSerializer
    permission_classes = [IsAdminOrReadOnly]
    pagination_class = None  # Timeline is small enough


class ContactMessageViewSet(viewsets.ModelViewSet):
    """
    ViewSet for contact form messages.

    POST /api/portfolio/contact/ — Submit a contact message (public, throttled).
    GET /api/portfolio/contact/ — List messages (admin only).
    PATCH /api/portfolio/contact/<id>/ — Mark as read (admin only).
    DELETE /api/portfolio/contact/<id>/ — Delete a message (admin only).
    """

    queryset = ContactMessage.objects.all()
    http_method_names = ["get", "post", "patch", "delete", "head", "options"]

    def get_permissions(self):
        """Allow public POST (contact form), restrict everything else to admin."""
        if self.action == "create":
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]

    def get_serializer_class(self):
        """Use admin serializer for non-create actions."""
        if self.action == "create":
            return ContactMessageSerializer
        return ContactMessageAdminSerializer

    def get_throttles(self):
        """Apply stricter throttling on public contact form submissions."""
        if self.action == "create":
            from rest_framework.throttling import AnonRateThrottle
            return [AnonRateThrottle()]
        return super().get_throttles()

    @action(detail=True, methods=["patch"])
    def mark_read(self, request, pk=None):
        """Mark a contact message as read."""
        message = self.get_object()
        message.is_read = True
        message.save(update_fields=["is_read"])
        serializer = ContactMessageAdminSerializer(message)
        return Response(serializer.data, status=status.HTTP_200_OK)
