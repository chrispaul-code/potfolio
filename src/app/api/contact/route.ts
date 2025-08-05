import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
export interface Data {
  name: string;
  email: string;
  message: string;
  subject: string;
}


export async function POST(request: NextRequest) {
  const {
    name,
    email,
    subject,
    message
  } = await request.json();


  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const user: Mail.Options = {
    from: process.env.EMAIL,
    to: email,
    subject: "Thank You for Reaching Out!",
    replyTo: process.env.EMAIL,
    html: `
    <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #0a1e35;
            color: #ffffff;
            padding: 20px;
          }

          .email-container {
            background: #ffffff;
            color: #0a1e35;
            max-width: 600px;
            margin: auto;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          }

          .header {
            background: #0ec9ac;
            padding: 15px;
            text-align: center;
            font-size: 22px;
            font-weight: bold;
            color: #ffffff;
            border-radius: 6px 6px 0 0;
          }

          .content {
            padding: 15px;
            font-size: 16px;
            line-height: 1.6;
          }

          .footer {
            margin-top: 20px;
            font-size: 14px;
            text-align: center;
            color: #0a1e35;
          }

          a.btn {
            display: inline-block;
            background: #0ec9ac;
            color: #ffffff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 10px;
          }

          a.btn:hover {
            background: #0ba18d;
          }
        </style>
      </head>
      <body>

        <div class="email-container">
          <div class="header">Thank You for Reaching Out!</div>

          <div class="content">
            <p>Dear <strong>${name}</strong>,</p>
            <p>Thank you for contacting me through my portfolio. I have received your message and will review it as soon as possible. Below are the details of your submission:</p>

            <ul>
              <li><strong>Name:</strong> ${name}</li>
              <li><strong>Email:</strong> ${email}</li>
              <li><strong>Subject:</strong> ${subject}</li>
              <li><strong>Message:</strong> <br> ${message}</li>
            </ul>

            <p>If your request is urgent, feel free to reach out directly.</p>
            <a href="mailto:${process.env.EMAIL}" class="btn">Reply Now</a>
          </div>

          <div class="footer">
            <p>Best Regards,</p>
            <p><strong>Christeen Pauk</strong><br>
            <a href="https://gajender.vercel.app">Gajender.vercel.app</a></p>
          </div>
        </div>

      </body>
      </html>
    `,
    text: `Dear ${name},

Thank you for contacting me through my portfolio. I have received your message and will review it as soon as possible. Below are the details of your submission:

- Name: ${name}
- Email: ${email}
- Subject: ${subject}
- Message: 

"${message}"

If your request is urgent, feel free to reach out directly.

Best Regards,
Your Name
https://gajender.vercel.app`,
  };

  const admin: Mail.Options = {
    from: email,
    to: process.env.EMAIL,
    subject: `New Contact Form Submission: ${name}`,
    replyTo: email,
    html: `
    <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #0a1e35;
            color: #ffffff;
            padding: 20px;
          }

          .email-container {
            background: #ffffff;
            color: #0a1e35;
            max-width: 600px;
            margin: auto;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          }

          .header {
            background: #0ec9ac;
            padding: 15px;
            text-align: center;
            font-size: 22px;
            font-weight: bold;
            color: #ffffff;
            border-radius: 6px 6px 0 0;
          }

          .content {
            padding: 15px;
            font-size: 16px;
            line-height: 1.6;
          }

          .footer {
            margin-top: 20px;
            font-size: 14px;
            text-align: center;
            color: #0a1e35;
          }

          .btn {
            display: inline-block;
            background: #0ec9ac;
            color: #ffffff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 10px;
          }

          .btn:hover {
            background: #0ba18d;
          }
        </style>
      </head>
      <body>

        <div class="email-container">
          <div class="header">New Contact Form Submission</div>

          <div class="content">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <blockquote>${message}</blockquote>

            <p><strong>📌 Please review and respond if needed.</strong></p>
          </div>

          <div class="footer">
            <p>Best Regards,</p>
            <p><strong>Your Automated System</strong></p>
          </div>
        </div>

      </body>
      </html>
`,
    text: `Dear [Your Name],

You have received a new contact form submission from your portfolio. Here are the details:

- Name: ${name}
- Email: ${email}
- Subject: ${subject}
- Message: 

"${message}"

📌 Please review the message and respond if needed.

Best Regards,
Your Automated System
`,
  };

  async function sendEmail(mailOptions: Mail.Options) {
    return new Promise((resolve, reject) => {
      transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info.response);
        }
      });
    });
  }
  try {
    await Promise.all([sendEmail(admin), sendEmail(user)]);
    return NextResponse.json({ message: "Email sent successfully!" });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}