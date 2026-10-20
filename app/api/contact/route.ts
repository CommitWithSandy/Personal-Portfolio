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

    const { name, email, subject, roleType, message } = validation.data;

    // 5. Connect to MongoDB and save message
    try {
      await connectDB();
      const newMessage = new ContactMessage({
        name,
        email,
        subject: roleType ? `${roleType} Inquiry` : subject || 'Portfolio Contact Form',
        message,
        createdAt: new Date(),
      });
      await newMessage.save();
    } catch (dbErr) {
      console.warn('MongoDB save skipped or failed:', dbErr);
      // We don't block the user if DB connection fails, we log and continue to email
    }

    // 6. Send Email Notification via Nodemailer (if configured)
    const smtpHost = process.env.SMTP_HOST || process.env.EMAIL_SERVER_HOST || 'smtp.gmail.com';
    const smtpPort = Number(process.env.SMTP_PORT || process.env.EMAIL_SERVER_PORT) || 587;
    const smtpUser = process.env.SMTP_USER || process.env.EMAIL_SERVER_USER || process.env.EMAIL_FROM;
    const rawPass = process.env.SMTP_PASS || process.env.EMAIL_SERVER_PASSWORD;
    const smtpPass = rawPass ? rawPass.trim().replace(/\s+/g, '') : undefined;
    const notificationEmail =
      process.env.NOTIFICATION_EMAIL || process.env.EMAIL_TO || smtpUser || 'hiremathsandesh14@gmail.com';

    if (smtpUser && smtpPass) {
      try {
        const isGmail = smtpHost.includes('gmail');
        const transporter = nodemailer.createTransport(
          isGmail
            ? {
                service: 'gmail',
                auth: {
                  user: smtpUser,
                  pass: smtpPass,
                },
              }
            : {
                host: smtpHost,
                port: smtpPort,
                secure: smtpPort === 465 || process.env.SMTP_SECURE === 'true',
                auth: {
                  user: smtpUser,
                  pass: smtpPass,
                },
              }
        );

        await transporter.sendMail({
          from: `"Portfolio Contact Form" <${smtpUser}>`,
          to: notificationEmail,
          replyTo: email,
          subject: `🚀 New Portfolio Inquiry: ${name} (${roleType || subject || 'General'})`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0b0f19; color: #f8fafc; padding: 28px; border-radius: 16px; border: 1px solid #1e293b;">
              <h2 style="color: #6366f1; margin-top: 0; font-size: 22px; border-bottom: 1px solid #1e293b; padding-bottom: 14px;">📬 New Message from Your Portfolio</h2>
              <table style="width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px;">
                <tr>
                  <td style="padding: 8px 0; color: #94a3b8; width: 140px;"><strong>Sender Name:</strong></td>
                  <td style="padding: 8px 0; color: #f8fafc; font-weight: 600;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #94a3b8;"><strong>Work Email:</strong></td>
                  <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #38bdf8; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #94a3b8;"><strong>Inquiry Type:</strong></td>
                  <td style="padding: 8px 0; color: #a855f7; font-weight: 600;">${roleType || subject || 'General Inquiry'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #94a3b8;"><strong>Received At:</strong></td>
                  <td style="padding: 8px 0; color: #64748b;">${new Date().toLocaleString()}</td>
                </tr>
              </table>
              <div style="margin-top: 20px; padding: 16px; background: #13182b; border-radius: 12px; border: 1px solid #1e293b;">
                <p style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #6366f1; font-weight: 700;">Message Content:</p>
                <p style="margin: 0; white-space: pre-wrap; font-size: 14px; line-height: 1.6; color: #e2e8f0;">${message}</p>
              </div>
              <p style="margin-top: 24px; font-size: 12px; color: #64748b; text-align: center;">
                You can directly reply to this email to respond back to <strong>${email}</strong>.
              </p>
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
