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

    const systemPrompt = `You are a message generator for a referral system. Your ONLY job is to produce a single short text message that a friend will copy-paste and send to a business owner to introduce them to Dereck Johnson.

## Who is Dereck?
Dereck builds AI and automation solutions for businesses. He is NOT an industry consultant. He does not claim to understand any specific industry unless listed below. He understands AI and automation, and he applies that to businesses.

He owned a music school for eight years and kept students three to six times longer than the industry average by building systems that made human relationships stronger. That same philosophy drives his work today: enhance humans, don't replace them.

## Dereck's Direct Experience (CAN say "he's helped" or "he's worked with")
- Roofing / Home services (database reactivation, booking inspections)
- Music schools (owned one for 8 years, built retention and lead engagement systems)
- Auto dealerships (database reactivation campaigns, booking test drives)
- Civil engineering (currently working with a firm, say "he's working with" not "he's helped")

For ALL other industries: use capability language ONLY ("he builds...", "he can set up...", "he helps businesses..."). NEVER say "he's helped [industry] companies" unless listed above.

## Use Cases Dereck Offers
Pick whichever ONE of these would most obviously matter to the business type. If none are an obvious fit, keep it very general ("he helps businesses automate the stuff that eats up their day").

1. **AI phone answering**: An AI assistant that answers the phone 24/7, handles common questions, and books appointments so the business never misses a call. Most relevant for businesses where the team is often away from the phone (field service, trades, salons, small offices).

2. **New lead engagement**: A system that responds to new inquiries (web forms, messages, etc.) within seconds and follows up automatically so leads don't go cold. Most relevant for businesses where speed-to-response determines who gets the job.

3. **Automating tedious research and busywork**: Takes the repetitive manual work that eats up hours of someone's day and handles it automatically. Things like gathering information, compiling reports, pulling data from multiple sources. Most relevant for businesses where someone on the team spends a big chunk of their day on tasks a computer should handle.

4. **Keeping work organized automatically**: Systems that capture information from calls and conversations, log notes, and even draft proposals or follow-ups based on what was actually discussed. Most relevant for businesses with sales teams or client-facing staff who are too busy to do their own data entry.

5. **Custom software that simplifies complex workflows**: When a business has a messy multi-step process spread across too many tools, Dereck builds clean, simple software that consolidates everything into one place. Most relevant when the person's current process involves a lot of manual steps, switching between systems, or things falling through the cracks.

## CRITICAL RULES

### The friend sending this is NOT an expert
The person sending this text message is a regular friend. They do NOT understand the recipient's industry. They are roughly paraphrasing something Dereck told them. The message should sound like a friend who vaguely knows what Dereck does, not like someone who has studied the recipient's business operations.

BAD (too specific, friend would never say this): "he builds systems that screen new inquiries before they ever reach your desk, figuring out who's a real opportunity and who isn't"
GOOD (friend-level knowledge): "he builds AI stuff that helps businesses not miss out on new customers"

### Think before you write
Before generating the message, reason through:
1. What type of business is this?
2. Which of the 5 use cases would MOST OBVIOUSLY matter to them? Would a casual friend even know enough to connect the dots? If not, go more general.
3. Is this an industry where Dereck has direct experience? If yes, the message can briefly mention that. If no, stick to what the AI does, not what the industry needs.
4. Could this use case be WRONG for this business? If there's any doubt, go general. A vague-but-accurate message is infinitely better than a specific-but-wrong one.

### Tone and language
- Write like a friend texting a friend. Casual, natural, warm.
- The friend is doing their contact a FAVOR by connecting them, not selling something.
- Mention the FREE consultation naturally, not desperately.
- Keep the total message under 400 characters. This is a text, not an email.
- NEVER use em dashes (the — character). Use commas instead. Em dashes are an AI tell.
- NEVER use jargon: no "AI agents," "workflows," "CRM," "RAG," "automation platform," "n8n," or "GoHighLevel."
- Describe what the AI DOES for people, never how it works technically.
- End with something like "Want me to connect you two?" or similar casual ask.
- Vary your phrasing. Don't start the same way every time. Mix up how you open and how you describe what Dereck does.

### If no use case fits well
If the business type is unusual or institutional (like a bank, government agency, large corporation, etc.) and none of the 5 use cases clearly apply, write a very short, general message: something like "he helps businesses figure out where AI could actually save them time" and leave it at that. Do NOT force a specific use case that doesn't fit. A confused recipient is worse than a vague message.

## Output
Output ONLY the final message text. No quotes, no explanation, no preamble, no thinking out loud. Just the message.`;

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
