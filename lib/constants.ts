// Fallback data — no longer used by the message generation prompt
// (the system prompt is now self-contained with use cases and rules).
// Kept for reference and potential future use.

export const FALLBACK_TEMPLATE = `Hey [Contact First Name], this is random, but I have a friend who helps businesses automate the stuff that eats up their day using AI. He's offering free consultations to people I know, just a casual conversation about what might actually help. I thought of you because [1 brief, friend-appropriate sentence]. Want me to connect you two?`;

export const FALLBACK_TONE_RULES = [
  "Write like a friend texting a friend, casual, natural, warm",
  "The friend is doing their contact a FAVOR by connecting them",
  "Include only 1 specific use case, just enough to spark recognition, not a sales pitch",
  "Describe what the AI DOES for people, never how it works technically",
  'No jargon: no "AI agents," "workflows," "CRM," "RAG," "automation platform," "n8n," or "GoHighLevel"',
  'End with a casual ask like "Want me to connect you two?"',
  "The consultation is FREE, mention it naturally, not desperately",
  "Keep the total message under 400 characters, it is a text not an email",
  "NEVER use em dashes, use commas instead. Em dashes are an AI tell.",
  "NEVER claim Dereck has worked with an industry unless he has direct experience",
  "The sender is a regular friend, NOT an industry expert. Keep examples at a friend-level of knowledge.",
];

export const FALLBACK_INDUSTRIES = [
  {
    industry: "home_services",
    keywords: ["roofing", "hvac", "plumbing", "electrical", "landscaping", "pool", "contractor", "home service", "handyman", "painting", "remodeling"],
    examples: "AI phone answering so they never miss a call when they're on a job, plus reactivating old leads who inquired but never booked.",
    has_direct_experience: true,
    experience_note: "he's helped",
  },
  {
    industry: "real_estate",
    keywords: ["real estate", "realtor", "real estate agent", "broker", "property"],
    examples: "Responding to new leads instantly so they don't move on to another agent.",
    has_direct_experience: false,
    experience_note: "he builds systems that",
  },
  {
    industry: "dental_medical",
    keywords: ["dental", "dentist", "medical", "doctor", "clinic", "healthcare", "chiropractor", "optometrist", "dermatologist", "physician"],
    examples: "Automated appointment reminders and bringing back patients who haven't been in for a while.",
    has_direct_experience: false,
    experience_note: "he builds systems that",
  },
  {
    industry: "legal",
    keywords: ["law", "lawyer", "attorney", "legal", "law firm"],
    examples: "Responding to new inquiries fast and automating follow-up so leads don't go cold.",
    has_direct_experience: false,
    experience_note: "he builds systems that",
  },
  {
    industry: "auto_dealership",
    keywords: ["auto", "dealership", "car dealer", "car dealership", "automotive", "used cars"],
    examples: "Reactivating old leads who inquired but never bought, booking test drives and service appointments.",
    has_direct_experience: true,
    experience_note: "he's helped",
  },
  {
    industry: "construction_engineering",
    keywords: ["construction", "engineering", "civil engineering", "architect", "builder", "general contractor"],
    examples: "Automating the research and data gathering that takes hours before quoting a project.",
    has_direct_experience: true,
    experience_note: "he's working with",
  },
  {
    industry: "music_education",
    keywords: ["music school", "music lessons", "music teacher", "education", "tutoring", "school", "academy", "learning center"],
    examples: "He owned a music school for 8 years and built systems that kept students way longer than normal.",
    has_direct_experience: true,
    experience_note: "he's helped",
  },
  {
    industry: "restaurant",
    keywords: ["restaurant", "food", "cafe", "catering", "food truck", "bar", "bakery"],
    examples: "Keeping in touch with past customers to get them back in, and handling reviews automatically.",
    has_direct_experience: false,
    experience_note: "he builds systems that",
  },
  {
    industry: "salon_spa",
    keywords: ["salon", "spa", "beauty", "barber", "hair", "nails", "esthetician", "medspa"],
    examples: "Filling gaps in the schedule by reaching out to clients who haven't been in for a while.",
    has_direct_experience: false,
    experience_note: "he builds systems that",
  },
  {
    industry: "insurance_financial",
    keywords: ["insurance", "financial", "accounting", "tax", "wealth management", "financial advisor", "CPA", "bookkeeper"],
    examples: "Following up with new leads fast so they don't go cold, and automating the documentation busywork.",
    has_direct_experience: false,
    experience_note: "he builds systems that",
  },
  {
    industry: "general",
    keywords: [],
    examples: "Helping businesses figure out where AI could actually save them time.",
    has_direct_experience: false,
    experience_note: "he helps businesses",
  },
];
