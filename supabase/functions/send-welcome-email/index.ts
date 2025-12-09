/**
 * @file send-welcome-email/index.ts
 * @description Edge function to send welcome email to new subscribers via Resend API.
 * @trigger Called from Subscribe.tsx after successful subscriber insert.
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
const subscriberSchema = z.object({
  email: z.string().trim().email("Invalid email address").max(255, "Email too long"),
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
    console.log("Raw subscriber data received:", JSON.stringify(rawBody));

    // Validate input with Zod
    const parseResult = subscriberSchema.safeParse(rawBody);
    if (!parseResult.success) {
      console.error("Validation failed:", parseResult.error.flatten());
      return new Response(
        JSON.stringify({ error: "Invalid email address", details: parseResult.error.flatten() }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const subscriber = parseResult.data;
    console.log("Validated subscriber:", subscriber.email);

    // Sanitize email for HTML (in case it's displayed)
    const safeEmail = escapeHtml(subscriber.email);

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      console.error("RESEND_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Sending welcome email via Resend...");
    const emailApiResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "The Builder Economy <onboarding@resend.dev>",
        to: [subscriber.email],
        subject: "Welcome to The Builder Circle 🎉",
        html: `
          <h1>You're in.</h1>
          <p>You just joined The Builder Economy, a community for people who create the future with AI.</p>
          <h2>Start here:</h2>
          <ol>
            <li><a href="https://thebuildereconomy.com/ep/origin">Our origin episode</a></li>
            <li><a href="https://thebuildereconomy.com/ep/tactics">A tactical deep dive</a></li>
            <li><a href="https://thebuildereconomy.com/ep/vision">A visionary piece</a></li>
          </ol>
          <p>Stay tuned for exclusive content, early access to new episodes, and insights from the brightest minds building with AI.</p>
          <p>Best,<br>Krish Raja<br>The Builder Economy</p>
        `,
      }),
    });

    const emailResult = await emailApiResponse.json();
    console.log("Resend response:", JSON.stringify(emailResult), "Status:", emailApiResponse.status);

    if (!emailApiResponse.ok) {
      console.error("Failed to send welcome email:", emailResult);
      return new Response(
        JSON.stringify({ error: "Failed to send email", details: emailResult }),
        { status: emailApiResponse.status, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, emailResponse: emailResult }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in send-welcome-email:", error.message, error.stack);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
