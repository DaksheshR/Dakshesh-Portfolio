# Dakshesh Portfolio

A production-ready personal portfolio application with a **Next.js** frontend and **Django REST** backend, featuring a full admin CMS to dynamically manage all content.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15 (App Router), TypeScript, Tailwind CSS v4 |
| HTTP Client | Axios |
| Backend | Django 5, Django REST Framework |
| Auth | JWT via djangorestframework-simplejwt (HttpOnly cookies) |
| Database | PostgreSQL |

## Project Structure

```
├── backend/           # Django REST API
│   ├── config/        # Project settings, URLs, WSGI/ASGI
│   ├── apps/
│   │   ├── users/     # Custom User model & JWT auth
│   │   └── portfolio/ # Portfolio content models & API
│   ├── media/         # Uploaded files
│   └── requirements.txt
│
└── frontend/          # Next.js application
    ├── src/
    │   ├── app/       # App Router pages & layouts
    │   ├── components/# UI components & sections
    │   ├── context/   # Auth & Theme providers
    │   ├── lib/       # Axios instance
    │   ├── services/  # API service functions
    │   ├── types/     # TypeScript interfaces
    │   └── utils/     # Helper functions
    └── package.json
```

## Getting Started

### Prerequisites

- **Python 3.11+** with pip
- **Node.js 18+** with npm
- **PostgreSQL 16+**

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate       # Windows
# source venv/bin/activate  # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Configure environment
copy .env.example .env      # Windows
# cp .env.example .env      # macOS/Linux
# Edit .env with your database credentials

# Create database
# psql -U postgres -c "CREATE DATABASE dakshesh_portfolio;"

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create admin superuser
python manage.py createsuperuser

# Start development server
python manage.py runserver
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Access the Application

- **Portfolio**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin
- **Admin Login**: http://localhost:3000/login
- **Django API**: http://localhost:8000/api/
- **Django Admin**: http://localhost:8000/admin/django/

## API Endpoints

### Authentication
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/login/` | Public | Login, returns JWT cookies |
| POST | `/api/auth/logout/` | Authenticated | Logout, clears cookies |
| POST | `/api/auth/refresh/` | Public | Refresh access token |
| GET | `/api/auth/me/` | Authenticated | Get current user |

### Portfolio Content
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/portfolio/hero/` | Public | Get hero section |
| GET | `/api/portfolio/about/` | Public | Get about section |
| GET | `/api/portfolio/skills/` | Public | List skills |
| GET | `/api/portfolio/projects/` | Public | List projects |
| GET | `/api/portfolio/education/` | Public | List education |
| POST | `/api/portfolio/contact/` | Public | Submit contact form |
| POST/PUT/PATCH/DELETE | `/api/portfolio/*/` | Admin | Full CRUD |

## Features

### Public Portfolio
- ✅ Hero section with typing animation
- ✅ About section with animated counters
- ✅ Skills section with animated progress bars
- ✅ Projects section with filter & hover effects
- ✅ Education timeline
- ✅ Contact form with validation
- ✅ Dark/Light mode toggle
- ✅ Responsive design
- ✅ Glassmorphism UI
- ✅ SEO optimized

### Admin Dashboard
- ✅ JWT authentication with HttpOnly cookies
- ✅ Dashboard overview with stats
- ✅ CRUD for all content sections
- ✅ Messages inbox with read/reply
- ✅ Protected routes with auth guard

## Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Deploy to Vercel: vercel --prod
```

### Backend (Railway / Render)
- Set environment variables from `.env.example`
- Configure PostgreSQL database
- Run migrations
- Set `DEBUG=False` and update `ALLOWED_HOSTS`
- Use gunicorn as the WSGI server:
  ```bash
  gunicorn config.wsgi:application --bind 0.0.0.0:8000
  ```

## License

MIT
