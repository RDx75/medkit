// Central registry of every tool + reference page.
// Home, sidebar and the ⌘K search all read from here, so adding a tool
// is just: create the page under src/pages/tools/<slug>.astro and add an entry.

export type Category = {
  id: string;
  title: string;
  emoji: string;
  description: string;
};

export type Tool = {
  slug: string;
  title: string;
  category: string; // Category.id
  description: string;
  emoji: string;
};

export const categories: Category[] = [
  {
    id: 'calculators',
    title: 'Calculators',
    emoji: '🧮',
    description: 'Bedside calculators that run instantly in your browser — no data leaves the device.',
  },
  {
    id: 'references',
    title: 'References',
    emoji: '📚',
    description: 'Quick-lookup medical references: protocols, normal ranges, and step-by-step guides.',
  },
  {
    id: 'study',
    title: 'Study',
    emoji: '📝',
    description: 'EMT study aids — quizzes and flashcard mode built from your Second Brain vault.',
  },
];

export const tools: Tool[] = [
  // --- Calculators ---
  {
    slug: 'bmi',
    title: 'BMI Calculator',
    category: 'calculators',
    description: 'Body Mass Index from weight and height, with WHO category.',
    emoji: '⚖️',
  },
  {
    slug: 'bsa',
    title: 'BSA Calculator',
    category: 'calculators',
    description: 'Body Surface Area via the Mosteller formula (m²).',
    emoji: '📐',
  },
  {
    slug: 'gcs',
    title: 'GCS Calculator',
    category: 'calculators',
    description: 'Glasgow Coma Scale — Eye, Verbal, Motor summed to 3–15.',
    emoji: '🧠',
  },
  {
    slug: 'apgar',
    title: 'APGAR Calculator',
    category: 'calculators',
    description: 'Newborn APGAR score at 1 and 5 minutes.',
    emoji: '👶',
  },
  {
    slug: 'map',
    title: 'MAP Calculator',
    category: 'calculators',
    description: 'Mean Arterial Pressure from systolic and diastolic BP.',
    emoji: '💓',
  },
  {
    slug: 'drug-dose',
    title: 'Drug Dose by Weight',
    category: 'calculators',
    description: 'Weight-based dosing (mg/kg) with max-dose guard.',
    emoji: '💊',
  },
  {
    slug: 'unit-converter',
    title: 'Unit Converter',
    category: 'calculators',
    description: 'Temperature, weight, volume and length conversions.',
    emoji: '🔁',
  },
  // --- References ---
  {
    slug: 'cpr',
    title: 'CPR / BLS Guide',
    category: 'references',
    description: 'Adult/child/infant CPR steps, ratios and compression depth.',
    emoji: '🫀',
  },
  {
    slug: 'vital-signs',
    title: 'Vital Signs Ranges',
    category: 'references',
    description: 'Normal ranges for HR, BP, RR, SpO₂, temp by age.',
    emoji: '🌡️',
  },
  // --- Study ---
  {
    slug: 'quiz',
    title: 'EMT Quiz',
    category: 'study',
    description: 'Practice questions drawn from your EMT study notes.',
    emoji: '✍️',
  },
];

export function toolsByCategory(catId: string): Tool[] {
  return tools.filter((t) => t.category === catId);
}

export function getTool(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}
