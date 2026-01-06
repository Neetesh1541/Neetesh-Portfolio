import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  message: string;
}

async function sendEmail(to: string[], subject: string, html: string) {
  if (!RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to,
      subject,
      html,
    }),
  });

  const text = await res.text();
  let data: any = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { raw: text };
  }

  if (!res.ok) {
    console.error("Resend API error:", { status: res.status, data });
    throw new Error(
      (data && (data.message || data.error)) ||
        `Failed to send email (status ${res.status})`
    );
  }

  return data;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, message }: ContactEmailRequest = await req.json();

    // Validate inputs
    if (!name || !email || !message) {
      console.error("Missing required fields:", { name: !!name, email: !!email, message: !!message });
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("Sending contact email from:", name, email);

    // Send notification email to the portfolio owner
    const notificationResult = await sendEmail(
      ["neeteshk1104@gmail.com"],
      `New Portfolio Message from ${name}`,
      `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 16px;">
          <div style="background: white; border-radius: 12px; padding: 32px; box-shadow: 0 10px 40px rgba(0,0,0,0.1);">
            <h2 style="color: #8B5CF6; border-bottom: 3px solid #8B5CF6; padding-bottom: 12px; margin-top: 0; font-size: 24px;">
              ✨ New Contact Form Submission
            </h2>
            <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 24px; border-radius: 12px; margin: 24px 0;">
              <p style="margin: 8px 0;"><strong style="color: #6366f1;">👤 Name:</strong> ${name}</p>
              <p style="margin: 8px 0;"><strong style="color: #6366f1;">📧 Email:</strong> <a href="mailto:${email}" style="color: #8B5CF6;">${email}</a></p>
              <p style="margin: 16px 0 8px 0;"><strong style="color: #6366f1;">💬 Message:</strong></p>
              <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #8B5CF6; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            <p style="color: #888; font-size: 12px; text-align: center; margin-bottom: 0;">
              This message was sent from your portfolio contact form.
            </p>
          </div>
        </div>
      `
    );

    console.log("Notification email sent:", notificationResult);

    // Try to send confirmation email (may fail without a verified sending domain)
    let confirmationSent = false;
    try {
      await sendEmail(
        [email],
        "Thanks for reaching out!",
        `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #8B5CF6;">Hi ${name}!</h2>
            <p>Thanks for contacting me — I received your message and will reply soon.</p>
            <p style="color: #666;">(If you don't see this in production, it usually means the email domain isn't verified yet.)</p>
          </div>
        `
      );
      confirmationSent = true;
    } catch (err) {
      const e = err as any;
      console.log(
        "Confirmation email skipped (domain likely not verified):",
        e?.message ?? e
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Message received successfully! I'll get back to you soon.",
        confirmationSent,
        note: confirmationSent
          ? undefined
          : "Confirmation emails require a verified sending domain in Resend.",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);