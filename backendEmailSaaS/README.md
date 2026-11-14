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

## 📨 Testing the Endpoint

You can test sending a test email using `curl`:
```bash
curl -X POST "http://localhost:8001/api/send-email" ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Test Visitor\",\"email\":\"test@example.com\",\"subject\":\"Project Inquiry\",\"message\":\"Hello Dakshesh, I would like to collaborate on a project!\"}"
```

