// Central registry of every tool + reference page.
// Home, sidebar and the ⌘K search all read from here.
//   slug  = bare identifier, also used for activeSlug highlight
//   path  = URL path WITHOUT base (e.g. 'tools/bmi', 'refs/scene-size-up')
//   group = optional sub-group id (references are grouped in the sidebar)

export type Category = {
  id: string;
  title: string;
  emoji: string;
  description: string;
};

export type RefGroup = {
  id: string;
  title: string;
  emoji: string;
};

export type Tool = {
  slug: string;
  path: string;
  title: string;
  category: string; // Category.id
  description: string;
  emoji: string;
  group?: string; // RefGroup.id (references only)
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
    description: 'EMT knowledge from the Second Brain vault — protocols, ranges, and step-by-step guides.',
  },
  {
    id: 'study',
    title: 'Study',
    emoji: '📝',
    description: 'EMT study aids — quizzes built from your Second Brain vault.',
  },
];

// Reference sub-groups (sidebar accordion order)
export const refGroups: RefGroup[] = [
  { id: 'assessment', title: 'Assessment', emoji: '🔍' },
  { id: 'airway', title: 'Airway & Breathing', emoji: '🫁' },
  { id: 'cardiac', title: 'Cardiac', emoji: '❤️' },
  { id: 'trauma', title: 'Trauma', emoji: '🩹' },
  { id: 'medical', title: 'Medical', emoji: '💊' },
  { id: 'pharmacology', title: 'Pharmacology', emoji: '💉' },
  { id: 'special', title: 'Special Populations', emoji: '👶' },
];

export const tools: Tool[] = [
  // --- Calculators ---
  { slug: 'bmi', path: 'tools/bmi', title: 'BMI Calculator', category: 'calculators', description: 'Body Mass Index from weight and height, with WHO category.', emoji: '⚖️' },
  { slug: 'bsa', path: 'tools/bsa', title: 'BSA Calculator', category: 'calculators', description: 'Body Surface Area via the Mosteller formula (m²).', emoji: '📐' },
  { slug: 'gcs', path: 'tools/gcs', title: 'GCS Calculator', category: 'calculators', description: 'Glasgow Coma Scale — Eye, Verbal, Motor summed to 3–15.', emoji: '🧠' },
  { slug: 'apgar', path: 'tools/apgar', title: 'APGAR Calculator', category: 'calculators', description: 'Newborn APGAR score at 1 and 5 minutes.', emoji: '👶' },
  { slug: 'map', path: 'tools/map', title: 'MAP Calculator', category: 'calculators', description: 'Mean Arterial Pressure from systolic and diastolic BP.', emoji: '💓' },
  { slug: 'drug-dose', path: 'tools/drug-dose', title: 'Drug Dose by Weight', category: 'calculators', description: 'Weight-based dosing (mg/kg) with max-dose guard.', emoji: '💊' },
  { slug: 'unit-converter', path: 'tools/unit-converter', title: 'Unit Converter', category: 'calculators', description: 'Temperature, weight, volume and length conversions.', emoji: '🔁' },

  // --- References (from Second Brain vault) ---
  // Assessment
  { slug: 'scene-size-up', path: 'refs/scene-size-up', title: 'Scene Size-Up', category: 'references', group: 'assessment', description: 'Assess scene safety, resources, MOI/NOI before patient contact.', emoji: '🚨' },
  { slug: 'primary-assessment', path: 'refs/primary-assessment', title: 'Primary Assessment (ABCDE)', category: 'references', group: 'assessment', description: 'Rapid life-threat survey — airway, breathing, circulation, disability, exposure.', emoji: '🔍' },
  { slug: 'secondary-assessment', path: 'refs/secondary-assessment', title: 'Secondary Assessment (SAMPLE)', category: 'references', group: 'assessment', description: 'Detailed history and head-to-toe exam after primary survey.', emoji: '📋' },
  { slug: 'vital-signs', path: 'refs/vital-signs', title: 'Vital Signs Ranges', category: 'references', group: 'assessment', description: 'Normal ranges for HR, RR, BP, SpO₂, temp by age group.', emoji: '🌡️' },
  { slug: 'patient-assessment', path: 'refs/patient-assessment', title: 'Patient Assessment', category: 'references', group: 'assessment', description: 'Full EMT assessment workflow from scene to transport.', emoji: '🩺' },
  // Airway & Breathing
  { slug: 'airway-basics', path: 'refs/airway-basics', title: 'Airway Management', category: 'references', group: 'airway', description: 'Open and maintain the airway — techniques and adjuncts.', emoji: '🫁' },
  { slug: 'opa-npa', path: 'refs/opa-npa', title: 'OPA / NPA Adjuncts', category: 'references', group: 'airway', description: 'Basic airway adjuncts for unconscious patients.', emoji: '😷' },
  { slug: 'bvm', path: 'refs/bvm', title: 'Bag-Valve-Mask', category: 'references', group: 'airway', description: 'BVM ventilation technique and troubleshooting.', emoji: '💨' },
  { slug: 'oxygen-therapy', path: 'refs/oxygen-therapy', title: 'Oxygen Therapy', category: 'references', group: 'airway', description: 'Indications, devices, and safe oxygen administration.', emoji: '🅾️' },
  // Cardiac
  { slug: 'cpr-adult', path: 'refs/cpr-adult', title: 'CPR — Adult', category: 'references', group: 'cardiac', description: 'Adult BLS/ACLS 2025 algorithm, rate, depth, ratios.', emoji: '❤️' },
  { slug: 'cpr-peds', path: 'refs/cpr-peds', title: 'CPR — Pediatric', category: 'references', group: 'cardiac', description: 'Pediatric & infant CPR differences, ratios, depths.', emoji: '👶' },
  { slug: 'aed', path: 'refs/aed', title: 'AED Usage', category: 'references', group: 'cardiac', description: 'Step-by-step automated external defibrillator use.', emoji: '⚡' },
  { slug: 'cardiac-acs', path: 'refs/cardiac-acs', title: 'Acute Coronary Syndrome', category: 'references', group: 'cardiac', description: 'Chest pain, ECG, aspirin, nitroglycerin.', emoji: '💔' },
  // Trauma
  { slug: 'bleeding-shock', path: 'refs/bleeding-shock', title: 'Bleeding & Shock', category: 'references', group: 'trauma', description: 'Hemorrhage control and shock recognition/management.', emoji: '🩸' },
  { slug: 'stop-the-bleed', path: 'refs/stop-the-bleed', title: 'STOP THE BLEED', category: 'references', group: 'trauma', description: 'Tourniquet, wound packing, pressure dressing.', emoji: '🚑' },
  { slug: 'fractures', path: 'refs/fractures', title: 'Fractures & Dislocations', category: 'references', group: 'trauma', description: 'Musculoskeletal injury assessment and splinting.', emoji: '🦴' },
  { slug: 'head-spine', path: 'refs/head-spine', title: 'Head & Spinal Injuries', category: 'references', group: 'trauma', description: 'Brain injury, C-spine precautions, immobilization.', emoji: '🧠' },
  { slug: 'chest-trauma', path: 'refs/chest-trauma', title: 'Chest Trauma', category: 'references', group: 'trauma', description: 'Pneumothorax, hemothorax, flail chest, cardiac tamponade.', emoji: '🫁' },
  { slug: 'burns', path: 'refs/burns', title: 'Burns', category: 'references', group: 'trauma', description: 'Burn depth, rules, and fluid resuscitation.', emoji: '🔥' },
  // Medical
  { slug: 'medical-emergencies', path: 'refs/medical-emergencies', title: 'Medical Emergencies', category: 'references', group: 'medical', description: 'General medical emergency approach.', emoji: '💊' },
  { slug: 'allergic-anaphylaxis', path: 'refs/allergic-anaphylaxis', title: 'Allergic Reaction & Anaphylaxis', category: 'references', group: 'medical', description: 'Recognition and epinephrine treatment.', emoji: '🤧' },
  { slug: 'diabetic', path: 'refs/diabetic', title: 'Diabetic Emergencies', category: 'references', group: 'medical', description: 'Hypo-/hyperglycemia assessment and glucose.', emoji: '🍬' },
  { slug: 'seizures', path: 'refs/seizures', title: 'Seizures', category: 'references', group: 'medical', description: 'Seizure assessment, safety, and management.', emoji: '⚡' },
  { slug: 'stroke', path: 'refs/stroke', title: 'Stroke', category: 'references', group: 'medical', description: 'FAST assessment and stroke pathway.', emoji: '🧠' },
  { slug: 'respiratory', path: 'refs/respiratory', title: 'Respiratory Emergencies', category: 'references', group: 'medical', description: 'Asthma, COPD, and bronchospasm management.', emoji: '🫁' },
  { slug: 'poisoning', path: 'refs/poisoning', title: 'Poisoning & Overdose', category: 'references', group: 'medical', description: 'Toxicology assessment and antidotes (naloxone, etc.).', emoji: '☠️' },
  // Pharmacology
  { slug: 'pharmacology', path: 'refs/pharmacology', title: 'Pharmacology', category: 'references', group: 'pharmacology', description: 'EMT pharmacodynamics, kinetics, and safety.', emoji: '💉' },
  { slug: 'meds-overview', path: 'refs/meds-overview', title: 'EMT Medications', category: 'references', group: 'pharmacology', description: 'Drug list, indications, dosing within scope.', emoji: '💊' },
  // Special Populations
  { slug: 'pediatric', path: 'refs/pediatric', title: 'Pediatric Emergencies', category: 'references', group: 'special', description: 'Age-specific assessment and common pediatric emergencies.', emoji: '👶' },
  { slug: 'ob-gyn', path: 'refs/ob-gyn', title: 'OB-GYN Emergencies', category: 'references', group: 'special', description: 'Pregnancy, labor, and gynecologic emergencies.', emoji: '🤰' },

  // --- Study ---
  { slug: 'quiz', path: 'tools/quiz', title: 'EMT Quiz', category: 'study', description: 'Practice questions drawn from your EMT study notes.', emoji: '✍️' },
];

export function toolsByCategory(catId: string): Tool[] {
  return tools.filter((t) => t.category === catId);
}

export function toolsByGroup(groupId: string): Tool[] {
  return tools.filter((t) => t.group === groupId);
}

export function getTool(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}
