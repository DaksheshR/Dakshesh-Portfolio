"""URL patterns for user authentication."""

from django.urls import path

from . import views

app_name = "users"

urlpatterns = [
    path("login/", views.LoginView.as_view(), name="login"),
    path("logout/", views.LogoutView.as_view(), name="logout"),
    path("refresh/", views.RefreshTokenView.as_view(), name="token-refresh"),
    path("me/", views.MeView.as_view(), name="me"),
]
