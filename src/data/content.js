/**
 * Central content store.
 * TODO(CMS): replace each section with a Sanity query (GROQ) once the
 * studio is wired up — every component reads only from this file.
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

export const SERVICES = {
  headline: ['Beyond', 'Consumer', 'AI'],
  cta: { label: 'Explore Mandana AI', href: '/search/new' },
  items: [
    {
      index: '01',
      title: 'Consumer AI',
      description:
        'Reasoning for the way people actually think. Explore ideas, question assumptions, and make better decisions — one question at a time.',
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
    'Mandana opens the source. Every question becomes a chain of visible reasoning — hidden question, assumptions, competing views, evidence, trade-offs — before it ever answers.',
  cta: { label: 'Start a session', href: '/search/new' },
  items: [
    { name: 'Hidden Question', category: 'Step 01' },
    { name: 'Assumptions', category: 'Step 02' },
    { name: 'Competing Views', category: 'Step 03' },
    { name: 'Evidence', category: 'Step 04' },
    { name: 'Trade-offs', category: 'Step 05' },
    { name: 'Next Question', category: 'Step 06' },
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
        'Mandana is an AI thinking partner that helps you explore ideas and make better decisions.',
      ],
      name: 'What is Mandana?',
      role: 'Frequently asked',
      position: 'Answer',
      company: 'Mandana AI',
    },
    {
      quote: ['No. Mandana is designed for deeper thinking, not just answering questions.'],
      name: 'Is Mandana another chatbot?',
      role: 'Frequently asked',
      position: 'Answer',
      company: 'Mandana AI',
    },
    {
      quote: [
        'Mandana is inspired by curiosity, first-principles thinking, and human creativity.',
      ],
      name: 'What inspires Mandana?',
      role: 'Frequently asked',
      position: 'Answer',
      company: 'Mandana AI',
    },
    {
      quote: [
        'For anyone who wants to think clearer, create better, and solve complex problems.',
      ],
      name: 'Who is Mandana for?',
      role: 'Frequently asked',
      position: 'Answer',
      company: 'Mandana AI',
    },
    {
      quote: [
        'By breaking down problems, exploring perspectives, and guiding thoughtful reasoning.',
      ],
      name: 'How does Mandana think?',
      role: 'Frequently asked',
      position: 'Answer',
      company: 'Mandana AI',
    },
    {
      quote: [
        'Start a conversation and let Mandana guide your thinking, one question at a time.',
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
    'How we build: research, then intelligence, then products, then impact. We are building intelligence that lives beyond the screen — structured reasoning for people, organizations, public impact, and the physical world.',
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
