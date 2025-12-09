/**
 * @file notify-guest-application/index.ts
 * @description Edge function to notify admin of new guest applications and send auto-reply to applicant.
 * @trigger Called from GuestApplicationModal.tsx after successful application insert.
 * @requires RESEND_API_KEY secret
 * @security Zod validation, HTML sanitization, rate limiting
 */

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { z } from "https://esm.sh/zod@3.22.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Zod schema for input validation
const applicationSchema = z.object({
  full_name: z.string().trim().min(1, "Name is required").max(100, "Name too long"),
  email: z.string().trim().email("Invalid email").max(255, "Email too long"),
  title_company: z.string().trim().max(200, "Title too long").optional().default(""),
  topic_pitch: z.string().trim().max(2000, "Pitch too long").optional().default(""),
  social_link: z.string().trim().url("Invalid URL").max(500, "URL too long").optional().or(z.literal("")),
});

// HTML sanitization to prevent injection
const escapeHtml = (str: string): string => {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

// Simple in-memory rate limiting (resets on function cold start)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5; // max requests
const RATE_WINDOW = 60 * 1000; // per minute

const checkRateLimit = (ip: string): boolean => {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }
  
  if (record.count >= RATE_LIMIT) {
    return false;
  }
  
  record.count++;
  return true;
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Rate limiting
  const clientIp = req.headers.get("x-forwarded-for") || req.headers.get("cf-connecting-ip") || "unknown";
  if (!checkRateLimit(clientIp)) {
    console.warn(`Rate limit exceeded for IP: ${clientIp}`);
    return new Response(
      JSON.stringify({ error: "Too many requests. Please try again later." }),
      { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  try {
    const rawBody = await req.json();
    console.log("Raw application data received:", JSON.stringify(rawBody));

    // Validate input with Zod
    const parseResult = applicationSchema.safeParse(rawBody);
    if (!parseResult.success) {
      console.error("Validation failed:", parseResult.error.flatten());
      return new Response(
        JSON.stringify({ error: "Invalid input", details: parseResult.error.flatten() }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const application = parseResult.data;
    console.log("Validated application:", JSON.stringify(application));

    // Sanitize all fields for HTML email
    const safeName = escapeHtml(application.full_name);
    const safeEmail = escapeHtml(application.email);
    const safeTitle = escapeHtml(application.title_company || "N/A");
    const safePitch = escapeHtml(application.topic_pitch || "N/A");
    const safeLink = escapeHtml(application.social_link || "N/A");

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      console.error("RESEND_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Send notification to admin
    console.log("Sending admin notification email...");
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
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Title/Company:</strong> ${safeTitle}</p>
          <p><strong>Topic Pitch:</strong></p>
          <p>${safePitch}</p>
          <p><strong>Social Link:</strong> ${safeLink}</p>
        `,
      }),
    });

    const adminEmailResult = await adminEmailResponse.json();
    console.log("Admin email response:", JSON.stringify(adminEmailResult), "Status:", adminEmailResponse.status);

    if (!adminEmailResponse.ok) {
      console.error("Failed to send admin email:", adminEmailResult);
    }

    // Send auto-reply to applicant
    console.log("Sending auto-reply to applicant...");
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
          <h2>Hi ${safeName},</h2>
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

    const autoReplyResult = await autoReplyResponse.json();
    console.log("Auto-reply response:", JSON.stringify(autoReplyResult), "Status:", autoReplyResponse.status);

    if (!autoReplyResponse.ok) {
      console.error("Failed to send auto-reply:", autoReplyResult);
    }

    return new Response(
      JSON.stringify({ success: true, adminEmail: adminEmailResult, autoReply: autoReplyResult }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in notify-guest-application:", error.message, error.stack);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
