"""
Authentication views for JWT-based login/logout/refresh.

Uses HttpOnly cookies for secure token storage in SPAs.
"""

from django.conf import settings
from django.contrib.auth import authenticate, get_user_model
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import LoginSerializer, UserSerializer

User = get_user_model()


class LoginView(APIView):
    """
    Authenticate user and return JWT tokens in HttpOnly cookies.

    POST /api/auth/login/
    Body: { "email": "...", "password": "..." }
    """

    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = authenticate(
            request,
            email=serializer.validated_data["email"],
            password=serializer.validated_data["password"],
        )

        if user is None:
            return Response(
                {"detail": "Invalid email or password."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        if not user.is_active:
            return Response(
                {"detail": "This account is inactive."},
                status=status.HTTP_403_FORBIDDEN,
            )

        # Generate JWT token pair
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)

        # Build response with user data
        response = Response(
            {
                "detail": "Login successful.",
                "user": UserSerializer(user).data,
            },
            status=status.HTTP_200_OK,
        )

        # Set tokens in HttpOnly cookies
        jwt_settings = settings.SIMPLE_JWT

        response.set_cookie(
            key=jwt_settings.get("AUTH_COOKIE", "access_token"),
            value=access_token,
            httponly=jwt_settings.get("AUTH_COOKIE_HTTP_ONLY", True),
            secure=jwt_settings.get("AUTH_COOKIE_SECURE", True),
            samesite=jwt_settings.get("AUTH_COOKIE_SAMESITE", "Lax"),
            path=jwt_settings.get("AUTH_COOKIE_PATH", "/"),
        )

        response.set_cookie(
            key=jwt_settings.get("REFRESH_COOKIE", "refresh_token"),
            value=refresh_token,
            httponly=jwt_settings.get("REFRESH_COOKIE_HTTP_ONLY", True),
            secure=jwt_settings.get("REFRESH_COOKIE_SECURE", True),
            samesite=jwt_settings.get("REFRESH_COOKIE_SAMESITE", "Lax"),
            path=jwt_settings.get("REFRESH_COOKIE_PATH", "/api/auth/refresh/"),
        )

        return response


class LogoutView(APIView):
    """
    Logout user by blacklisting the refresh token and clearing cookies.

    POST /api/auth/logout/
    """

    permission_classes = [IsAuthenticated]

    def post(self, request):
        jwt_settings = settings.SIMPLE_JWT

        # Blacklist the refresh token if present
        refresh_token = request.COOKIES.get(
            jwt_settings.get("REFRESH_COOKIE", "refresh_token")
        )
        if refresh_token:
            try:
                token = RefreshToken(refresh_token)
                token.blacklist()
            except Exception:
                pass  # Token may already be blacklisted or invalid

        response = Response(
            {"detail": "Logout successful."},
            status=status.HTTP_200_OK,
        )

        # Clear cookies
        response.delete_cookie(
            jwt_settings.get("AUTH_COOKIE", "access_token"),
            path=jwt_settings.get("AUTH_COOKIE_PATH", "/"),
        )
        response.delete_cookie(
            jwt_settings.get("REFRESH_COOKIE", "refresh_token"),
            path=jwt_settings.get("REFRESH_COOKIE_PATH", "/api/auth/refresh/"),
        )

        return response


class RefreshTokenView(APIView):
    """
    Refresh the access token using the refresh token from cookies.

    POST /api/auth/refresh/
    """

    permission_classes = [AllowAny]

    def post(self, request):
        jwt_settings = settings.SIMPLE_JWT
        refresh_token = request.COOKIES.get(
            jwt_settings.get("REFRESH_COOKIE", "refresh_token")
        )

        if not refresh_token:
            return Response(
                {"detail": "No refresh token provided."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        try:
            refresh = RefreshToken(refresh_token)
            new_access_token = str(refresh.access_token)

            response = Response(
                {"detail": "Token refreshed successfully."},
                status=status.HTTP_200_OK,
            )

            response.set_cookie(
                key=jwt_settings.get("AUTH_COOKIE", "access_token"),
                value=new_access_token,
                httponly=jwt_settings.get("AUTH_COOKIE_HTTP_ONLY", True),
                secure=jwt_settings.get("AUTH_COOKIE_SECURE", True),
                samesite=jwt_settings.get("AUTH_COOKIE_SAMESITE", "Lax"),
                path=jwt_settings.get("AUTH_COOKIE_PATH", "/"),
            )

            # If rotation is enabled, set the new refresh token
            if settings.SIMPLE_JWT.get("ROTATE_REFRESH_TOKENS", False):
                new_refresh_token = str(refresh)
                response.set_cookie(
                    key=jwt_settings.get("REFRESH_COOKIE", "refresh_token"),
                    value=new_refresh_token,
                    httponly=jwt_settings.get("REFRESH_COOKIE_HTTP_ONLY", True),
                    secure=jwt_settings.get("REFRESH_COOKIE_SECURE", True),
                    samesite=jwt_settings.get("REFRESH_COOKIE_SAMESITE", "Lax"),
                    path=jwt_settings.get(
                        "REFRESH_COOKIE_PATH", "/api/auth/refresh/"
                    ),
                )

            return response

        except Exception:
            return Response(
                {"detail": "Invalid or expired refresh token."},
                status=status.HTTP_401_UNAUTHORIZED,
            )


class MeView(APIView):
    """
    Return the authenticated user's profile data.

    GET /api/auth/me/
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)
