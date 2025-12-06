// client/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import axios from 'axios';

// Configure SendGrid transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY!,
  },
});

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate input
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // 1️⃣ SEND EMAIL TO JIFYWIGS TEAM
    const mailOptions = {
      from: `"JifyWigs Contact" <hello@shopjifywigs.com.ng>`,
      to: 'hello@shopjifywigs.com.ng',
      subject: `New Contact: ${subject}`,
      html: `
        <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #f502a0, #e00085); padding: 20px; text-align: center; border-radius: 12px; margin-bottom: 24px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">📩 New Contact Message</h1>
          </div>
          
          <div style="background: white; border-radius: 12px; padding: 24px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
            <div style="margin-bottom: 16px;">
              <h2 style="color: #1f2937; margin: 0 0 8px 0;">From: ${name}</h2>
              <p style="color: #6b7280; margin: 0;"><strong>Email:</strong> ${email}</p>
              <p style="color: #6b7280; margin: 4px 0 0 0;"><strong>Subject:</strong> ${subject}</p>
            </div>
            
            <div style="border-left: 4px solid #f502a0; padding-left: 16px; margin: 20px 0;">
              <p style="color: #1f2937; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
            
            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px; margin: 0;">
                Received on ${new Date().toLocaleString('en-NG', { timeZone: 'Africa/Lagos' })}
              </p>
            </div>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    // 2️⃣ SEND WHATSAPP ALERT TO TEAM (REAL-TIME)
    if (process.env.WHATSAPP_API_TOKEN && process.env.WHATSAPP_PHONE_ID && process.env.TEAM_WHATSAPP_NUMBER) {
      const whatsappMsg = `*🆕 NEW CONTACT*\nFrom: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n"${message.substring(0, 100)}${message.length > 100 ? '...' : ''}"`;
      
      await axios.post(
        `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_ID}/messages`,
        {
          messaging_product: "whatsapp",
          to: process.env.TEAM_WHATSAPP_NUMBER,
          type: "text",
          text: { body: whatsappMsg }
        },
        {
          headers: {
            "Authorization": `Bearer ${process.env.WHATSAPP_API_TOKEN}`,
            "Content-Type": "application/json"
          }
        }
      );
    }

    // 3️⃣ SEND TELEGRAM ALERT TO TEAM
    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      const telegramMsg = `🆕 <b>NEW CONTACT</b>\n\n<b>From:</b> ${name}\n<b>Email:</b> ${email}\n<b>Subject:</b> ${subject}\n\n${message}`;
      
      await axios.post(
        `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: telegramMsg,
          parse_mode: "HTML"
        }
      );
    }

    // ✅ SUCCESS
    return NextResponse.json(
      { 
        success: true, 
        message: 'Message sent successfully. We\'ll reply within 24 hours.' 
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Contact API error:', error);
    
    // Return specific error for debugging
    return NextResponse.json(
      { 
        error: 'Failed to send message. Please try again or WhatsApp us directly.', 
        details: process.env.NODE_ENV === 'development' ? error.message : undefined 
      },
      { status: 500 }
    );
  }
}