"use client";

const PROJECTS = [
  {
    tag: "Music School",
    title: "Teacher\u2019s Command Center",
    status: "Live & Active",
    description:
      "I built a system for music school teachers who were torn between being fully present with their students and handling all the behind-the-scenes stuff, things like attendance, notes, parent messages, and assignments. Now the AI handles all of that and more while the teacher just teaches.",
    highlight:
      "AI isn\u2019t about replacing people, it\u2019s about making their experience better, not just for the customer, but for the person doing the work too.",
  },
  {
    tag: "Roofing",
    title: "Dead Lead Reactivation",
    status: "Done-for-You Service",
    description:
      "A roofing company had thousands of people who called in over the years but never got followed up with. I built a system that goes back through all of them, has real conversations, figures out who\u2019s actually interested now, and books the appointment.",
    highlight: "It was booking a new inspection nearly every day it was running.",
  },
  {
    tag: "Real Estate",
    title: "Automated Research Pipeline",
    status: "Live & Active",
    description:
      "Someone in real estate needed to check a government website multiple times a day to catch new opportunities before the competition. I built a system that checks it every 10 minutes, grabs anything new, researches it automatically to find the right contact info, and delivers it straight to the team.",
    highlight:
      "They went from refreshing a website all day to having opportunities show up on their own.",
  },
  {
    tag: "Sales Team",
    title: "Conversation Intelligence",
    status: "Live & Active",
    description:
      "A company\u2019s sales team was making calls all day but nobody was keeping track of what was actually said. I built a system that listens to every conversation, pulls out the important stuff, and updates everything automatically.",
    highlight:
      "No more relying on someone to remember what they promised a customer three calls ago.",
  },
];

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
        <p className="text-base text-white/70 leading-relaxed mb-12 md:text-lg">
          Every business has stuff that eats up their team&apos;s time but
          doesn&apos;t actually require a person. Answering the same questions
          over and over. Chasing people down who never called back. Spending
          hours gathering information from different places just to get started
          on the real work. That&apos;s what I build AI and software to handle,
          so the people can focus on the stuff that actually matters.
        </p>

        {/* Examples header */}
        <div className="flex items-center gap-4 mb-8">
          <h3 className="font-serif text-xl font-bold text-white md:text-2xl whitespace-nowrap">
            Real Projects, Real Results
          </h3>
          <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
        </div>

        {/* Project cards */}
        <div className="space-y-5">
          {PROJECTS.map((project) => (
            <div
              key={project.title}
              className="group rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden transition-colors hover:border-white/20 hover:bg-white/[0.05]"
            >
              {/* Card header */}
              <div className="flex items-center justify-between px-5 pt-4 pb-2 md:px-6">
                <div className="flex items-center gap-3">
                  <span className="inline-block rounded-full bg-white/10 px-3 py-0.5 text-xs font-medium uppercase tracking-wider text-white/60">
                    {project.tag}
                  </span>
                  <h4 className="font-serif text-lg font-semibold text-white">
                    {project.title}
                  </h4>
                </div>
                <span className="hidden sm:inline-block text-xs font-medium text-emerald-400/80 tracking-wide uppercase">
                  {project.status}
                </span>
              </div>

              {/* Card body */}
              <div className="px-5 pb-5 md:px-6 md:pb-6">
                <p className="text-sm text-white/60 leading-relaxed md:text-base">
                  {project.description}
                </p>
                {project.highlight && (
                  <p className="mt-3 text-sm font-medium text-white/90 md:text-base border-l-2 border-emerald-400/40 pl-3">
                    {project.highlight}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Consultation description */}
        <div className="mt-14 border-t border-white/10 pt-10">
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
