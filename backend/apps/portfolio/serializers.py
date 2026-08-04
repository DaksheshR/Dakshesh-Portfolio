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


class HeroSectionSerializer(serializers.ModelSerializer):
    """Serializer for the Hero section."""

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
