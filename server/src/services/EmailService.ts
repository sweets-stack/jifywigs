// server/src/services/EmailService.ts
// Remove or comment out Brevo import if not using
// import Brevo from '@getbrevo/brevo';

// Use nodemailer instead or disable
import nodemailer from 'nodemailer';

export class EmailService {
  static async sendEmail(to: string, subject: string, html: string) {
    // Simple nodemailer implementation
    const transporter = nodemailer.createTransport({
      // Your email config
    });
    
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    });
  }
}