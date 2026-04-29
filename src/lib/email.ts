import { Resend } from "resend";

/* ─── Lazy Client ─────────────────────────────────────────── */
let _resend: Resend | null = null;

function getResend(): Resend {
  if (_resend) return _resend;
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("Missing RESEND_API_KEY in environment variables.");
  _resend = new Resend(key);
  return _resend;
}

function getAdminEmail() {
  return process.env.ADMIN_EMAIL ?? "contact@dataovermind.com";
}

const FROM_ADDRESS = "DataOverMind <contact@dataovermind.com>"; // Use your verified domain in production

/* ─── Types ───────────────────────────────────────────────── */
interface LeadData {
  name: string;
  email: string;
  company?: string;
  message: string;
}

/* ─── Admin Notification ──────────────────────────────────── */
export async function sendAdminNotification(lead: LeadData) {
  const { data, error } = await getResend().emails.send({
    from: FROM_ADDRESS,
    to: getAdminEmail(),
    subject: "New Lead from DataOverMind",
    html: `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px; background: #0a0c10; color: #f0f0f0; border-radius: 12px; border: 1px solid rgba(255,255,255,0.08);">
        <h2 style="margin: 0 0 24px; font-size: 20px; color: #00C2FF;">
          🔔 New Lead Received
        </h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; color: #94A3B8; font-size: 13px; width: 100px; vertical-align: top;">Name</td>
            <td style="padding: 10px 0; font-size: 14px; font-weight: 500;">${escapeHtml(lead.name)}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #94A3B8; font-size: 13px; vertical-align: top;">Email</td>
            <td style="padding: 10px 0; font-size: 14px;">
              <a href="mailto:${escapeHtml(lead.email)}" style="color: #00C2FF; text-decoration: none;">${escapeHtml(lead.email)}</a>
            </td>
          </tr>
          ${lead.company ? `
          <tr>
            <td style="padding: 10px 0; color: #94A3B8; font-size: 13px; vertical-align: top;">Company</td>
            <td style="padding: 10px 0; font-size: 14px;">${escapeHtml(lead.company)}</td>
          </tr>
          ` : ""}
          <tr>
            <td style="padding: 10px 0; color: #94A3B8; font-size: 13px; vertical-align: top;">Message</td>
            <td style="padding: 10px 0; font-size: 14px; line-height: 1.6;">${escapeHtml(lead.message)}</td>
          </tr>
        </table>
        <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.08); margin: 24px 0 16px;" />
        <p style="margin: 0; font-size: 11px; color: #64748B;">
          This notification was sent from the DataOverMind contact form.
        </p>
      </div>
    `,
  });

  if (error) throw new Error(`Admin email failed: ${error.message}`);
  return data;
}

/* ─── User Confirmation ───────────────────────────────────── */
export async function sendUserConfirmation(lead: LeadData) {
  const { data, error } = await getResend().emails.send({
    from: FROM_ADDRESS,
    to: lead.email,
    subject: "We received your request — DataOverMind",
    html: `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px; background: #0a0c10; color: #f0f0f0; border-radius: 12px; border: 1px solid rgba(255,255,255,0.08);">
        <h2 style="margin: 0 0 8px; font-size: 20px; color: #00C2FF;">
          Thanks for reaching out!
        </h2>
        <p style="margin: 0 0 24px; color: #94A3B8; font-size: 14px; line-height: 1.6;">
          Hi ${escapeHtml(lead.name)},
        </p>
        <p style="margin: 0 0 16px; font-size: 14px; line-height: 1.7; color: #d1d5db;">
          We've received your message and our team will get back to you within
          <strong style="color: #00FFE5;">24 hours</strong>.
        </p>
        <p style="margin: 0 0 24px; font-size: 14px; line-height: 1.7; color: #d1d5db;">
          In the meantime, feel free to explore our website or reach out via WhatsApp
          for an immediate response.
        </p>
        <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.08); margin: 24px 0 16px;" />
        <p style="margin: 0; font-size: 12px; color: #64748B;">
          — The DataOverMind Team
        </p>
      </div>
    `,
  });

  if (error) throw new Error(`User confirmation email failed: ${error.message}`);
  return data;
}

/* ─── Utility ─────────────────────────────────────────────── */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
