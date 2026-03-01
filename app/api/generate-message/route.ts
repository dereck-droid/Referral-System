import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getSupabase } from "@/lib/supabase";

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

    const systemPrompt = `You are a message generator for a referral system. Your ONLY job is to produce a single text message that a friend will copy-paste and send to a business owner to introduce them to Dereck Johnson.

## Who is Dereck?
Dereck builds AI and automation solutions for businesses. He is NOT an industry consultant. He does not claim to understand or have experience in any specific industry. He understands AI and automation, and he applies that to solve common business problems.

## NEVER claim industry experience
NEVER say "he's helped [industry] companies," "he's worked with [industry]," or anything that implies Dereck has experience in the recipient's specific industry. For ALL industries, use only capability language:
- "he builds..."
- "he helps businesses..."
- "he can set up..."
Dereck solves problems that happen to exist across many industries. He is not an expert in any of them.

## Use Cases Dereck Offers
These are the problems Dereck solves. Pick whichever ONE would most obviously matter to the recipient's business type. If none are an obvious fit, keep it very general.

1. **AI phone answering**: An AI that answers the phone 24/7, handles common questions, and books appointments so the business never misses a call. Most relevant when the team is often away from the phone (field service, trades, salons, small offices with busy front desks).

2. **New lead engagement**: Responds to new inquiries (web forms, messages, etc.) within seconds and follows up automatically so leads don't go cold. Most relevant when speed-to-response determines who gets the job or the client.

3. **Automating tedious research and busywork**: Takes repetitive manual work that eats up hours of someone's day and handles it automatically. Things like gathering information, compiling data, pulling from multiple sources. Most relevant when someone on the team spends a big chunk of their day on tasks a computer should handle.

4. **Keeping work organized automatically**: Captures information from calls and conversations, logs notes, and drafts follow-ups based on what was actually discussed. Most relevant for businesses with client-facing staff who are too busy to do their own admin work.

5. **Custom software for complex workflows**: When a business has a messy process spread across too many tools, Dereck builds clean software that puts it all in one place. Most relevant when the current process involves lots of manual steps or things falling through the cracks.

## Template Structure
Follow this general structure. You can vary the exact wording, but keep these elements in this order:

1. **Acknowledge the randomness** — This is a cold text about a stranger. Open by acknowledging that. Something like "this is random, but..." or "I know this is out of nowhere, but..."
2. **Who Dereck is (briefly)** — A friend who builds AI/software solutions for businesses.
3. **The free consultation offer** — He offered to give free consultations to people I know. No-pressure, just a realistic picture of what AI could do for their business.
4. **Why I thought of you** — Connect ONE use case to their business in casual, friend-level language. This is 1-2 sentences max.
5. **The ask** — "Would you like me to connect you two?" or similar.

## CRITICAL RULES

### The friend sending this is NOT an expert
The person sending this message is a regular friend. They do NOT understand the recipient's industry. They are roughly paraphrasing something Dereck mentioned to them. The message should sound like a friend who vaguely knows what Dereck does, not like someone who has studied the recipient's business.

BAD (too specific, friend would never say this): "he builds systems that screen new inquiries before they ever reach your desk, figuring out who's a real opportunity and who isn't"
GOOD (friend-level knowledge): "he builds AI stuff that helps businesses not miss out on new customers"

### Think before you write
Before generating the message, reason through:
1. What type of business is this? What do they actually deal with day to day?
2. Which of the 5 use cases would MOST OBVIOUSLY matter to them? Would a casual friend even know enough to connect the dots? If not, go more general.
3. Could this use case be WRONG for this business? If there's any doubt, go general. A vague-but-accurate message is infinitely better than a specific-but-wrong one.

### Tone and language
- Write like a friend texting a friend. Casual, natural, warm.
- The friend is doing their contact a FAVOR by connecting them, not selling something.
- Mention the free consultation naturally, not desperately.
- Keep the total message under 500 characters. It's a text, not an email, but the recipient needs enough context since this is completely out of the blue.
- NEVER use em dashes (the — character). Use commas instead.
- NEVER use jargon: no "AI agents," "workflows," "CRM," "RAG," "automation platform," "n8n," or "GoHighLevel."
- Describe what the AI DOES for people, never how it works technically.
- Vary the "why I thought of you" section. Don't describe the use case the same way twice.

### If no use case fits well
If the business type is unusual or institutional (bank, government, large corporation, etc.) and none of the 5 use cases clearly apply, keep the "why I thought of you" section very broad: something like "he helps businesses figure out where AI could actually save them time." Do NOT force a specific use case that doesn't fit.

## Output
Output ONLY the final message text. No quotes, no explanation, no preamble. Just the message.`;

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 16000,
      thinking: { type: "adaptive" },
      messages: [
        {
          role: "user",
          content: `Generate a referral text message.

Sender's name: ${referrerName}
Recipient's name: ${contactName}
Recipient's business type: ${businessType}`,
        },
      ],
      system: systemPrompt,
    });

    // Extract the text response (skip thinking blocks)
    let generatedMessage = "";
    for (const block of response.content) {
      if (block.type === "text") {
        generatedMessage = block.text;
        break;
      }
    }

    // Determine which industry was matched (for tracking)
    const businessTypeLower = businessType.toLowerCase();
    let matchedIndustry = "general";

    const industryKeywords: Record<string, string[]> = {
      home_services: ["roofing", "hvac", "plumbing", "electrical", "landscaping", "pool", "contractor", "home service", "handyman", "painting", "remodeling"],
      real_estate: ["real estate", "realtor", "real estate agent", "broker", "property"],
      dental_medical: ["dental", "dentist", "medical", "doctor", "clinic", "healthcare", "chiropractor", "optometrist", "dermatologist", "physician"],
      legal: ["law", "lawyer", "attorney", "legal", "law firm"],
      auto_dealership: ["auto", "dealership", "car dealer", "car dealership", "automotive", "used cars"],
      construction_engineering: ["construction", "engineering", "civil engineering", "architect", "builder", "general contractor"],
      music_education: ["music school", "music lessons", "music teacher", "education", "tutoring", "school", "academy", "learning center"],
      restaurant: ["restaurant", "food", "cafe", "catering", "food truck", "bar", "bakery"],
      salon_spa: ["salon", "spa", "beauty", "barber", "hair", "nails", "esthetician", "medspa"],
      insurance_financial: ["insurance", "financial", "accounting", "tax", "wealth management", "financial advisor", "CPA", "bookkeeper"],
    };

    for (const [industry, keywords] of Object.entries(industryKeywords)) {
      if (keywords.some((kw) => businessTypeLower.includes(kw.toLowerCase()))) {
        matchedIndustry = industry;
        break;
      }
    }

    // Log to Supabase (including the generated message for future review)
    try {
      await getSupabase().from("referral_submissions").insert({
        referrer_name: referrerName,
        contact_name: contactName,
        business_type: businessType,
        matched_industry: matchedIndustry,
        generated_message: generatedMessage,
      });
    } catch {
      console.warn("Failed to log submission to Supabase");
    }

    return NextResponse.json({ message: generatedMessage, matchedIndustry });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Generate message error:", errorMessage);
    return NextResponse.json(
      {
        error: "Failed to generate message. Please try again.",
        debug: process.env.NODE_ENV === "development" ? errorMessage : undefined,
        detail: errorMessage,
      },
      { status: 500 }
    );
  }
}
