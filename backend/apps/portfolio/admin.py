"""Django admin configuration for portfolio models."""

from django.contrib import admin

from .models import (
    AboutSection,
    ContactMessage,
    Education,
    HeroSection,
    Project,
    Skill,
)


@admin.register(HeroSection)
class HeroSectionAdmin(admin.ModelAdmin):
    list_display = ["title", "subtitle", "updated_at"]


@admin.register(AboutSection)
class AboutSectionAdmin(admin.ModelAdmin):
    list_display = ["__str__", "years_experience", "projects_completed", "updated_at"]


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ["name", "category", "proficiency", "ordering"]
    list_filter = ["category"]
    list_editable = ["ordering", "proficiency"]
    search_fields = ["name"]


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ["title", "is_featured", "ordering", "created_at"]
    list_filter = ["is_featured"]
    list_editable = ["is_featured", "ordering"]
    search_fields = ["title", "description"]
    prepopulated_fields = {"slug": ("title",)}


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ["institution", "degree", "field_of_study", "start_date", "end_date", "ordering"]
    list_editable = ["ordering"]


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ["subject", "name", "email", "is_read", "created_at"]
    list_filter = ["is_read"]
    readonly_fields = ["name", "email", "subject", "message", "created_at"]
    search_fields = ["name", "email", "subject"]
