# Dakshesh Portfolio

A production-ready dynamic personal portfolio with a **Next.js** frontend and **Django REST** backend, featuring a full admin CMS to manage all content in real time.

> **How it works:** Visitors see your portfolio with data fetched dynamically from the backend. You log in as admin, add/edit projects, skills, education, etc., and changes go live instantly — no redeployment needed.

## Deployment Architecture

| Layer | Platform | URL |
|-------|----------|-----|
| Frontend | **Vercel** | `https://your-domain.vercel.app` |
| Backend | **Render** | `https://your-backend.onrender.com` |
| Database | **Neon** (PostgreSQL) | Managed serverless Postgres |

```
Browser → Vercel (Next.js) → fetches data from → Render (Django) → Neon (PostgreSQL)
```

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15 (App Router), TypeScript, Tailwind CSS v4 |
| HTTP Client | Axios |
| Backend | Django 5, Django REST Framework |
| Auth | JWT via djangorestframework-simplejwt (HttpOnly cookies) |
| Database | PostgreSQL (Neon) |
| Static Files | WhiteNoise |

## Project Structure

```
├── backend/               # Django REST API (deployed on Render)
│   ├── config/            # Project settings, URLs, WSGI
│   ├── apps/
│   │   ├── users/         # Custom User model & JWT auth
│   │   └── portfolio/     # Portfolio content models & API
│   ├── build.sh           # Render build script
│   └── requirements.txt
│
└── frontend/              # Next.js application (deployed on Vercel)
    ├── src/
    │   ├── app/           # App Router pages & layouts
    │   ├── components/    # UI components & sections
    │   ├── context/       # Auth & Theme providers
    │   ├── lib/           # Axios instance
    │   ├── services/      # API service functions
    │   ├── types/         # TypeScript interfaces
    │   └── utils/         # Helper functions
    └── package.json
```

## Getting Started (Local Development)

### Prerequisites

- **Python 3.11+** with pip
- **Node.js 18+** with npm
- **PostgreSQL 16+** (local or Neon connection string)

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

### 1. Database (Neon)

1. Create a project at [neon.tech](https://neon.tech)
2. Copy your connection string:
   ```
   postgresql://user:pass@ep-xxx.region.aws.neon.tech/dakshesh_portfolio?sslmode=require
   ```

### 2. Backend (Render)

1. Go to [render.com](https://render.com) → **New Web Service** → Connect your GitHub repo
2. Configure:
   | Setting | Value |
   |---------|-------|
   | **Root Directory** | `backend` |
   | **Runtime** | Python 3 |
   | **Build Command** | `sh build.sh` |
   | **Start Command** | `gunicorn config.wsgi:application` |
3. Add environment variables:
   | Key | Value |
   |-----|-------|
   | `SECRET_KEY` | A strong random key |
   | `DEBUG` | `False` |
   | `DATABASE_URL` | Your Neon connection string |
   | `CORS_ALLOWED_ORIGINS` | `https://your-domain.vercel.app` |
   | `FRONTEND_URL` | `https://your-domain.vercel.app` |
   | `PYTHON_VERSION` | `3.11.6` |
4. Deploy, then open the **Shell** tab and run:
   ```bash
   python manage.py createsuperuser
   ```

### 3. Frontend (Vercel)

1. Import the repo at [vercel.com](https://vercel.com)
2. Set **Root Directory** to `frontend`
3. Add environment variable:
   | Key | Value |
   |-----|-------|
   | `NEXT_PUBLIC_API_URL` | `https://your-backend.onrender.com/api` |
4. Deploy

## License

MIT
