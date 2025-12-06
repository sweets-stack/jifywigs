// client/app/api/services/book/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import axios from 'axios';
import { ObjectId } from 'mongodb';

// Service definitions (match your backend)
interface ServiceDefinition {
  name: string;
  basePrice: number;
}

const SERVICES: Record<string, ServiceDefinition> = {
  washing: { name: 'Wig Washing & Conditioning', basePrice: 3500 },
  coloring: { name: 'Color Refresh & Dye', basePrice: 8000 },
  revamping: { name: 'Full Wig Revamp', basePrice: 12000 },
  repair: { name: 'Lace Ventilation Repair', basePrice: 6000 },
};

export async function POST(request: NextRequest) {
  try {
    const {
      services: serviceIds,
      photos,
      notes,
      date,
      delivery,
      paymentMethod,
      customerName,
      customerEmail,
      customerPhone
    } = await request.json();

    // Validate
    if (!serviceIds || serviceIds.length === 0) {
      return NextResponse.json({ error: 'At least one service is required' }, { status: 400 });
    }
    if (!customerName || !customerEmail || !customerPhone) {
      return NextResponse.json({ error: 'Customer details are required' }, { status: 400 });
    }

    // Calculate total with proper type annotations
    const selectedServices = serviceIds
      .map((id: string) => SERVICES[id])
      .filter(Boolean);
    
    const total = selectedServices.reduce(
      (sum: number, svc: ServiceDefinition) => sum + svc.basePrice, 
      0
    );

    // Generate booking ID (real-time, unique)
    const bookingId = `JW-SVC-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;

    // 1️⃣ SEND CUSTOMER CONFIRMATION EMAIL
    const transporter = nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: 587,
      auth: { user: 'apikey', pass: process.env.SENDGRID_API_KEY! },
    });

    const customerEmailHtml = `
      <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #f502a0, #e00085); padding: 20px; text-align: center; border-radius: 12px; margin-bottom: 24px;">
          <h1 style="color: white; margin: 0; font-size: 28px;">💇‍♀️ Service Booking Confirmed</h1>
        </div>
        
        <div style="background: white; border-radius: 12px; padding: 24px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          <div style="text-align: center; margin-bottom: 24px;">
            <div style="width: 60px; height: 60px; background: #f502a0; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin: 0 auto 16px;">
              <span style="color: white; font-size: 24px; font-weight: bold;">${bookingId.slice(-4)}</span>
            </div>
            <h2 style="color: #1f2937; margin: 0 0 8px 0;">Booking ID: ${bookingId}</h2>
            <p style="color: #6b7280; margin: 0;">${new Date(date).toLocaleDateString('en-NG', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
          </div>

          <div style="margin-bottom: 24px;">
            <h3 style="color: #1f2937; margin: 0 0 12px 0; padding-bottom: 8px; border-bottom: 2px solid #f502a0;">Services</h3>
            <ul style="padding-left: 20px; margin: 0;">
              ${selectedServices.map((svc: ServiceDefinition) => 
                `<li style="margin-bottom: 8px; color: #1f2937;">✓ ${svc.name} (<strong>₦${svc.basePrice.toLocaleString()}</strong>)</li>`
              ).join('')}
            </ul>
          </div>

          <div style="margin-bottom: 24px;">
            <h3 style="color: #1f2937; margin: 0 0 12px 0; padding-bottom: 8px; border-bottom: 2px solid #f502a0;">Customer Details</h3>
            <p style="color: #1f2937; margin: 4px 0;"><strong>Name:</strong> ${customerName}</p>
            <p style="color: #1f2937; margin: 4px 0;"><strong>Email:</strong> ${customerEmail}</p>
            <p style="color: #1f2937; margin: 4px 0;"><strong>Phone:</strong> ${customerPhone}</p>
          </div>

          <div style="margin-bottom: 24px;">
            <h3 style="color: #1f2937; margin: 0 0 12px 0; padding-bottom: 8px; border-bottom: 2px solid #f502a0;">Instructions</h3>
            <p style="color: #1f2937; line-height: 1.6;">
              • Your booking is confirmed for <strong>${new Date(date).toLocaleDateString('en-NG')}</strong><br>
              • Please bring your wig to our showroom at <strong>16 Lagos Street, Yaba</strong> at your selected time<br>
              • For pickup/delivery: Our rider will contact you 30 mins before arrival<br>
              • Total: <strong>₦${total.toLocaleString()}</strong> (${paymentMethod === 'cash' ? 'Pay on pickup/delivery' : 'Paid online'})
            </p>
          </div>

          <div style="background: #f5f6fa; border-radius: 8px; padding: 16px;">
            <p style="color: #4b5563; margin: 0; font-size: 14px;">
              Have questions? WhatsApp us: 
              <a href="https://wa.me/2349049355400" style="color: #f502a0; text-decoration: none;">+234 904 935 5400</a>
            </p>
          </div>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: '"JifyWigs Services" <services@shopjifywigs.com.ng>',
      to: customerEmail,
      subject: `✅ Booking Confirmed: ${bookingId}`,
      html: customerEmailHtml,
    });

    // 2️⃣ SEND TEAM ALERT (WHATSAPP + EMAIL)
    const teamAlert = `*🆕 NEW SERVICE BOOKING*\nID: ${bookingId}\nCustomer: ${customerName}\nPhone: ${customerPhone}\nDate: ${new Date(date).toLocaleDateString('en-NG')}\nTotal: ₦${total.toLocaleString()}\nServices: ${selectedServices.map((s: ServiceDefinition) => s.name).join(', ')}`;
    
    // WhatsApp to team
    if (process.env.WHATSAPP_API_TOKEN) {
      await axios.post(
        `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_ID}/messages`,
        {
          messaging_product: "whatsapp",
          to: process.env.TEAM_WHATSAPP_NUMBER,
          type: "text",
          text: { body: teamAlert }
        },
        { headers: { "Authorization": `Bearer ${process.env.WHATSAPP_API_TOKEN}` } }
      );
    }

    // 3️⃣ SAVE TO DATABASE (SIMULATED - replace with real DB call)
    // In real app: await Booking.create({ ...data });
    const bookingData = {
      _id: new ObjectId(),
      bookingId,
      services: selectedServices,
      total,
      customer: { name: customerName, email: customerEmail, phone: customerPhone },
      date: new Date(date),
      delivery,
      paymentMethod,
      notes,
      status: 'confirmed',
      createdAt: new Date(),
    };

    // ✅ SUCCESS
    return NextResponse.json(
      { 
        success: true, 
        booking: {
          id: bookingId,
          total,
          date: new Date(date).toISOString(),
          services: selectedServices.map((s: ServiceDefinition) => s.name)
        }
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Booking API error:', error);
    return NextResponse.json({ error: 'Failed to book service. Please try again.' }, { status: 500 });
  }
}