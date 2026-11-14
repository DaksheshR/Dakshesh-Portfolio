"""
Root URL configuration for Dakshesh Portfolio.
"""

from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.http import JsonResponse
from django.urls import include, path


def health_check(request):
    """Lightweight health check endpoint for uptime monitoring and keep-alive pings."""
    return JsonResponse({"status": "ok"})


urlpatterns = [
    path("health/", health_check, name="health_check"),
    path("api/health/", health_check, name="api_health_check"),
    path("admin/django/", admin.site.urls),
    path("api/auth/", include("apps.users.urls")),
    path("api/portfolio/", include("apps.portfolio.urls")),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
