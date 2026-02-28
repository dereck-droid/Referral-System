import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getSupabase } from "@/lib/supabase";
import {
  FALLBACK_TEMPLATE,
  FALLBACK_TONE_RULES,
  FALLBACK_INDUSTRIES,
} from "@/lib/constants";

export async function POST(request: NextRequest) {
  try {
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
    const { referrerName, contactName, businessType } = await request.json();

    if (!referrerName || !contactName || !businessType) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Fetch editable content from Supabase (with fallbacks)
    let template = FALLBACK_TEMPLATE;
    let toneRules = FALLBACK_TONE_RULES;
    let industries = FALLBACK_INDUSTRIES;

    try {
      const sb = getSupabase();
      const [templateRes, rulesRes, industriesRes] = await Promise.all([
        sb
          .from("message_templates")
          .select("template")
          .eq("name", "default")
          .single(),
        sb
          .from("tone_rules")
          .select("rule")
          .eq("active", true)
          .order("id"),
        sb.from("industry_examples").select("*").order("industry"),
      ]);

      if (templateRes.data?.template) {
        template = templateRes.data.template;
      }
      if (rulesRes.data && rulesRes.data.length > 0) {
        toneRules = rulesRes.data.map(
          (r: { rule: string }) => r.rule
        );
      }
      if (industriesRes.data && industriesRes.data.length > 0) {
        industries = industriesRes.data;
      }
    } catch {
      // Supabase unavailable, use fallbacks
      console.warn("Supabase unavailable, using fallback data");
    }

    // Build the industry context for the prompt
    const industryContext = industries
      .map((ind) => {
        const expLabel = ind.has_direct_experience
          ? `Direct experience: YES (use "${ind.experience_note}")`
          : `Direct experience: NO (use capability language like "${ind.experience_note}")`;
        const keywords =
          ind.keywords && ind.keywords.length > 0
            ? `Keywords: ${ind.keywords.join(", ")}`
            : "Keywords: (general/fallback)";
        return `### ${ind.industry}\n${expLabel}\n${keywords}\nExamples: ${ind.examples}`;
      })
      .join("\n\n");

    const rulesText = toneRules
      .map((rule, i) => `${i + 1}. ${rule}`)
      .join("\n");

    const systemPrompt = `You are a message generator for a referral system. Your ONLY job is to generate a single text message that a friend will send to a business owner to introduce them to Dereck Johnson, who builds AI and automation solutions for businesses.

## Template
${template}

## Available Industry Examples
${industryContext}

## Tone and Language Rules (MUST FOLLOW ALL)
${rulesText}

## Critical Instructions
- Match the business type "${businessType}" to the closest industry above
- If no clear match, use the general/unknown template
- Replace [Contact First Name] with "${contactName}"
- Select 1-2 relevant examples from the matched industry and weave them naturally into the "I thought of you because" section
- NEVER use em dashes (the — character). Use commas instead.
- NEVER claim Dereck has experience in an industry unless it is marked as "Direct experience: YES"
- For industries without direct experience, use capability language ("he builds systems that...", "he helps businesses...")
- Output ONLY the final message text. No quotes, no explanation, no preamble.
- Keep the message under 500 characters when possible.`;

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-5-20250514",
      max_tokens: 600,
      messages: [
        {
          role: "user",
          content: `Generate a referral text message from ${referrerName} to ${contactName} who runs a ${businessType}.`,
        },
      ],
      system: systemPrompt,
    });

    const generatedMessage =
      response.content[0].type === "text" ? response.content[0].text : "";

    // Determine which industry was matched (for tracking)
    const businessTypeLower = businessType.toLowerCase();
    let matchedIndustry = "general";
    for (const ind of industries) {
      if (ind.keywords && ind.keywords.length > 0) {
        if (
          ind.keywords.some((kw: string) => businessTypeLower.includes(kw.toLowerCase()))
        ) {
          matchedIndustry = ind.industry;
          break;
        }
      }
    }

    // Log to Supabase
    try {
      await getSupabase().from("referral_submissions").insert({
        referrer_name: referrerName,
        contact_name: contactName,
        business_type: businessType,
        matched_industry: matchedIndustry,
      });
    } catch {
      console.warn("Failed to log submission to Supabase");
    }

    return NextResponse.json({ message: generatedMessage, matchedIndustry });
  } catch (error) {
    console.error("Generate message error:", error);
    return NextResponse.json(
      { error: "Failed to generate message. Please try again." },
      { status: 500 }
    );
  }
}
