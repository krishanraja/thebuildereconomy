import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface GuestApplication {
  full_name: string;
  email: string;
  title_company?: string;
  topic_pitch?: string;
  social_link?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const application: GuestApplication = await req.json();
    console.log("Processing guest application:", application);

    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    // Send notification to admin
    const adminEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "The Builder Economy <onboarding@resend.dev>",
        to: ["krish@themindmaker.ai"],
        subject: "🎙️ New Guest Application — The Builder Economy",
        html: `
          <h2>New Guest Application Received</h2>
          <p><strong>Name:</strong> ${application.full_name}</p>
          <p><strong>Email:</strong> ${application.email}</p>
          <p><strong>Title/Company:</strong> ${application.title_company || "N/A"}</p>
          <p><strong>Topic Pitch:</strong></p>
          <p>${application.topic_pitch || "N/A"}</p>
          <p><strong>Social Link:</strong> ${application.social_link || "N/A"}</p>
        `,
      }),
    });

    const adminEmail = await adminEmailResponse.json();
    console.log("Admin notification sent:", adminEmail);

    // Send auto-reply to applicant
    const autoReplyResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Krish Raja <onboarding@resend.dev>",
        to: [application.email],
        subject: "Thanks for applying to The Builder Economy 🚀",
        html: `
          <h2>Hi ${application.full_name},</h2>
          <p>Thanks for applying to join The Builder Economy.</p>
          <p>We'll review your pitch and be in touch soon.</p>
          <p>In the meantime, check out our latest episodes:</p>
          <ul>
            <li><a href="https://thebuildereconomy.com">Recent Episodes</a></li>
          </ul>
          <p>Best regards,<br>Krish Raja</p>
        `,
      }),
    });

    const autoReply = await autoReplyResponse.json();
    console.log("Auto-reply sent:", autoReply);

    return new Response(
      JSON.stringify({ success: true, adminEmail, autoReply }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in notify-guest-application:", error);
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
