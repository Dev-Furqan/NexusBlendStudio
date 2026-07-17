import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "nexusblendd@gmail.com";

class MissingSmtpConfigError extends Error {
  constructor() {
    super("Email service is not configured yet. Add SMTP_HOST, SMTP_USER, and SMTP_PASS to .env.local, then restart the dev server.");
    this.name = "MissingSmtpConfigError";
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function requireSmtpConfig() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new MissingSmtpConfigError();
  }

  return {
    host,
    port,
    secure: process.env.SMTP_SECURE === "true" || port === 465,
    auth: { user, pass },
  };
}

function buildContactEmail({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");
  const submittedAt = new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Karachi",
  }).format(new Date());

  return `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>New Nexus Blend Inquiry</title>
  </head>
  <body style="margin:0;padding:0;background:#05060a;font-family:Arial,Helvetica,sans-serif;color:#ffffff;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#05060a;margin:0;padding:32px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;border-collapse:separate;border-spacing:0;background:#0b0d14;border:1px solid rgba(255,255,255,0.10);border-radius:28px;overflow:hidden;box-shadow:0 28px 80px rgba(0,0,0,0.45);">
            <tr>
              <td style="padding:1px;background:linear-gradient(135deg,#7c3aed,#06e5c6,#ff3d81);">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#0b0d14;border-radius:27px 27px 0 0;">
                  <tr>
                    <td style="padding:34px 34px 30px 34px;background:radial-gradient(circle at 15% 0%,rgba(124,58,237,0.34),transparent 34%),radial-gradient(circle at 92% 8%,rgba(6,229,198,0.18),transparent 32%);">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                        <tr>
                          <td>
                            <table role="presentation" cellspacing="0" cellpadding="0">
                              <tr>
                                <td style="width:44px;height:44px;border-radius:14px;background:linear-gradient(135deg,#7c3aed,#06e5c6);text-align:center;vertical-align:middle;font-weight:700;font-size:15px;color:#ffffff;">NB</td>
                                <td style="padding-left:13px;">
                                  <div style="font-size:18px;font-weight:700;letter-spacing:0;color:#ffffff;">Nexus <span style="color:rgba(255,255,255,0.62);">Blend</span></div>
                                  <div style="font-size:11px;letter-spacing:2.2px;text-transform:uppercase;color:#06e5c6;margin-top:4px;">New Website Inquiry</div>
                                </td>
                              </tr>
                            </table>
                          </td>
                          <td align="right" style="font-size:12px;color:rgba(255,255,255,0.55);vertical-align:top;">${submittedAt} PKT</td>
                        </tr>
                      </table>
                      <h1 style="margin:34px 0 0 0;font-size:34px;line-height:1.08;font-weight:700;color:#ffffff;">A new project inquiry just landed.</h1>
                      <p style="margin:14px 0 0 0;font-size:15px;line-height:1.7;color:rgba(255,255,255,0.68);">Someone submitted the Nexus Blend contact form. Reply directly to this email to continue the conversation.</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:30px 34px 10px 34px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="padding:16px;border:1px solid rgba(255,255,255,0.09);border-radius:18px;background:rgba(255,255,255,0.035);">
                      <div style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#06e5c6;margin-bottom:7px;">Name</div>
                      <div style="font-size:17px;font-weight:700;color:#ffffff;">${safeName}</div>
                    </td>
                  </tr>
                  <tr><td style="height:12px;"></td></tr>
                  <tr>
                    <td style="padding:16px;border:1px solid rgba(255,255,255,0.09);border-radius:18px;background:rgba(255,255,255,0.035);">
                      <div style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#06e5c6;margin-bottom:7px;">Email</div>
                      <a href="mailto:${safeEmail}" style="font-size:17px;font-weight:700;color:#ffffff;text-decoration:none;">${safeEmail}</a>
                    </td>
                  </tr>
                  <tr><td style="height:12px;"></td></tr>
                  <tr>
                    <td style="padding:16px;border:1px solid rgba(255,255,255,0.09);border-radius:18px;background:rgba(255,255,255,0.035);">
                      <div style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#06e5c6;margin-bottom:7px;">Subject</div>
                      <div style="font-size:17px;font-weight:700;color:#ffffff;">${safeSubject}</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 34px 34px 34px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid rgba(6,229,198,0.18);border-radius:22px;background:linear-gradient(180deg,rgba(6,229,198,0.07),rgba(124,58,237,0.05));">
                  <tr>
                    <td style="padding:24px;">
                      <div style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#06e5c6;margin-bottom:12px;">Message</div>
                      <div style="font-size:16px;line-height:1.8;color:rgba(255,255,255,0.84);">${safeMessage}</div>
                    </td>
                  </tr>
                </table>
                <table role="presentation" cellspacing="0" cellpadding="0" style="margin-top:22px;">
                  <tr>
                    <td style="border-radius:999px;background:linear-gradient(135deg,#7c3aed,#06e5c6);">
                      <a href="mailto:${safeEmail}?subject=Re:%20${encodeURIComponent(subject)}" style="display:inline-block;padding:13px 20px;border-radius:999px;color:#ffffff;font-weight:700;font-size:14px;text-decoration:none;">Reply to ${safeName}</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 34px 26px 34px;border-top:1px solid rgba(255,255,255,0.08);background:#080910;">
                <p style="margin:0;font-size:12px;line-height:1.6;color:rgba(255,255,255,0.45);">Sent from the Nexus Blend website contact form. Destination inbox: ${escapeHtml(TO_EMAIL)}.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const name = body.name?.trim() || "";
    const email = body.email?.trim() || "";
    const subject = body.subject?.trim() || "";
    const message = body.message?.trim() || "";

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }

    const transporter = nodemailer.createTransport(requireSmtpConfig());

    await transporter.sendMail({
      to: TO_EMAIL,
      from: {
        name: process.env.CONTACT_FROM_NAME || "Nexus Blend Website",
        address: process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER || TO_EMAIL,
      },
      replyTo: email,
      subject: `New Nexus Blend inquiry: ${subject}`,
      text: [
        "New contact form message",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Subject: ${subject}`,
        "",
        message,
      ].join("\n"),
      html: buildContactEmail({ name, email, subject, message }),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form email failed:", error);

    if (error instanceof MissingSmtpConfigError) {
      return NextResponse.json({ error: error.message }, { status: 503 });
    }

    return NextResponse.json(
      { error: "Message could not be sent right now. Please email nexusblendd@gmail.com directly." },
      { status: 500 },
    );
  }
}
