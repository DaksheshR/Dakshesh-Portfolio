#!/usr/bin/env bash
# ─── Render Build Script ─────────────────────────────────────────────────────
# This script runs during Render's build phase for the Django backend.

set -o errexit  # Exit on error

# Install Python dependencies
pip install -r requirements.txt

# Collect static files (CSS, JS, admin assets) into STATIC_ROOT
python manage.py collectstatic --no-input

# Run database migrations
python manage.py migrate
