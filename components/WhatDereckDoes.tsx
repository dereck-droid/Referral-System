"use client";

export default function WhatDereckDoes() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0f172a 0%, #1a2332 100%)",
      }}
    >
      <div className="mx-auto max-w-2xl px-5 py-16 md:py-24">
        {/* Section header */}
        <h2 className="font-serif text-2xl font-bold text-white md:text-3xl mb-6 text-center">
          So What Does Dereck Actually Do?
        </h2>

        {/* Opening paragraph */}
        <p className="text-base text-white/70 leading-relaxed mb-10 md:text-lg">
          Every business has stuff that eats up their team&apos;s time but
          doesn&apos;t actually require a person. Answering the same questions
          over and over. Chasing people down who never called back. Spending
          hours gathering information from different places just to get started
          on the real work. That&apos;s what I build AI and software to handle,
          so the people can focus on the stuff that actually matters.
        </p>

        {/* Examples */}
        <h3 className="font-serif text-xl font-bold text-white md:text-2xl mb-5">
          Here Are a Few Things He&apos;s Actually Built
        </h3>
        <div className="space-y-8">
          {/* Music school */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-5 md:p-6">
            <p className="text-base text-white/80 leading-relaxed">
              I built a system for music school teachers who were torn between
              being fully present with their students and handling all the
              behind-the-scenes stuff, things like attendance, notes, parent
              messages, and assignments. Now the AI handles all of that and more
              while the teacher just teaches. It&apos;s a perfect example of how
              AI isn&apos;t about replacing people, it&apos;s about making their
              experience better, not just for the customer, but for the person
              doing the work too.
            </p>
          </div>

          {/* Roofing */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-5 md:p-6">
            <p className="text-base text-white/80 leading-relaxed">
              A roofing company had thousands of people who called in over the
              years but never got followed up with. I built a system that goes
              back through all of them, has real conversations, figures out
              who&apos;s actually interested now, and books the appointment. It
              was booking a new one nearly every day it was running.
            </p>
          </div>

          {/* Real estate */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-5 md:p-6">
            <p className="text-base text-white/80 leading-relaxed">
              Someone in real estate needed to check a government website
              multiple times a day to catch new opportunities before the
              competition. I built a system that checks it every 10 minutes,
              grabs anything new, researches it automatically to find the right
              contact info, and delivers it straight to the team, ready to go.
              They went from refreshing a website all day to having
              opportunities show up on their own.
            </p>
          </div>

          {/* Sales teams */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-5 md:p-6">
            <p className="text-base text-white/80 leading-relaxed">
              A company&apos;s sales team was making calls all day but nobody
              was keeping track of what was actually said. I built a system that
              listens to every conversation, pulls out the important stuff, and
              updates everything automatically. No more relying on someone to
              remember what they promised a customer three calls ago.
            </p>
          </div>
        </div>

        {/* Consultation description */}
        <div className="mt-12 border-t border-white/10 pt-10">
          <h3 className="font-serif text-xl font-bold text-white md:text-2xl mb-4">
            What the Free Consultation Looks Like
          </h3>
          <p className="text-base text-white/70 leading-relaxed md:text-lg">
            It&apos;s a conversation, not a sales pitch. I&apos;ll ask about
            how your business runs, where time is being spent on things that
            feel repetitive or manual, and I&apos;ll tell you honestly what AI
            can and can&apos;t do for your situation.
          </p>
        </div>
      </div>
    </section>
  );
}
