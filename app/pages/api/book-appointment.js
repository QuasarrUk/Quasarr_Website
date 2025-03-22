// pages/api/book-appointment.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { firstName, lastName, email, phone, service, appointmentDate, appointmentTime, comments } = req.body;

  // Validate required fields
  if (!firstName || !lastName || !email || !phone || !service || !appointmentDate) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Send email to business owner
    await transporter.sendMail({
      from: `"Website Booking" <${process.env.EMAIL_USER}>`,
      to: process.env.BUSINESS_EMAIL,
      subject: `New Appointment: ${firstName} ${lastName} - ${service}`,
      html: `
        <h1>New Appointment Booking</h1>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Date & Time:</strong> ${appointmentDate} at ${appointmentTime}</p>
        <p><strong>Comments:</strong> ${comments || 'No additional comments'}</p>
      `,
    });

    // Send confirmation email to customer
    await transporter.sendMail({
      from: `"Your Business Name" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Appointment Confirmation',
      html: `
        <h1>Thank You for Your Booking</h1>
        <p>Dear ${firstName},</p>
        <p>We are confirming your appointment for ${service} on ${appointmentDate} at ${appointmentTime}.</p>
        <p>If you need to make any changes, please contact us at ${process.env.BUSINESS_PHONE}.</p>
        <p>We look forward to seeing you!</p>
        <p>Best regards,</p>
        <p>The Team at Your Business Name</p>
      `,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Appointment booking error:', error);
    res.status(500).json({ message: 'Error processing appointment' });
  }
}