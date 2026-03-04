import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { z } from "https://esm.sh/zod@3.22.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const applicationSchema = z.object({
  full_name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  linkedin_url: z.string().trim().max(500).optional().or(z.literal("")),
  what_building: z.string().trim().max(500).optional().default(""),
  how_using_ai: z.string().trim().max(500).optional().default(""),
  surprise_insight: z.string().trim().max(2000).optional().default(""),
  stage: z.string().trim().max(100).optional().default(""),
  product_link: z.string().trim().max(500).optional().or(z.literal("")),
  takeaway: z.string().trim().max(2000).optional().default(""),
});

const escapeHtml = (str: string): string => {
  if (!str) return "";
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
};

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const checkRateLimit = (ip: string): boolean => {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 });
    return true;
  }
  if (record.count >= 5) return false;
  record.count++;
  return true;
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const clientIp = req.headers.get("x-forwarded-for") || "unknown";
  if (!checkRateLimit(clientIp)) {
    return new Response(JSON.stringify({ error: "Too many requests" }), {
      status: 429, headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  try {
    const rawBody = await req.json();
    const parseResult = applicationSchema.safeParse(rawBody);
    if (!parseResult.success) {
      return new Response(JSON.stringify({ error: "Invalid input", details: parseResult.error.flatten() }), {
        status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const app = parseResult.data;
    const s = (v: string | undefined) => escapeHtml(v || "N/A");

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      return new Response(JSON.stringify({ error: "Email service not configured" }), {
        status: 500, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const adminEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${resendApiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "The Builder Economy <krish@themindmaker.ai>",
        to: ["krish@themindmaker.ai"],
        subject: `🎙️ New Guest Application (Builder Economy) — ${escapeHtml(app.full_name)}`,
        html: `
          <h2>New Guest Application</h2>
          <table style="border-collapse:collapse;width:100%;max-width:600px;">
            <tr><td style="padding:8px;font-weight:bold;vertical-align:top;">Name</td><td style="padding:8px;">${s(app.full_name)}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;vertical-align:top;">Email</td><td style="padding:8px;"><a href="mailto:${s(app.email)}">${s(app.email)}</a></td></tr>
            <tr><td style="padding:8px;font-weight:bold;vertical-align:top;">LinkedIn</td><td style="padding:8px;">${app.linkedin_url ? `<a href="${s(app.linkedin_url)}">${s(app.linkedin_url)}</a>` : "N/A"}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;vertical-align:top;">Building</td><td style="padding:8px;">${s(app.what_building)}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;vertical-align:top;">Using AI</td><td style="padding:8px;">${s(app.how_using_ai)}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;vertical-align:top;">Surprise</td><td style="padding:8px;">${s(app.surprise_insight)}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;vertical-align:top;">Stage</td><td style="padding:8px;">${s(app.stage)}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;vertical-align:top;">Link</td><td style="padding:8px;">${app.product_link ? `<a href="${s(app.product_link)}">${s(app.product_link)}</a>` : "N/A"}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;vertical-align:top;">Takeaway</td><td style="padding:8px;">${s(app.takeaway)}</td></tr>
          </table>
        `,
      }),
    });

    const adminResult = await adminEmailResponse.json();
    if (!adminEmailResponse.ok) console.error("Admin email failed:", adminResult);

    // Auto-reply
    const autoReplyResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${resendApiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "Krish Raja <krish@themindmaker.ai>",
        to: [app.email],
        subject: "Thanks for applying to The Builder Economy 🚀",
        html: `
          <h2>Hi ${s(app.full_name)},</h2>
          <p>Thanks for applying to be a guest on The Builder Economy. I love that you're building <strong>${s(app.what_building)}</strong>.</p>
          <p>I'll review your application and get back to you soon.</p>
          <p>— Krish</p>
        `,
      }),
    });

    const autoResult = await autoReplyResponse.json();
    if (!autoReplyResponse.ok) console.error("Auto-reply failed:", autoResult);

    return new Response(JSON.stringify({ success: true }), {
      status: 200, headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500, headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
