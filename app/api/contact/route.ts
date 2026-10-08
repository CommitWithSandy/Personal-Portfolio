import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { ContactMessage } from '@/lib/models/ContactMessage';
import { contactFormSchema } from '@/lib/zod-schemas';
import nodemailer from 'nodemailer';

// Simple in-memory rate limiting map for basic protection
const ipRateLimit = new Map<string, { count: number; resetTime: number }>();

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting Check
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const now = Date.now();
    const rateData = ipRateLimit.get(ip);

    if (rateData) {
      if (now < rateData.resetTime) {
        if (rateData.count >= 5) {
          return NextResponse.json(
            { error: 'Too many requests. Please try again in an hour.' },
            { status: 429 }
          );
        }
        rateData.count += 1;
      } else {
        ipRateLimit.set(ip, { count: 1, resetTime: now + 3600000 });
      }
    } else {
      ipRateLimit.set(ip, { count: 1, resetTime: now + 3600000 });
    }

    // 2. Parse request body
    const body = await req.json();

    // 3. Honeypot check
    if (body.honeypot) {
      // Spam submission detected, return silent success
      return NextResponse.json({ success: true, message: 'Message sent successfully!' });
    }

    // 4. Server-side Zod validation
    const validation = contactFormSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.error.format() },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = validation.data;

    // 5. Connect to MongoDB and save message
    try {
      await connectDB();
      const newMessage = new ContactMessage({
        name,
        email,
        subject: subject || 'Portfolio Contact Form',
        message,
        createdAt: new Date(),
      });
      await newMessage.save();
    } catch (dbErr) {
      console.warn('MongoDB save skipped or failed:', dbErr);
      // We don't block the user if DB connection fails, we log and continue to email
    }

    // 6. Send Email Notification via Nodemailer (if configured)
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
          to: process.env.NOTIFICATION_EMAIL || process.env.SMTP_USER,
          subject: `Portfolio Contact: ${subject || 'New Message from ' + name}`,
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
              <h2>New Message Received from Portfolio</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
              <hr />
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap; background: #f4f4f4; padding: 15px; rounded: 8px;">${message}</p>
            </div>
          `,
        });
      } catch (mailErr) {
        console.error('Email sending failed:', mailErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been sent successfully.',
    });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: 'An unexpected server error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
