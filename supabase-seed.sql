-- Referral Connector System — Supabase Schema & Seed Data
-- Run this in the Supabase SQL Editor to set up your tables and initial data.

-- 1. Message Templates
CREATE TABLE IF NOT EXISTS message_templates (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL UNIQUE,
  template text NOT NULL,
  updated_at timestamptz DEFAULT now()
);

INSERT INTO message_templates (name, template) VALUES (
  'default',
  'Hey [Contact First Name], this is random, but I have a friend who builds AI and software solutions for businesses. He offered to give free consultations to people I know, basically a no-pressure conversation to get a realistic picture of what AI could do in your business. I thought of you because [1-2 sentences with specific, relevant examples based on their business type]. Would you like me to connect you two?'
);

-- 2. Tone Rules
CREATE TABLE IF NOT EXISTS tone_rules (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  rule text NOT NULL,
  active boolean DEFAULT true,
  updated_at timestamptz DEFAULT now()
);

INSERT INTO tone_rules (rule) VALUES
  ('Write like a friend texting a friend, casual, natural, warm'),
  ('The friend is doing their contact a FAVOR by connecting them'),
  ('Include only 1-2 specific examples, just enough to spark recognition, not a sales pitch'),
  ('Describe what the AI DOES for people, never how it works technically'),
  ('No jargon: no "AI agents," "workflows," "CRM," "RAG," "automation platform," "n8n," or "GoHighLevel"'),
  ('End with: "Would you like me to connect you two?"'),
  ('The consultation is FREE, mention it naturally, not desperately'),
  ('Keep the total message under 500 characters when possible, it is a text not an email'),
  ('NEVER use em dashes (the — character). Use commas instead. Em dashes are an AI tell.'),
  ('NEVER claim Dereck has worked with an industry unless marked as direct experience');

-- 3. Industry Examples
CREATE TABLE IF NOT EXISTS industry_examples (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  industry text NOT NULL UNIQUE,
  keywords text[] NOT NULL DEFAULT '{}',
  examples text NOT NULL,
  has_direct_experience boolean DEFAULT false,
  experience_note text NOT NULL DEFAULT 'he builds systems that',
  updated_at timestamptz DEFAULT now()
);

INSERT INTO industry_examples (industry, keywords, examples, has_direct_experience, experience_note) VALUES
(
  'home_services',
  ARRAY['roofing', 'hvac', 'plumbing', 'electrical', 'landscaping', 'pool', 'contractor', 'home service', 'handyman', 'painting', 'remodeling'],
  'He''s helped home service companies bring old leads back to life, reaching out to people who inquired months ago and booking jobs from leads they''d written off. He also builds systems that respond to new inquiries right away so you''re not losing work to whoever gets back to them first.',
  true,
  'he''s helped'
),
(
  'real_estate',
  ARRAY['real estate', 'realtor', 'real estate agent', 'broker', 'property'],
  'he builds systems that respond to new leads within seconds of them coming in and can go back through old contacts to find out who''s actually ready to move now.',
  false,
  'he builds systems that'
),
(
  'dental_medical',
  ARRAY['dental', 'dentist', 'medical', 'doctor', 'clinic', 'healthcare', 'chiropractor', 'optometrist', 'dermatologist', 'physician'],
  'he builds systems that bring back patients who haven''t been in for a while with personal outreach that doesn''t feel like a mass message, and takes care of appointment booking and reminders so your front desk isn''t buried.',
  false,
  'he builds systems that'
),
(
  'legal',
  ARRAY['law', 'lawyer', 'attorney', 'legal', 'law firm'],
  'he builds systems that screen new inquiries before they ever reach your desk, figuring out who''s a real opportunity and who isn''t, and automates things like pulling together follow-up documents and proposals after client calls.',
  false,
  'he builds systems that'
),
(
  'auto_dealership',
  ARRAY['auto', 'dealership', 'car dealer', 'car dealership', 'automotive', 'used cars'],
  'he''s helped dealerships go back to people who inquired but never bought and get them back in the door, booking test drives and service appointments from leads they''d given up on.',
  true,
  'he''s helped'
),
(
  'construction_engineering',
  ARRAY['construction', 'engineering', 'civil engineering', 'architect', 'builder', 'general contractor'],
  'he''s working with an engineering firm right now to automate the research that usually takes hours before you can even quote a project, things like pulling property data, checking zoning requirements, and reaching out to utility providers, so the team can spend their time on actual engineering work.',
  true,
  'he''s working with'
),
(
  'music_education',
  ARRAY['music school', 'music lessons', 'music teacher', 'education', 'tutoring', 'school', 'academy', 'learning center'],
  'he actually owned a music school for eight years and built the systems that kept his students three to six times longer than the industry average. He helps schools respond to new inquiries immediately, keep parents in the loop automatically, and catch students who might be about to drop off before it''s too late.',
  true,
  'he''s helped'
),
(
  'restaurant',
  ARRAY['restaurant', 'food', 'cafe', 'catering', 'food truck', 'bar', 'bakery'],
  'he builds systems that handle things like responding to online inquiries automatically, keeping in touch with past customers to get them back in, and making sure reviews and follow-ups happen without anyone on your team having to think about it.',
  false,
  'he builds systems that'
),
(
  'salon_spa',
  ARRAY['salon', 'spa', 'beauty', 'barber', 'hair', 'nails', 'esthetician', 'medspa'],
  'he builds systems that fill gaps in the schedule by automatically reaching out to clients who haven''t been in for a while, and handles booking, confirmations, and reminders so your team can focus on the clients in the chair.',
  false,
  'he builds systems that'
),
(
  'insurance_financial',
  ARRAY['insurance', 'financial', 'accounting', 'tax', 'wealth management', 'financial advisor', 'CPA', 'bookkeeper'],
  'he builds systems that follow up with new leads right away so they don''t go cold, and automates a lot of the documentation side, things like pulling together summaries and next steps after calls so your team isn''t spending half their day on data entry.',
  false,
  'he builds systems that'
),
(
  'general',
  ARRAY[]::text[],
  'he helps business owners set up systems that respond to new customers right away, follow up automatically with people who went quiet, and take the repetitive busywork off their team''s plate so they can focus on the work that actually grows the business.',
  false,
  'he helps businesses'
);

-- 4. Referral Submissions (tracking)
CREATE TABLE IF NOT EXISTS referral_submissions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_name text NOT NULL,
  contact_name text NOT NULL,
  business_type text NOT NULL,
  matched_industry text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE message_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE tone_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE industry_examples ENABLE ROW LEVEL SECURITY;
ALTER TABLE referral_submissions ENABLE ROW LEVEL SECURITY;

-- Service role can do everything (our API uses service role key)
CREATE POLICY "Service role full access" ON message_templates FOR ALL USING (true);
CREATE POLICY "Service role full access" ON tone_rules FOR ALL USING (true);
CREATE POLICY "Service role full access" ON industry_examples FOR ALL USING (true);
CREATE POLICY "Service role full access" ON referral_submissions FOR ALL USING (true);
