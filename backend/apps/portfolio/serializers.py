"""
DRF serializers for all portfolio content models.
"""

from rest_framework import serializers

from .models import (
    AboutSection,
    ContactMessage,
    Education,
    HeroSection,
    Project,
    Skill,
)


class HybridImageField(serializers.ImageField):
    """
    Flexible image field that accepts:
    - Direct image URLs (e.g. Cloudinary, AWS S3, external URLs: https://...)
    - Local static paths (e.g. /images/...)
    - Standard file uploads (multipart/form-data)
    """

    def to_internal_value(self, data):
        if not data:
            return None
        # If it's a URL or string path, accept it directly without error!
        if isinstance(data, str):
            val = data.strip()
            if val.startswith("http://") or val.startswith("https://") or val.startswith("/") or val.startswith("data:"):
                return val
            if not val:
                return None
        # Otherwise, run standard DRF ImageField file validation
        return super().to_internal_value(data)

    def to_representation(self, value):
        if not value:
            return None
        val_str = str(getattr(value, "name", value))
        # If already an external URL or static path, return it directly
        if val_str.startswith("http://") or val_str.startswith("https://") or val_str.startswith("/"):
            return val_str
        # Otherwise, return standard Django media URL
        return super().to_representation(value)


class HeroSectionSerializer(serializers.ModelSerializer):
    """Serializer for the Hero section."""

    profile_image = HybridImageField(required=False, allow_null=True)

    class Meta:
        model = HeroSection
        fields = [
            "id",
            "title",
            "subtitle",
            "tagline",
            "profile_image",
            "resume_url",
            "github_url",
            "linkedin_url",
            "twitter_url",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]


class AboutSectionSerializer(serializers.ModelSerializer):
    """Serializer for the About section."""

    image = HybridImageField(required=False, allow_null=True)

    class Meta:
        model = AboutSection
        fields = [
            "id",
            "description",
            "image",
            "years_experience",
            "projects_completed",
            "happy_clients",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]


class SkillSerializer(serializers.ModelSerializer):
    """Serializer for individual skills."""

    category_display = serializers.CharField(
        source="get_category_display",
        read_only=True,
    )

    class Meta:
        model = Skill
        fields = [
            "id",
            "name",
            "category",
            "category_display",
            "proficiency",
            "icon",
            "ordering",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]


class ProjectSerializer(serializers.ModelSerializer):
    """Serializer for portfolio projects."""

    image = HybridImageField(required=False, allow_null=True)

    class Meta:
        model = Project
        fields = [
            "id",
            "title",
            "slug",
            "description",
            "short_description",
            "tech_stack",
            "image",
            "live_url",
            "github_url",
            "is_featured",
            "ordering",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]


class EducationSerializer(serializers.ModelSerializer):
    """Serializer for education entries."""

    class Meta:
        model = Education
        fields = [
            "id",
            "institution",
            "degree",
            "field_of_study",
            "start_date",
            "end_date",
            "description",
            "logo",
            "ordering",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]


class ContactMessageSerializer(serializers.ModelSerializer):
    """
    Serializer for contact form messages.

    Public visitors can create messages (write).
    Admin users can read and update (mark as read).
    """

    class Meta:
        model = ContactMessage
        fields = [
            "id",
            "name",
            "email",
            "subject",
            "message",
            "is_read",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "is_read", "created_at", "updated_at"]


class ContactMessageAdminSerializer(serializers.ModelSerializer):
    """Admin serializer that allows updating is_read status."""

    class Meta:
        model = ContactMessage
        fields = [
            "id",
            "name",
            "email",
            "subject",
            "message",
            "is_read",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "name", "email", "subject", "message", "created_at", "updated_at"]
