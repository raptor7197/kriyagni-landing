/**
 * Central content store.
 * TODO(CMS): replace each section with a Sanity query (GROQ) once the
 * studio is wired up - every component reads only from this file.
 */

export const NAV_LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'Why Mandana', href: '#why' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
]

export const HERO = {
  titleA: 'Kriyagni',
  titleB: 'AI',
  stacked: ['Think', 'Better.'],
  intro:
    'Not because AI has more answers. Because it reasons before it responds.',
  note: 'Cited reasoning · Core & Infinity depth · Private by default',
  cta: { label: 'Explore Mandana AI', href: '/search/new' },
  marqueeLabel: 'Capabilities',
  marqueeLogos: ['Consumer', 'Enterprise', 'Impact', 'Embodied'],
}

export const ABOUT = {
  eyebrow: 'Why Mandana Exists',
  paragraphs: [
    'AI became incredibly good at answering. But somewhere along the way, it stopped showing its thinking.',
    'Traditional AI goes straight from question to answer — and stops there. Mandana opens the source: hidden question, assumptions, competing views, evidence, trade-offs, reasoning, decision — and the next question.',
    'This is not another chatbot. This AI thinks differently.',
  ],
  stats: [
    { value: '09', label: 'Steps in every reasoning trace', tone: 'black' },
    { value: '80%', label: 'Of chatbots stop at the answer', tone: 'grey' },
    { value: '+87 −23', label: 'Trade-offs weighed in every decision', tone: 'white' },
  ],
}

export const PERSONAS = {
  eyebrow: 'Why Mandana Exists',
  headline: ['Why Mandana Exists.', 'That question became Mandana.'],
  items: [
    {
      id: 'students',
      label: 'Students',
      eyebrow: 'Students',
      title: 'Turn difficult questions into deeper understanding.',
      body:
        'Studying isn’t just about finding the right answer. Mandana helps you understand why an answer is right, question assumptions, examine competing explanations, and reason through complex ideas instead of simply memorizing them.',
      tags: ['Understand concepts from first principles', 'Explore multiple perspectives'],
      image: '/personas/students.svg',
    },
    {
      id: 'researcher',
      label: 'Researcher',
      eyebrow: 'Researcher',
      title: 'Challenge your thinking before others do.',
      body:
        'Research gets stronger when ideas survive scrutiny. Mandana helps you examine competing explanations, surface hidden assumptions, identify gaps in reasoning, and explore alternative interpretations before reaching a conclusion.',
      tags: ['Surface hidden assumptions', 'Explore counterarguments'],
      image: '/personas/researcher.svg',
    },
    {
      id: 'founders',
      label: 'Founders',
      eyebrow: 'Founders',
      title: 'Reason through the decisions that shape the company.',
      body:
        'Founders make irreversible calls under uncertainty. Mandana stress-tests strategy, pricing, hiring, and product trade-offs by surfacing the assumptions behind each choice and weighing what could break before you commit.',
      tags: ['Stress-test strategy', 'Weigh irreversible decisions'],
      image: '/personas/founders.svg',
    },
    {
      id: 'government',
      label: 'Government',
      eyebrow: 'Government',
      title: 'Reason carefully where the stakes are public.',
      body:
        'Public decisions affect many. Mandana helps policy teams work through competing interests, weigh evidence transparently, document the reasoning behind a choice, and prepare for the questions that will follow.',
      tags: ['Documented reasoning', 'Stakeholder-aware analysis'],
      image: '/personas/government.svg',
    },
  ],
}

export const SERVICES = {
  headline: ['Beyond', 'Consumer', 'AI'],
  cta: { label: 'Explore Mandana AI', href: '/search/new' },
  items: [
    {
      index: '01',
      title: 'Consumer AI',
      description:
        'Reasoning for the way people actually think. Explore ideas, question assumptions, and make better decisions - one question at a time.',
      tags: ['New session', 'History', 'Sources', 'Exports'],
    },
    {
      index: '02',
      title: 'Enterprise AI',
      description:
        'Intelligence for organizations. Automation, agents, decision intelligence, and workflows.',
      tags: ['Automation', 'Intelligence', 'Decision making'],
    },
    {
      index: '03',
      title: 'Impact AI',
      description:
        'Intelligence for meaningful change. Science, climate, education, healthcare, and the field.',
      tags: ['Climate', 'Education', 'Healthcare'],
    },
    {
      index: '04',
      title: 'Embodied AI',
      description:
        'Intelligence that takes form. Robotics, autonomous systems, vision, and human–machine interaction.',
      tags: ['Robotics', 'Autonomy', 'Computer vision'],
    },
  ],
}

export const CLIENTS = {
  eyebrow: 'How Mandana thinks',
  headline: 'Mandana',
  description:
    'Mandana is a reasoning engine, not a chatbot. Every question is opened into the work behind the answer — the hidden question, the assumptions made, the competing views considered, the evidence weighed, the trade-offs accepted — before a decision is reached. You see the chain; you can challenge any link; you choose what to do next.',
  cta: { label: 'Start a session', href: '/search/new' },
  items: [
    { name: 'Hidden Question', category: 'Step 01' },
    { name: 'Assumptions', category: 'Step 02' },
    { name: 'Competing Views', category: 'Step 03' },
    { name: 'Evidence', category: 'Step 04' },
    { name: 'Trade-offs', category: 'Step 05' },
    { name: 'Reasoning', category: 'Step 06' },
    { name: 'Decision', category: 'Step 07' },
    { name: 'Next Question', category: 'Step 08' },
  ],
}

export const CHAT = {
  brand: 'KriyagniAI',
  status: 'Live now',
  tab: 'Consumer AI',
  sidebar: ['New session', 'History', 'Sources', 'Exports'],
  question:
    'Should we enter the Pune market this quarter, or wait for clearer demand signals?',
  srcLabel: 'Open',
  srcPath: 'src/',
  steps: [
    { glyph: '├──', label: 'Hidden Question' },
    { glyph: '├──', label: 'Assumptions' },
    { glyph: '└──', label: 'Competing Views' },
    { glyph: '├──', label: 'Evidence' },
    { glyph: '├──', label: 'Trade-offs', accent: '+87 −23' },
    { glyph: '├──', label: 'Reasoning' },
    { glyph: '└──', label: 'Decision' },
    { glyph: '└──', label: 'Next Question' },
  ],
  decision: 'Decision · Reasoning',
  chips: [
    'Reasoning complete',
    'Evidence weighed',
    'Assumptions clear',
    'Next Question',
  ],
  tradeOffs: 'Trade-offs · +87 −23',
}

export const FAQ = {
  eyebrow: 'FAQ',
  // CMS: question, answer, and optional link per entry.
  items: [
    {
      quote: [
        'Mandana is an AI reasoning engine built for people who need to think before they answer. It opens the work behind every decision — the hidden question, the assumptions, the competing views, the evidence, the trade-offs — so the conclusion is something you can defend, not just something you were given.',
        'It is a thinking partner for clearer reasoning, not a chatbot for fast replies.',
      ],
      name: 'What is Mandana?',
      role: 'Frequently asked',
      position: 'Answer',
      company: 'Mandana AI',
    },
    {
      quote: [
        'No. A chatbot is optimized to answer. Mandana is optimized to reason. The difference shows up in the trace: instead of moving from question to answer in one opaque step, Mandana surfaces the hidden question behind your question, names the assumptions it is making, brings in competing views, weighs evidence, and only then commits to a decision.',
        'You can challenge any link in that chain. A chatbot gives you text; Mandana gives you a position you can interrogate.',
      ],
      name: 'Is Mandana another chatbot?',
      role: 'Frequently asked',
      position: 'Answer',
      company: 'Mandana AI',
    },
    {
      quote: [
        'Mandana is inspired by the discipline of philosophical inquiry: the practice of asking what the question really is, what is being assumed, what alternatives have been ruled out too quickly, and what would change the conclusion.',
        'It carries the spirit of first-principles thinking, structured argumentation, and the creative habit of asking the next question rather than stopping at the first answer.',
      ],
      name: 'What inspires Mandana?',
      role: 'Frequently asked',
      position: 'Answer',
      company: 'Mandana AI',
    },
    {
      quote: [
        'For anyone whose decisions are bottlenecked by the quality of their thinking: students reasoning through hard concepts, researchers stress-testing an argument, founders weighing irreversible calls, and policy teams working through questions with public consequence.',
        'If you have ever wished an answer came with its reasoning attached, Mandana is for you.',
      ],
      name: 'Who is Mandana for?',
      role: 'Frequently asked',
      position: 'Answer',
      company: 'Mandana AI',
    },
    {
      quote: [
        'Mandana thinks in an open chain: hidden question, assumptions, competing views, evidence, trade-offs, reasoning, decision, next question. Each step is visible. Each step is challengeable. The reasoning is cited and traceable end-to-end.',
        'You see how a conclusion was reached, so you can decide whether to accept it, refine it, or reject it — and ask a sharper question next.',
      ],
      name: 'How does Mandana think?',
      role: 'Frequently asked',
      position: 'Answer',
      company: 'Mandana AI',
    },
    {
      quote: [
        'Open a session and ask your question. Mandana will surface the reasoning behind the answer — the hidden question, the assumptions, the trade-offs — and you can challenge any link in the chain. From there, the conversation continues as a working trace of your thinking, not a transcript of chat turns.',
        'Start with the problem you cannot stop thinking about. Mandana will meet you there.',
      ],
      name: 'How do I experience Mandana?',
      role: 'Frequently asked',
      position: 'Answer',
      company: 'Mandana AI',
    },
  ],
}

export const TEAM = {
  headline: 'Mandana',
  subline: 'Research → Intelligence → Products → Impact',
  introEyebrow: 'Mandana Research',
  intro:
    'How we build: research, then intelligence, then products, then impact. We are building intelligence that lives beyond the screen - structured reasoning for people, organizations, public impact, and the physical world.',
  cta: { label: 'Explore Mandana AI', href: '/search/new' },
  members: [
    { first: 'Consumer', last: 'AI', role: 'Reasons before it responds' },
    { first: 'Enterprise', last: 'AI', role: 'Intelligence for organizations' },
    { first: 'Impact', last: 'AI', role: 'Intelligence for meaningful change' },
    { first: 'Embodied', last: 'AI', role: 'Intelligence that takes form' },
    { first: 'Mandana', last: 'Research', role: 'Research to impact' },
    { first: 'Kriyagni', last: 'AI', role: 'Beyond the screen' },
  ],
}

export const FOOTER = {
  stacked: ['We’re', 'building', 'intelligence'],
  subline: 'that lives beyond the screen.',
  site: { label: 'www.kriyagniai.com', href: 'https://www.kriyagniai.com' },
  explore: { label: 'Explore Mandana AI', href: '/search/new' },
  links: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
  copyright: '© 2026 KriyagniAI. All rights reserved.',
}
