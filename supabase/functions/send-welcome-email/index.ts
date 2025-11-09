import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface Subscriber {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const subscriber: Subscriber = await req.json();
    console.log("Sending welcome email to:", subscriber.email);

    const resendApiKey = Deno.env.get("RESEND_API_KEY");

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

    const emailResponse = await emailApiResponse.json();
    console.log("Welcome email sent:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, emailResponse }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-welcome-email:", error);
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
