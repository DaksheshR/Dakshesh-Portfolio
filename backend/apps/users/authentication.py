"""
Custom JWT authentication that reads the access token from HttpOnly cookies.

The default `JWTAuthentication` from simplejwt reads from the
`Authorization` header. Since this SPA stores tokens in HttpOnly
cookies (set by LoginView / RefreshTokenView), we need a custom
backend that pulls the token from `request.COOKIES`.
"""

from django.conf import settings
from rest_framework_simplejwt.authentication import JWTAuthentication


class CookieJWTAuthentication(JWTAuthentication):
    """
    Extends JWTAuthentication to read the access token from an HttpOnly cookie
    instead of the Authorization header.

    Falls back to the standard header-based auth if no cookie is present,
    allowing both cookie-based (SPA) and header-based (API client) auth.
    """

    def authenticate(self, request):
        # Try cookie-based auth first
        cookie_name = settings.SIMPLE_JWT.get("AUTH_COOKIE", "access_token")
        raw_token = request.COOKIES.get(cookie_name)

        if raw_token is not None:
            try:
                validated_token = self.get_validated_token(raw_token)
                user = self.get_user(validated_token)
                return (user, validated_token)
            except Exception:
                # Token is invalid/expired — return None so AllowAny
                # views (login, public portfolio) still work.
                # The frontend interceptor will handle refresh.
                return None

        # Fall back to header-based auth (Authorization: Bearer <token>)
        return super().authenticate(request)
