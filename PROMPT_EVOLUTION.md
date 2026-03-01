# Referral System — Prompt Evolution Document

**Purpose:** Documents the original prompt design, the problems discovered through live testing, the decisions made, and the reasoning behind the new approach. Reference this before making further changes to message generation.

---

## Original Design

### Concept
A 3-field form (referrer name, contact name, business type) that instantly generates a ready-to-send text message for a friend to send to a business owner introducing Dereck Johnson, who builds AI and automation solutions for businesses.

### Original Message Template (Hard-Coded)
```
Hey [Contact First Name], this is random, but I have a friend who builds AI and software solutions for businesses. He offered to give free consultations to people I know, basically a no-pressure conversation to get a realistic picture of what AI could do in your business. I thought of you because [1-2 sentences with specific, relevant examples based on their business type]. Would you like me to connect you two?
```

The opening and closing were fixed strings. The AI only filled in the middle portion.

### Original Prompt Strategy
The AI was given:
1. A rigid template with a fixed opening (~280 characters) that never changed
2. A full reference file (`ai-use-case-reference.md`) with 11 industry sections
3. Each industry section contained fully pre-written example sentences for the AI to select from and insert into the template
4. Instructions to match the business type to the closest industry and pick 1–2 examples to weave into "I thought of you because..."
5. Tone rules (no em dashes, no jargon, keep under 500 characters, etc.)
6. An experience/capability distinction (can say "he's helped" only for roofing, music schools, auto dealerships, civil engineering)

**Industries covered with full pre-written example text:**
- Home Services (Roofing, HVAC, Plumbing, etc.)
- Real Estate
- Dental / Medical
- Law Firm / Legal
- Auto Dealership
- Construction / Engineering
- Music School / Education
- Restaurant / Food Service
- Salon / Spa / Beauty
- Insurance / Financial Services
- General / Unknown

**Model used:** claude-sonnet-4-5
**Approach:** Single API call, standard (no extended thinking)

---

## What We Were Unsatisfied With

We tested the original prompt against 9 different business types by hitting the live API and scored each output on two criteria:
1. **Relevance** — How well did the message speak to problems the business actually faces?
2. **Positioning** — Did it make the sender sound like an expert in the recipient's industry? (Bad.) Or like a friend who vaguely knows an AI guy? (Good.)

### Scores (Original Prompt)

| Business Type | Relevance | Positioning | Avg |
|---|---|---|---|
| Dentist | 4 | 3 | 3.5 |
| Lawyer | 3 | 2 | 2.5 |
| Bank | 2 | 3 | 2.5 |
| HVAC | 5 | 4 | 4.5 |
| Manufacturing | 2 | 4 | 3.0 |
| Car Dealership | 4 | 5 | 4.5 |
| Restaurant | 3 | 3 | 3.0 |
| Construction | 3 | 3 | 3.0 |
| General Contractor | 2 | 3 | 2.5 |
| **Average** | **3.1** | **3.3** | **3.2** |

### The 5 Core Problems Found

**Problem 1: The friend sounded impossibly knowledgeable.**
The AI was given fully-written example sentences like:
> "he builds systems that screen new inquiries before they ever reach your desk, figuring out who's a real opportunity and who isn't"

Claude inserted these near-verbatim into the template. The result was a friend who casually referenced legal intake workflows with consultant-level specificity. Nobody texts like that. The sender ends up looking like they've studied the recipient's business operations, which is both implausible and slightly off-putting.

**Problem 2: The "general" fallback assumed every business had a sales pipeline.**
The general template talked about "responding to new customers right away" and "following up with people who went quiet" — language that only makes sense for local service businesses with inbound leads. When Bank or Manufacturing matched to "general," the message sounded like it was written for a plumber. The sender looked clueless about what those businesses actually do.

**Problem 3: Zero variation in the opening.**
Every single message started with the same 280-character block: `"Hey [Name], this is random, but I have a friend who builds AI and software solutions for businesses. He offered to give free consultations to people I know, basically a no-pressure conversation to get a realistic picture of what AI could do in your business. I thought of you because..."`. If someone used the tool 3 times, all 3 messages looked copy-pasted.

**Problem 4: Messages were too long.**
Most outputs were 450–550 characters. Real friend-to-friend text recommendations are 2–3 sentences.

**Problem 5: Construction and General Contractor produced nearly identical messages.**
Both matched to `construction_engineering` and the AI used the same engineering-firm example text for both. A general contractor doesn't do zoning research or pull property data — they manage subcontractors and job sites. Wrong pain points entirely.

---

## Decisions Made and Why

### Decision 1: Replace industry-specific example text with 5 universal use cases

**Old approach:** 11 industry blocks with pre-written sentences. AI selects and inserts.
**New approach:** 5 universal use cases described in plain terms. AI reasons about which one fits and writes naturally from scratch.

**Why:** The old approach made the AI act like a copy-paste machine. The new approach gives Claude the meaning of each use case and lets it generate friend-appropriate language on its own. The friend doesn't need to understand the industry — they just need to roughly connect the dots between what Dereck builds and what the business probably needs.

**The 5 use cases:**
1. AI phone answering — 24/7, handles questions, books appointments. Best for businesses where the team is often away from the phone (field service, trades, salons).
2. New lead engagement — Responds to web forms/DMs within seconds, follows up automatically. Best for businesses where speed-to-response determines who gets the job.
3. Automating tedious research/busywork — Takes repetitive manual work (data gathering, compiling reports, pulling from multiple sources) and handles it automatically.
4. Keeping work organized automatically — Captures info from calls, logs notes, drafts proposals based on what was actually discussed. Best for sales teams or client-facing staff.
5. Custom software that simplifies complex workflows — Consolidates messy multi-step processes into one clean system.

**The key shift in philosophy:** Instead of "here's what dentists need, here's what lawyers need," the prompt now says "here are 5 things Dereck builds — pick whichever one would obviously matter to this type of business." If none fit clearly, go general. A vague-but-accurate message is better than a specific-but-wrong one.

### Decision 2: Add a "friend knowledge ceiling" rule

**Why:** The root cause of the consultant-sounding messages was that the prompt told Claude to "write like a friend" but then provided highly detailed, industry-specific talking points for it to repeat. The tone instruction was overridden by the specificity of the examples.

The new prompt adds an explicit rule with a BAD/GOOD contrast:
- BAD: "he builds systems that screen new inquiries before they ever reach your desk, figuring out who's a real opportunity and who isn't"
- GOOD: "he builds AI stuff that helps businesses not miss out on new customers"

The friend is paraphrasing something Dereck mentioned in passing. They don't understand the recipient's operations. They shouldn't sound like they do.

### Decision 3: Add a "think before you write" instruction with an escape hatch

**Why:** The old prompt told Claude to match the industry and select examples — a mechanical process that didn't account for whether the example actually fit. A business type like "Bank" or "Manufacturing" would still get the general template even when general was clearly wrong.

The new prompt includes an explicit reasoning step:
1. What type of business is this?
2. Which use case would MOST OBVIOUSLY matter? If a casual friend couldn't connect the dots, go more general.
3. Does Dereck have direct experience here? If yes, can briefly mention it. If no, stick to what the AI does.
4. Could this use case be WRONG? If there's doubt, go general.

**Escape hatch added:** "If the business type is unusual or institutional (bank, government agency, large corporation) and none of the 5 use cases clearly apply, write a very short, general message." This prevents bad matches instead of forcing them.

### Decision 4: Free the template — stop locking in the opening

**Why:** The fixed 280-character opening prevented any variation and made messages feel templated. Sending 3 of these would look copy-pasted.

The new prompt tells Claude to vary the opening and structure each time. The required elements (free consultation, relevant reason, casual ask to connect) are preserved but their order and phrasing are flexible.

**Character limit changed:** 500 → 400 characters. Texts are short. The old limit was too permissive.

### Decision 5: Add extended thinking (adaptive)

**Why:** The problem with the original outputs wasn't lack of intelligence — it was that the prompt didn't require any reasoning before writing. Claude just matched + inserted.

Extended thinking with `{ type: "adaptive" }` forces an internal reasoning step before the message is generated. The model thinks through the industry, evaluates which use case fits (and whether any do), and then writes. This produces better use-case matching without adding latency from multiple API calls.

**Model updated:** claude-sonnet-4-5 → claude-sonnet-4-6 with adaptive thinking.

### Decision 6: Store generated messages in Supabase

**Why:** The original implementation generated messages but never stored them. The only way to review past outputs was to regenerate from the same inputs. Added `generated_message` column to the `referral_submissions` table so all generated messages are captured for future review.

---

## Results After Changes

| Business Type | Relevance (Old→New) | Positioning (Old→New) | Avg (Old→New) |
|---|---|---|---|
| Dentist | 4→4 | 3→5 | 3.5→4.5 |
| Lawyer | 3→4 | 2→5 | 2.5→4.5 |
| Bank | 2→3 | 3→5 | 2.5→4.0 |
| HVAC | 5→5 | 4→5 | 4.5→5.0 |
| Manufacturing | 2→3 | 4→5 | 3.0→4.0 |
| Car Dealership | 4→4 | 5→5 | 4.5→5.0 (shorter, cleaner) |
| Restaurant | 3→4 | 3→5 | 3.0→4.5 |
| Construction | 3→3 | 3→5 | 3.0→4.0 |
| General Contractor | 2→4 | 3→4 | 2.5→4.0 |
| **Average** | **3.1→3.8** | **3.3→4.9** | **3.2→4.4** |

Key improvements:
- Positioning jumped from 3.3 → 4.9. Friend sounds like a friend.
- Bank and Manufacturing no longer get small-business-pipeline language forced on them.
- Construction and General Contractor now produce different messages.
- Varied openings — no more identical template starts.
- Lawyer message: was "screen new inquiries before they reach your desk" → now "cut down on the tedious admin work that eats up people's time." First one sounds like a legal tech sales pitch. Second one sounds like a friend.

---

## V3: Closer to Original Structure + New Logic (Current)

V2 solved the positioning and relevance problems but introduced new issues:
1. **Messages sounded mid-conversation, not like an opener.** V2 dropped the "this is random" framing. But the recipient doesn't know who Dereck is — they need the cold-start context.
2. **V2 falsely claimed industry experience.** The car dealership message said "he's actually worked with car dealerships before" but Dereck had conversations with a dealership that never turned into a deal. Not truthful.
3. **V2 was too short/punchy.** Given that this is completely out of the blue to someone who doesn't know Dereck, V1's length was more appropriate. The recipient needs enough context to understand what this is and why they should care.

### What V3 Changed

**Brought back from V1:**
- The template structure: acknowledge randomness → who Dereck is → free consultation → why I thought of you → the ask. This gives the message the cold-start framing it needs.
- Message length: back to ~500 character limit (V2 was 400). The recipient needs context.

**Kept from V2:**
- 5 universal use cases (not 11 industry-specific blocks)
- "Friend knowledge ceiling" rule
- "Think before you write" reasoning step
- Escape hatch for poor matches
- Extended thinking (adaptive)
- Varied phrasing (not identical template every time)

**New in V3:**
- **Removed ALL industry experience claims.** No more "he's helped [industry] companies" for ANY industry, including roofing, music schools, auto dealerships, and civil engineering. The reasoning: "We don't need to pretend that this person has knowledge of industries that I have and have not worked with. All messaging should say that I solve specific problems for businesses." This eliminates an entire category of risk (false claims) and simplifies the prompt.
- Capability language only for all industries: "he builds...", "he helps businesses...", "he can set up..."

### V3 Sample Outputs

**Dentist:**
> Hey John, random text I know, but I have a friend named Dereck who builds AI stuff for businesses. He offered to do free consultations for people I know, totally no pressure. I thought of you because I'm guessing your front desk misses calls when you're with patients, and he builds AI that can answer the phone and book appointments automatically. Would you want me to connect you two?

**Lawyer:**
> Hey John, random one but hear me out. A friend of mine, Dereck Johnson, builds AI and software solutions for businesses, and he offered to do free consultations for people I know. No pressure, just an honest look at what AI could actually do for them. Thought of you because I know lawyers deal with a ton of admin and paperwork, and he builds stuff that helps businesses take a lot of that off people's plates. Want me to connect you two?

**Car Dealership (no more false experience claim):**
> Hey John, totally random but my friend Dereck builds AI stuff for businesses and is doing free consultations for people I know. Thought of you because he can set something up that responds to new inquiries right away so people aren't already at another dealership by the time you call them back. No pressure at all, just wanted to pass it along. Want me to connect you two?

**Bank (general, doesn't force bad match):**
> Hey John, random text I know, but I have a friend named Dereck who builds AI and software solutions for businesses. He offered to do free consultations for people I know, no pressure, just an honest look at where AI could actually save time or money. Banks deal with a ton of moving parts so I figured it couldn't hurt to mention it. Want me to connect you two?

**HVAC:**
> Hey John, random text from Dereck, sorry in advance! I have a friend who builds AI stuff for businesses and he offered to do free consultations for people I know. I thought of you because he can set up an AI that answers your phones when you're out on a job, handles basic questions, and books appointments automatically. No pressure at all, just figured it might be worth a conversation. Want me to connect you two?

**Manufacturing (general, not forced into sales-pipeline language):**
> Hey John, this is random so sorry in advance. My friend Dereck builds AI and software tools for businesses and offered to do free consultations for people I know, no pressure at all. I thought of you because I feel like manufacturing involves a ton of manual tracking and data stuff that a computer should honestly just be handling. Would you be open to me connecting you two?

---

## Current File Locations

- API route: `referral-system/app/api/generate-message/route.ts`
- Original idea docs: `Original Idea Docs/referral-system-strategy.md`
- Original use case reference: `Original Idea Docs/ai-use-case-reference.md`
- Supabase project: `cqbclyyaaghhvqcjdzmx` (family-friends)
- Live URL: `https://family-friends.advancedleadsolutions.com`
