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
  // --- References (from Second Brain vault) ---
  { slug: 'cpr', title: 'CPR / BLS Guide', category: 'references', description: 'Adult/child/infant CPR steps, ratios and compression depth.', emoji: '🫀' },
  { slug: 'vital-signs', title: 'Vital Signs Ranges', category: 'references', description: 'Normal ranges for HR, BP, RR, SpO₂, temp by age.', emoji: '🌡️' },
  { slug: 'refs/scene-size-up', title: 'Scene Size-Up', category: 'references', description: 'Assess scene safety, resources, MOI/NOI before patient contact.', emoji: '🚨' },
  { slug: 'refs/primary-assessment', title: 'Primary Assessment (ABCDE)', category: 'references', description: 'Rapid life-threat survey — airway, breathing, circulation, disability, exposure.', emoji: '🔍' },
  { slug: 'refs/secondary-assessment', title: 'Secondary Assessment (SAMPLE)', category: 'references', description: 'Detailed history and head-to-toe exam after primary survey.', emoji: '📋' },
  { slug: 'refs/vital-signs-ref', title: 'Vital Signs (Normal Ranges)', category: 'references', description: 'HR, RR, BP, SpO₂, temp by age group.', emoji: '🌡️' },
  { slug: 'refs/patient-assessment', title: 'Patient Assessment', category: 'references', description: 'Full EMT assessment workflow from scene to transport.', emoji: '🩺' },
  { slug: 'refs/cpr-adult', title: 'CPR — Adult', category: 'references', description: 'Adult BLS/ACLS 2025 algorithm, rate, depth, ratios.', emoji: '❤️' },
  { slug: 'refs/cpr-peds', title: 'CPR — Pediatric', category: 'references', description: 'Pediatric & infant CPR differences, ratios, depths.', emoji: '👶' },
  { slug: 'refs/aed', title: 'AED Usage', category: 'references', description: 'Step-by-step automated external defibrillator use.', emoji: '⚡' },
  { slug: 'refs/airway-basics', title: 'Airway Management', category: 'references', description: 'Open and maintain the airway — techniques and adjuncts.', emoji: '🫁' },
  { slug: 'refs/opa-npa', title: 'OPA / NPA Adjuncts', category: 'references', description: 'Basic airway adjuncts for unconscious patients.', emoji: '😷' },
  { slug: 'refs/bvm', title: 'Bag-Valve-Mask', category: 'references', description: 'BVM ventilation technique and troubleshooting.', emoji: '💨' },
  { slug: 'refs/oxygen-therapy', title: 'Oxygen Therapy', category: 'references', description: 'Indications, devices, and safe oxygen administration.', emoji: '🅾️' },
  { slug: 'refs/bleeding-shock', title: 'Bleeding & Shock', category: 'references', description: 'Hemorrhage control and shock recognition/management.', emoji: '🩸' },
  { slug: 'refs/stop-the-bleed', title: 'STOP THE BLEED', category: 'references', description: 'Tourniquet, wound packing, pressure dressing.', emoji: '🚑' },
  { slug: 'refs/fractures', title: 'Fractures & Dislocations', category: 'references', description: 'Musculoskeletal injury assessment and splinting.', emoji: '🦴' },
  { slug: 'refs/head-spine', title: 'Head & Spinal Injuries', category: 'references', description: 'Brain injury, C-spine precautions, immobilization.', emoji: '🧠' },
  { slug: 'refs/chest-trauma', title: 'Chest Trauma', category: 'references', description: 'Pneumothorax, hemothorax, flail chest, cardiac tamponade.', emoji: '🫁' },
  { slug: 'refs/burns', title: 'Burns', category: 'references', description: 'Burn depth, rules, and fluid resuscitation.', emoji: '🔥' },
  { slug: 'refs/medical-emergencies', title: 'Medical Emergencies', category: 'references', description: 'General medical emergency approach.', emoji: '💊' },
  { slug: 'refs/allergic-anaphylaxis', title: 'Allergic Reaction & Anaphylaxis', category: 'references', description: 'Recognition and epinephrine treatment.', emoji: '🤧' },
  { slug: 'refs/diabetic', title: 'Diabetic Emergencies', category: 'references', description: 'Hypo-/hyperglycemia assessment and glucose.', emoji: '🍬' },
  { slug: 'refs/seizures', title: 'Seizures', category: 'references', description: 'Seizure assessment, safety, and management.', emoji: '⚡' },
  { slug: 'refs/stroke', title: 'Stroke', category: 'references', description: 'FAST assessment and stroke pathway.', emoji: '🧠' },
  { slug: 'refs/respiratory', title: 'Respiratory Emergencies', category: 'references', description: 'Asthma, COPD, and bronchospasm management.', emoji: '🫁' },
  { slug: 'refs/poisoning', title: 'Poisoning & Overdose', category: 'references', description: 'Toxicology assessment and antidotes (naloxone, etc.).', emoji: '☠️' },
  { slug: 'refs/cardiac-acs', title: 'Acute Coronary Syndrome', category: 'references', description: 'Chest pain, ECG, aspirin, nitroglycerin.', emoji: '❤️' },
  { slug: 'refs/pharmacology', title: 'Pharmacology', category: 'references', description: 'EMT pharmacodynamics, kinetics, and safety.', emoji: '💉' },
  { slug: 'refs/meds-overview', title: 'EMT Medications', category: 'references', description: 'Drug list, indications, dosing within scope.', emoji: '💊' },
  { slug: 'refs/pediatric', title: 'Pediatric Emergencies', category: 'references', description: 'Age-specific assessment and common pediatric emergencies.', emoji: '👶' },
  { slug: 'refs/ob-gyn', title: 'OB-GYN Emergencies', category: 'references', description: 'Pregnancy, labor, and gynecologic emergencies.', emoji: '🤰' },
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
