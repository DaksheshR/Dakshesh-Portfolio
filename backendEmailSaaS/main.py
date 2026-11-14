"""
FastAPI Email Microservice for Dakshesh's Portfolio
Receives contact form submissions from the frontend and sends emails
via the Resend SaaS platform (https://resend.com).
"""

import os
import sys
from typing import Optional
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field

# Load environment variables from .env file
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="Portfolio Email SaaS Backend",
    description="Microservice to receive contact inquiries and forward them via Resend",
    version="1.0.0",
)

# ---------------------------------------------------------------------------
# CORS Configuration
# ---------------------------------------------------------------------------
allowed_origins_env = os.getenv("ALLOWED_ORIGINS", "")
if allowed_origins_env:
    allowed_origins = [origin.strip() for origin in allowed_origins_env.split(",") if origin.strip()]
else:
    allowed_origins = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://dakshesh-portfolio.vercel.app",
        "https://weatherapi-frontend.vercel.app",
    ]

# If allowed_origins contains "*", allow all origins
if "*" in allowed_origins:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
else:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=allowed_origins,
        allow_origin_regex=r"https:\/\/.*\.vercel\.app",  # Matches any Vercel preview/production deployment
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


# ---------------------------------------------------------------------------
# Request & Response Schemas
# ---------------------------------------------------------------------------
class ContactRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=150, description="Sender's name")
    email: EmailStr = Field(..., description="Sender's email address")
    subject: str = Field(..., min_length=1, max_length=300, description="Subject of the message")
    message: str = Field(..., min_length=5, max_length=5000, description="Inquiry message content")


class ContactResponse(BaseModel):
    status: str
    message: str
    email_id: Optional[str] = None


# ---------------------------------------------------------------------------
# Email Helper Function
# ---------------------------------------------------------------------------
def send_via_resend(name: str, sender_email: str, subject: str, message_body: str) -> str:
    """
    Sends an email using the Resend SaaS API.
    Tries the official `resend` python package first, and falls back to `httpx`
    REST API call to https://api.resend.com/emails.
    """
    api_key = os.getenv("RESEND_API_KEY", "").strip()
    recipient_email = os.getenv("RECIPIENT_EMAIL", "rdakshesh800@gmail.com").strip()
    from_email = os.getenv("SENDER_EMAIL", "Portfolio Contact <onboarding@resend.dev>").strip()

    if not api_key or api_key == "re_your_api_key_here":
        raise ValueError(
            "Resend API key is not configured. Please set RESEND_API_KEY in backendEmailSaaS/.env"
        )

    # HTML formatted email body with a sleek dark-card layout
    html_content = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Portfolio Contact Message</title>
      <style>
        body {{
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          background-color: #0b0f19;
          color: #f3f4f6;
          margin: 0;
          padding: 30px 15px;
        }}
        .container {{
          max-width: 600px;
          margin: 0 auto;
          background-color: #111827;
          border: 1px solid #1f2937;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
        }}
        .header {{
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          padding: 24px 30px;
          text-align: left;
        }}
        .header h1 {{
          margin: 0;
          font-size: 20px;
          color: #ffffff;
          font-weight: 700;
          letter-spacing: -0.02em;
        }}
        .header p {{
          margin: 6px 0 0 0;
          font-size: 13px;
          color: #e0e7ff;
        }}
        .content {{
          padding: 30px;
        }}
        .field {{
          margin-bottom: 20px;
        }}
        .field-label {{
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #9ca3af;
          margin-bottom: 6px;
          font-weight: 600;
        }}
        .field-value {{
          font-size: 15px;
          color: #f9fafb;
          background: #1f2937;
          padding: 12px 16px;
          border-radius: 8px;
          border: 1px solid #374151;
          word-break: break-word;
        }}
        .message-box {{
          white-space: pre-wrap;
          line-height: 1.6;
        }}
        .reply-button {{
          display: inline-block;
          margin-top: 10px;
          background-color: #6366f1;
          color: #ffffff !important;
          text-decoration: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
        }}
        .footer {{
          padding: 16px 30px;
          background-color: #0b0f19;
          border-top: 1px solid #1f2937;
          text-align: center;
          font-size: 12px;
          color: #6b7280;
        }}
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Portfolio Message</h1>
          <p>Someone reached out through your portfolio contact form</p>
        </div>
        <div class="content">
          <div class="field">
            <div class="field-label">Sender Name</div>
            <div class="field-value"><strong>{name}</strong></div>
          </div>
          <div class="field">
            <div class="field-label">Sender Email</div>
            <div class="field-value"><a href="mailto:{sender_email}" style="color: #818cf8; text-decoration: none;">{sender_email}</a></div>
          </div>
          <div class="field">
            <div class="field-label">Subject</div>
            <div class="field-value">{subject}</div>
          </div>
          <div class="field">
            <div class="field-label">Message</div>
            <div class="field-value message-box">{message_body}</div>
          </div>
          <div style="text-align: center; margin-top: 25px;">
            <a href="mailto:{sender_email}?subject=Re: {subject}" class="reply-button">Reply directly to {name}</a>
          </div>
        </div>
        <div class="footer">
          Sent automatically by Dakshesh Portfolio Email SaaS
        </div>
      </div>
    </body>
    </html>
    """

    plain_text = f"""
New Portfolio Message from {name}
----------------------------------------
Sender Name:  {name}
Sender Email: {sender_email}
Subject:      {subject}

Message:
{message_body}
----------------------------------------
(You can reply directly to this email to contact {sender_email})
"""

    payload = {
        "from": from_email,
        "to": [recipient_email],
        "reply_to": sender_email,
        "subject": f"Portfolio Contact: {subject} (from {name})",
        "html": html_content,
        "text": plain_text,
    }

    # 1. Try using the official resend package
    try:
        import resend
        resend.api_key = api_key
        response = resend.Emails.send(payload)
        email_id = response.get("id") if isinstance(response, dict) else getattr(response, "id", None)
        return str(email_id or "sent")
    except ImportError:
        pass
    except Exception as exc:
        raise RuntimeError(f"Resend SDK error: {str(exc)}")

    # 2. Fallback to direct HTTP request using httpx or urllib if resend package is not installed
    try:
        import httpx
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        }
        res = httpx.post("https://api.resend.com/emails", json=payload, headers=headers, timeout=15.0)
        if res.status_code in (200, 201):
            data = res.json()
            return data.get("id", "sent")
        else:
            raise RuntimeError(f"Resend API error ({res.status_code}): {res.text}")
    except ImportError:
        # Ultimate fallback using python built-in urllib
        import json
        import urllib.request
        import urllib.error

        req = urllib.request.Request(
            "https://api.resend.com/emails",
            data=json.dumps(payload).encode("utf-8"),
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json",
                "User-Agent": "FastAPI-Portfolio-Email/1.0",
            },
            method="POST",
        )
        try:
            with urllib.request.urlopen(req, timeout=15) as response:
                res_data = json.loads(response.read().decode("utf-8"))
                return res_data.get("id", "sent")
        except urllib.error.HTTPError as http_err:
            error_msg = http_err.read().decode("utf-8")
            raise RuntimeError(f"Resend API error ({http_err.code}): {error_msg}")
        except Exception as gen_err:
            raise RuntimeError(f"Network error: {str(gen_err)}")


# ---------------------------------------------------------------------------
# API Endpoints
# ---------------------------------------------------------------------------
@app.get("/")
def read_root():
    """Health & info endpoint."""
    has_key = bool(os.getenv("RESEND_API_KEY", "").strip())
    key_configured = has_key and os.getenv("RESEND_API_KEY") != "re_your_api_key_here"
    return {
        "service": "Portfolio Email SaaS Backend",
        "framework": "FastAPI",
        "status": "online",
        "resend_configured": key_configured,
        "recipient_email": os.getenv("RECIPIENT_EMAIL", "rdakshesh800@gmail.com"),
    }


@app.get("/health")
def health_check():
    """Uptime monitoring endpoint."""
    return {"status": "ok"}


@app.post("/api/send-email", response_model=ContactResponse, status_code=status.HTTP_200_OK)
@app.post("/send-email", response_model=ContactResponse, status_code=status.HTTP_200_OK)
def send_contact_email(contact: ContactRequest):
    """
    Receives contact form submissions from the frontend, validates fields,
    and forwards the inquiry to your email via Resend SaaS.
    """
    try:
        email_id = send_via_resend(
            name=contact.name.strip(),
            sender_email=contact.email.strip(),
            subject=contact.subject.strip(),
            message_body=contact.message.strip(),
        )
        return ContactResponse(
            status="success",
            message="Your message has been sent successfully!",
            email_id=email_id,
        )
    except ValueError as val_err:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(val_err),
        )
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Failed to send email via Resend: {str(exc)}",
        )


if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", "8001"))
    print(f"Starting Email SaaS FastAPI server on port {port}...")
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)

