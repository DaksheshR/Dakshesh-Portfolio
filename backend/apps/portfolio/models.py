"""
Portfolio content models.

All models include created_at/updated_at timestamps and an ordering field
for manual sort control via the admin dashboard.
"""

from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models


class TimeStampedModel(models.Model):
    """Abstract base model with created_at and updated_at timestamps."""

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


# ─── Hero Section ────────────────────────────────────────────────────────────


class HeroSection(TimeStampedModel):
    """
    Hero/landing section of the portfolio.

    Singleton-like: only one instance should exist. The frontend fetches
    the first (and only) record.
    """

    title = models.CharField(
        max_length=200,
        help_text="Main heading, e.g. 'Hi, I'm Dakshesh'",
    )
    subtitle = models.CharField(
        max_length=300,
        help_text="Professional title, e.g. 'Full Stack Developer'",
    )
    tagline = models.TextField(
        blank=True,
        help_text="Short description or typing-effect text",
    )
    profile_image = models.ImageField(
        upload_to="hero/",
        blank=True,
        null=True,
        help_text="Profile photo for the hero section",
    )
    resume_url = models.URLField(
        blank=True,
        help_text="Link to downloadable resume/CV",
    )
    github_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    twitter_url = models.URLField(blank=True)

    class Meta:
        verbose_name = "Hero Section"
        verbose_name_plural = "Hero Section"

    def __str__(self):
        return self.title


# ─── About Section ───────────────────────────────────────────────────────────


class AboutSection(TimeStampedModel):
    """
    About/bio section of the portfolio.

    Singleton-like: only one instance should exist.
    """

    description = models.TextField(
        help_text="Bio/about text (supports multiple paragraphs)",
    )
    image = models.ImageField(
        upload_to="about/",
        blank=True,
        null=True,
        help_text="Photo for the about section",
    )
    years_experience = models.PositiveIntegerField(
        default=0,
        help_text="Total years of professional experience",
    )
    projects_completed = models.PositiveIntegerField(
        default=0,
        help_text="Total number of completed projects",
    )
    happy_clients = models.PositiveIntegerField(
        default=0,
        help_text="Number of satisfied clients/collaborators",
    )

    class Meta:
        verbose_name = "About Section"
        verbose_name_plural = "About Section"

    def __str__(self):
        return "About Section"


# ─── Skills ──────────────────────────────────────────────────────────────────


class Skill(TimeStampedModel):
    """
    Individual skill with category and proficiency level.

    Displayed as grouped skill bars or cards on the portfolio.
    """

    class Category(models.TextChoices):
        FRONTEND = "frontend", "Frontend"
        BACKEND = "backend", "Backend"
        DATABASE = "database", "Database"
        DEVOPS = "devops", "DevOps"
        TOOLS = "tools", "Tools and Technologies"
        OTHER = "other", "Other"
        LANGUAGES = "languages", "Programming Languages"
        PROGRAMMING_LANGUAGES = "programming_languages", "Programming Languages"

    name = models.CharField(max_length=100)
    category = models.CharField(
        max_length=30,
        choices=Category.choices,
        default=Category.OTHER,
    )
    proficiency = models.PositiveIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(100)],
        help_text="Skill proficiency level (1-100)",
    )
    icon = models.CharField(
        max_length=100,
        blank=True,
        help_text="Icon class name or URL, e.g. 'SiPython' for react-icons",
    )
    ordering = models.PositiveIntegerField(
        default=0,
        help_text="Display order (lower = first)",
    )

    class Meta:
        ordering = ["ordering", "category", "name"]

    def __str__(self):
        return f"{self.name} ({self.get_category_display()})"


# ─── Projects ────────────────────────────────────────────────────────────────


class Project(TimeStampedModel):
    """
    Portfolio project with details, links, and images.

    Featured projects can be highlighted in the portfolio.
    """

    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    description = models.TextField(
        help_text="Detailed project description",
    )
    short_description = models.CharField(
        max_length=300,
        blank=True,
        help_text="One-liner for project cards",
    )
    tech_stack = models.JSONField(
        default=list,
        help_text='List of technologies, e.g. ["React", "Django", "PostgreSQL"]',
    )
    image = models.ImageField(
        upload_to="projects/",
        blank=True,
        null=True,
        help_text="Project screenshot or thumbnail",
    )
    live_url = models.URLField(
        blank=True,
        help_text="Link to live demo",
    )
    github_url = models.URLField(
        blank=True,
        help_text="Link to source code repository",
    )
    is_featured = models.BooleanField(
        default=False,
        help_text="Feature this project prominently",
    )
    ordering = models.PositiveIntegerField(
        default=0,
        help_text="Display order (lower = first)",
    )

    class Meta:
        ordering = ["ordering", "-created_at"]

    def __str__(self):
        return self.title


# ─── Education ───────────────────────────────────────────────────────────────


class Education(TimeStampedModel):
    """Education history entry displayed in a timeline."""

    institution = models.CharField(max_length=200)
    degree = models.CharField(
        max_length=200,
        help_text="e.g. 'Bachelor of Technology'",
    )
    field_of_study = models.CharField(
        max_length=200,
        help_text="e.g. 'Computer Science & Engineering'",
    )
    start_date = models.DateField()
    end_date = models.DateField(
        blank=True,
        null=True,
        help_text="Leave blank if currently studying",
    )
    description = models.TextField(
        blank=True,
        help_text="Notable achievements, GPA, activities, etc.",
    )
    logo = models.ImageField(
        upload_to="education/",
        blank=True,
        null=True,
        help_text="Institution logo",
    )
    ordering = models.PositiveIntegerField(
        default=0,
        help_text="Display order (lower = first)",
    )

    class Meta:
        ordering = ["ordering", "-start_date"]
        verbose_name_plural = "Education"

    def __str__(self):
        return f"{self.degree} — {self.institution}"


# ─── Contact Messages ───────────────────────────────────────────────────────


class ContactMessage(TimeStampedModel):
    """
    Contact form submissions from portfolio visitors.

    These are read-only from the admin dashboard — visitors submit them
    via the public contact form.
    """

    name = models.CharField(max_length=150)
    email = models.EmailField()
    subject = models.CharField(max_length=300)
    message = models.TextField()
    is_read = models.BooleanField(
        default=False,
        help_text="Mark as read after reviewing",
    )

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.subject} — {self.name}"
