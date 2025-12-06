import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import axios from 'axios';

// Email transporter
const transporter = nodemailer.createTransporter({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY,
  },
});

export const submitWholesaleEnquiry = async (req: Request, res: Response) => {
  try {
    const { businessName, contactPerson, email, phone, location, message } = req.body;

    // 1. Send email (primary)
    const mailOptions = {
      from: '"JifyWigs Wholesale" <wholesale@jifywigs.com.ng>',
      to: 'wholesale@jifywigs.com.ng',
      subject: `Wholesale Enquiry: ${businessName}`,
      html: `
        <h2>New Wholesale Enquiry</h2>
        <p><strong>Business:</strong> ${businessName}</p>
        <p><strong>Contact:</strong> ${contactPerson}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    // 2. Send WhatsApp notification (to internal team)
    if (process.env.WHATSAPP_API_TOKEN) {
      const whatsappMsg = `*NEW WHOLESALE ENQUIRY*\nBusiness: ${businessName}\nContact: ${contactPerson}\n${phone}`;
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

    // 3. Save to DB (optional)
    // await WholesaleEnquiry.create({ ...req.body, status: 'pending' });

    res.status(200).json({ success: true, message: 'Enquiry submitted successfully' });
  } catch (error) {
    console.error('Wholesale submission error:', error);
    res.status(500).json({ success: false, message: 'Failed to submit enquiry' });
  }
};