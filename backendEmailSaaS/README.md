# FastAPI Email SaaS Microservice

This microservice receives contact form submissions from your portfolio frontend and sends them to your personal email (`rdakshesh800@gmail.com`) using the **Resend SaaS API**.

---

## 🔑 Where to Paste the Resend API Key

1. Open the file [`.env`](file:///c:/Users/Dakshesh%20R/Desktop/Dakshesh-Portfolio/backendEmailSaaS/.env) inside `backendEmailSaaS/`.
2. Locate the line:
   ```env
   RESEND_API_KEY=re_your_api_key_here
   ```
3. Replace `re_your_api_key_here` with your actual key from [Resend API Keys Dashboard](https://resend.com/api-keys) (e.g. `re_123456789_abcdef...`).
4. Save the file.

---

## 🚀 How to Run Locally

### 1. Create and activate a virtual environment
```bash
cd backendEmailSaaS
python -m venv venv

# On Windows:
venv\Scripts\activate
```

### 2. Install dependencies
```bash
pip install -r requirements.txt
```

### 3. Start the FastAPI server
```bash
uvicorn main:app --reload --port 8001
```

The server will be available at:
- **API Health Check**: `http://localhost:8001/`
- **Swagger Documentation**: `http://localhost:8001/docs`
- **Email Send Endpoint**: `POST http://localhost:8001/api/send-email`

---

## 🌐 How to Deploy to Render (Step-by-Step)

### Step 1: Push your latest code to GitHub
```bash
git add .
git commit -m "Configure backendEmailSaaS for Render deployment"
git push origin main
```

### Step 2: Create a New Web Service on Render
1. Go to your [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** → **Web Service**.
3. Select **Build and deploy from a Git repository**, then choose your `Dakshesh-Portfolio` repository.
4. Fill in the following settings:
   - **Name**: `portfolio-email-saas` (or any name you prefer)
   - **Region**: Closest to you (e.g., *Singapore* or *Oregon*)
   - **Branch**: `main`
   - **Root Directory**: `backendEmailSaaS`  *(IMPORTANT: Do not skip this!)*
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt` (or `./build.sh`)
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Instance Type**: `Free`

### Step 3: Add Environment Variables in Render
Under the **Environment Variables** section in the Render setup, add:

| Key | Value | Notes |
|---|---|---|
| `RESEND_API_KEY` | `re_123...` | Your Resend API key |
| `RECIPIENT_EMAIL` | `rdakshesh800@gmail.com` | Where you receive messages |
| `SENDER_EMAIL` | `Portfolio Contact <onboarding@resend.dev>` | Free tier sender |
| `ALLOWED_ORIGINS` | `*` | Allows inquiries from any client |

Click **Create Web Service**. Render will now build and deploy the service.

### Step 4: Connect Your Frontend to the Deployed Service
Once Render finishes deploying, copy your live service URL (e.g., `https://portfolio-email-saas.onrender.com`).

1. **In Vercel (Production Frontend):**
   - Go to your Vercel Project Settings → **Environment Variables**.
   - Add or update:
     - **Key**: `NEXT_PUBLIC_EMAIL_SERVICE_URL`
     - **Value**: `https://portfolio-email-saas.onrender.com/api/send-email`
   - Trigger a redeploy on Vercel to apply the new variable.

2. **In Local Frontend (`frontend/.env.local`):**
   - You can test with either your local service or the deployed Render URL:
     ```env
     NEXT_PUBLIC_EMAIL_SERVICE_URL=https://portfolio-email-saas.onrender.com/api/send-email
     ```
