"""Tests for the portfolio app."""

from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient

from .models import ContactMessage, HeroSection, Project, Skill


class PortfolioPublicAPITests(TestCase):
    """Tests for public (unauthenticated) portfolio API access."""

    def setUp(self):
        self.client = APIClient()

        # Create test data
        self.hero = HeroSection.objects.create(
            title="Hi, I'm Dakshesh",
            subtitle="Full Stack Developer",
            tagline="Building amazing web applications",
        )

        self.skill = Skill.objects.create(
            name="Python",
            category="backend",
            proficiency=90,
        )

        self.project = Project.objects.create(
            title="Test Project",
            slug="test-project",
            description="A test project description",
            tech_stack=["Django", "React"],
            is_featured=True,
        )

    def test_list_hero_section(self):
        """Test public access to hero section."""
        response = self.client.get("/api/portfolio/hero/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_list_skills(self):
        """Test public access to skills list."""
        response = self.client.get("/api/portfolio/skills/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_list_projects(self):
        """Test public access to projects list."""
        response = self.client.get("/api/portfolio/projects/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_filter_featured_projects(self):
        """Test filtering projects by featured status."""
        response = self.client.get("/api/portfolio/projects/?featured=true")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_submit_contact_message(self):
        """Test public contact form submission."""
        data = {
            "name": "John Doe",
            "email": "john@example.com",
            "subject": "Hello!",
            "message": "Great portfolio!",
        }
        response = self.client.post("/api/portfolio/contact/", data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(ContactMessage.objects.filter(email="john@example.com").exists())

    def test_cannot_create_skill_unauthenticated(self):
        """Test that unauthenticated users cannot create skills."""
        data = {"name": "JavaScript", "category": "frontend", "proficiency": 85}
        response = self.client.post("/api/portfolio/skills/", data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_cannot_delete_project_unauthenticated(self):
        """Test that unauthenticated users cannot delete projects."""
        response = self.client.delete(f"/api/portfolio/projects/{self.project.slug}/")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
