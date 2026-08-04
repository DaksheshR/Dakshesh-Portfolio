"""
Serializers for user authentication and profile management.
"""

from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """Serializer for the User model (read-only profile info)."""

    class Meta:
        model = User
        fields = ["id", "email", "first_name", "last_name", "is_staff", "date_joined"]
        read_only_fields = fields


class LoginSerializer(serializers.Serializer):
    """Serializer for user login credentials."""

    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True, write_only=True)
