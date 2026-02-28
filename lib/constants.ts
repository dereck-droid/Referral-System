// Fallback data in case Supabase is unreachable.
// Primary source of truth is the Supabase tables.

export const FALLBACK_TEMPLATE = `Hey [Contact First Name], this is random, but I have a friend who builds AI and software solutions for businesses. He offered to give free consultations to people I know, basically a no-pressure conversation to get a realistic picture of what AI could do in your business. I thought of you because [1-2 sentences with specific, relevant examples based on their business type]. Would you like me to connect you two?`;

export const FALLBACK_TONE_RULES = [
  "Write like a friend texting a friend, casual, natural, warm",
  "The friend is doing their contact a FAVOR by connecting them",
  "Include only 1-2 specific examples, just enough to spark recognition, not a sales pitch",
  "Describe what the AI DOES for people, never how it works technically",
  'No jargon: no "AI agents," "workflows," "CRM," "RAG," "automation platform," "n8n," or "GoHighLevel"',
  'End with: "Would you like me to connect you two?"',
  "The consultation is FREE, mention it naturally, not desperately",
  "Keep the total message under 500 characters when possible, it is a text not an email",
  "NEVER use em dashes, use commas instead. Em dashes are an AI tell.",
  "NEVER claim Dereck has worked with an industry unless marked as direct experience",
];

export const FALLBACK_INDUSTRIES = [
  {
    industry: "home_services",
    keywords: [
      "roofing",
      "hvac",
      "plumbing",
      "electrical",
      "landscaping",
      "pool",
      "contractor",
      "home service",
      "handyman",
      "painting",
      "remodeling",
    ],
    examples:
      "He's helped home service companies bring old leads back to life, reaching out to people who inquired months ago and booking jobs from leads they'd written off. He also builds systems that respond to new inquiries right away so you're not losing work to whoever gets back to them first.",
    has_direct_experience: true,
    experience_note: "he's helped",
  },
  {
    industry: "real_estate",
    keywords: [
      "real estate",
      "realtor",
      "real estate agent",
      "broker",
      "property",
    ],
    examples:
      "he builds systems that respond to new leads within seconds of them coming in and can go back through old contacts to find out who's actually ready to move now.",
    has_direct_experience: false,
    experience_note: "he builds systems that",
  },
  {
    industry: "dental_medical",
    keywords: [
      "dental",
      "dentist",
      "medical",
      "doctor",
      "clinic",
      "healthcare",
      "chiropractor",
      "optometrist",
      "dermatologist",
      "physician",
    ],
    examples:
      "he builds systems that bring back patients who haven't been in for a while with personal outreach that doesn't feel like a mass message, and takes care of appointment booking and reminders so your front desk isn't buried.",
    has_direct_experience: false,
    experience_note: "he builds systems that",
  },
  {
    industry: "legal",
    keywords: ["law", "lawyer", "attorney", "legal", "law firm"],
    examples:
      "he builds systems that screen new inquiries before they ever reach your desk, figuring out who's a real opportunity and who isn't, and automates things like pulling together follow-up documents and proposals after client calls.",
    has_direct_experience: false,
    experience_note: "he builds systems that",
  },
  {
    industry: "auto_dealership",
    keywords: [
      "auto",
      "dealership",
      "car dealer",
      "car dealership",
      "automotive",
      "used cars",
    ],
    examples:
      "he's helped dealerships go back to people who inquired but never bought and get them back in the door, booking test drives and service appointments from leads they'd given up on.",
    has_direct_experience: true,
    experience_note: "he's helped",
  },
  {
    industry: "construction_engineering",
    keywords: [
      "construction",
      "engineering",
      "civil engineering",
      "architect",
      "builder",
      "general contractor",
    ],
    examples:
      "he's working with an engineering firm right now to automate the research that usually takes hours before you can even quote a project, things like pulling property data, checking zoning requirements, and reaching out to utility providers, so the team can spend their time on actual engineering work.",
    has_direct_experience: true,
    experience_note: "he's working with",
  },
  {
    industry: "music_education",
    keywords: [
      "music school",
      "music lessons",
      "music teacher",
      "education",
      "tutoring",
      "school",
      "academy",
      "learning center",
    ],
    examples:
      "he actually owned a music school for eight years and built the systems that kept his students three to six times longer than the industry average. He helps schools respond to new inquiries immediately, keep parents in the loop automatically, and catch students who might be about to drop off before it's too late.",
    has_direct_experience: true,
    experience_note: "he's helped",
  },
  {
    industry: "restaurant",
    keywords: [
      "restaurant",
      "food",
      "cafe",
      "catering",
      "food truck",
      "bar",
      "bakery",
    ],
    examples:
      "he builds systems that handle things like responding to online inquiries automatically, keeping in touch with past customers to get them back in, and making sure reviews and follow-ups happen without anyone on your team having to think about it.",
    has_direct_experience: false,
    experience_note: "he builds systems that",
  },
  {
    industry: "salon_spa",
    keywords: [
      "salon",
      "spa",
      "beauty",
      "barber",
      "hair",
      "nails",
      "esthetician",
      "medspa",
    ],
    examples:
      "he builds systems that fill gaps in the schedule by automatically reaching out to clients who haven't been in for a while, and handles booking, confirmations, and reminders so your team can focus on the clients in the chair.",
    has_direct_experience: false,
    experience_note: "he builds systems that",
  },
  {
    industry: "insurance_financial",
    keywords: [
      "insurance",
      "financial",
      "accounting",
      "tax",
      "wealth management",
      "financial advisor",
      "CPA",
      "bookkeeper",
    ],
    examples:
      "he builds systems that follow up with new leads right away so they don't go cold, and automates a lot of the documentation side, things like pulling together summaries and next steps after calls so your team isn't spending half their day on data entry.",
    has_direct_experience: false,
    experience_note: "he builds systems that",
  },
  {
    industry: "general",
    keywords: [],
    examples:
      "he helps business owners set up systems that respond to new customers right away, follow up automatically with people who went quiet, and take the repetitive busywork off their team's plate so they can focus on the work that actually grows the business.",
    has_direct_experience: false,
    experience_note: "he helps businesses",
  },
];
