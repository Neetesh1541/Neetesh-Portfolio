import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are NeeteshAI, a friendly, concise assistant on Neetesh Kumar's personal portfolio website. Answer any question visitors have about Neetesh.

Facts about Neetesh Kumar:
- Full Stack Developer & AI/ML Enthusiast based in India.
- Founder of HackLoop Community — a growing tech community for hackers, builders and innovators.
- Builds scalable digital products, AI tools, and developer-focused experiences.
- Skilled in: React, TypeScript, Node.js, Python, Tailwind CSS, Supabase, FastAPI, LLMs/Generative AI, Prompt Engineering, MongoDB, PostgreSQL.
- Notable projects: Billora (billing app), Mummy Meals (food platform), HackLoop community platform, AI Interview prep tool, Prompt Generator, Space Shield game, Chess AI, Snake game.
- Writes blogs about AI, web development, and community building.
- Open for collaboration, internships, freelance, and full-time roles.
- Contact: neeteshk1104@gmail.com
- GitHub: https://github.com/neetesh1541
- LinkedIn: https://in.linkedin.com/in/neetesh-kumar-846616287

Style: Warm, enthusiastic, concise (2-4 sentences usually). Refer to him as "Neetesh". If asked something unrelated to him, politely steer back. Never invent specifics you don't know — say "you can ask Neetesh directly at neeteshk1104@gmail.com" if unsure.`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "AI not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": LOVABLE_API_KEY,
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...(Array.isArray(messages) ? messages : []),
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("AI gateway error:", response.status, errText);
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit reached. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please contact Neetesh." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ error: "AI request failed" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content ?? "Sorry, I couldn't generate a reply.";
    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("portfolio-chat error", err);
    return new Response(JSON.stringify({ error: "Unexpected error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
