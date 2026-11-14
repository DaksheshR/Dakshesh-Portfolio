/**
 * Email SaaS Service — handles sending contact form submissions
 * to the FastAPI microservice (backendEmailSaaS) which relays them
 * through the Resend SaaS email platform.
 */

import axios from "axios";
import type { ContactFormData } from "@/types";

export interface EmailSendResponse {
  status: string;
  message: string;
  email_id?: string;
}

// Configured via NEXT_PUBLIC_EMAIL_SERVICE_URL in .env.local
// In local development, defaults to the FastAPI service running on port 8001.
const EMAIL_SERVICE_ENDPOINT =
  process.env.NEXT_PUBLIC_EMAIL_SERVICE_URL ||
  "http://localhost:8001/api/send-email";

export const emailService = {
  /**
   * Sends the contact form data (name, email, subject, message)
   * to the FastAPI backendEmailSaaS service.
   */
  async sendContactEmail(formData: ContactFormData): Promise<EmailSendResponse> {
    const { data } = await axios.post<EmailSendResponse>(
      EMAIL_SERVICE_ENDPOINT,
      {
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 15000,
      }
    );
    return data;
  },
};

