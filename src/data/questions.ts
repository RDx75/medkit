// EMT Quiz question bank — categorized by topic.
// Questions drawn from the SB vault (Health-EMT) knowledge.
// The quiz page picks a category, shuffles, and never repeats the same
// order twice (Fisher–Yates at runtime).

export type Question = {
  q: string;
  options: string[];
  answer: number; // index into options
  explain: string;
  cat: string; // category id
};

export type QuizCategory = {
  id: string;
  emoji: string;
};

export const quizCategories: QuizCategory[] = [
  { id: 'bls', emoji: '🫀' },
  { id: 'airway', emoji: '🫁' },
  { id: 'cardiac', emoji: '❤️' },
  { id: 'trauma', emoji: '🩹' },
  { id: 'medical', emoji: '💊' },
  { id: 'pharm', emoji: '💉' },
  { id: 'assessment', emoji: '🔍' },
  { id: 'special', emoji: '👶' },
];

export const questions: Question[] = [
  // ================= BLS / CPR =================
  { q: 'What is the compression:ventilation ratio for a single rescuer doing adult CPR?', options: ['15:2', '30:2', '5:1', 'Continuous / no breaths'], answer: 1, explain: '30:2 for a lone rescuer; 15:2 with two rescuers.', cat: 'bls' },
  { q: 'Recommended adult compression depth in CPR is:', options: ['2–3 cm', '5–6 cm', '8–10 cm', '1–2 cm'], answer: 1, explain: 'At least 5 cm and not more than 6 cm in adults.', cat: 'bls' },
  { q: 'Adult CPR compression rate should be:', options: ['60–80 /min', '80–100 /min', '100–120 /min', '120–140 /min'], answer: 2, explain: '100–120 compressions per minute for all ages.', cat: 'bls' },
  { q: 'When using an AED, after each shock you should:', options: ['Check pulse immediately', 'Resume CPR for 2 minutes', 'Wait 30 seconds', 'Turn the AED off'], answer: 1, explain: 'Immediately resume CPR for ~2 minutes (or until prompted by the AED).', cat: 'bls' },
  { q: 'A patient in cardiac arrest with gasping/agonal breathing should be treated as:', options: ['Breathing normally, monitor only', 'Respiratory distress, give oxygen', 'Cardiac arrest — start CPR', 'Stroke — do FAST assessment'], answer: 2, explain: 'Agonal gasps are not effective breathing. Treat as cardiac arrest and start CPR.', cat: 'bls' },
  { q: 'The correct hand placement for adult chest compressions is:', options: ['Upper third of sternum', 'Lower half of sternum', 'Left side of chest', 'Xiphoid process'], answer: 1, explain: 'Lower half of the sternum — avoid the xiphoid process.', cat: 'bls' },
  { q: 'Pediatric (child) compression:ventilation ratio with one rescuer is:', options: ['30:2', '15:2', '5:1', '10:2'], answer: 0, explain: 'Children: 30:2 for single rescuer, 15:2 when two rescuers.', cat: 'bls' },
  { q: 'An infant chest compression depth should be about:', options: ['1.5 cm (⅓ of chest depth)', '4 cm (⅓ of chest depth)', '5–6 cm', '2.5 cm (⅓ of chest depth)'], answer: 1, explain: 'Compress at least ⅓ of the AP chest depth (~4 cm) in infants.', cat: 'bls' },
  { q: 'When giving breaths with a BVM, each breath should be delivered over:', options: ['0.5 s', '1 s', '3 s', 'As fast as possible'], answer: 1, explain: 'Deliver each breath over about 1 second, watching for chest rise.', cat: 'bls' },
  { q: 'How do you open the airway in a trauma patient (no suspected c-spine)?', options: ['Head-tilt/chin-lift', 'Jaw-thrust', 'Neck extension', 'Turn head to the side'], answer: 1, explain: 'Trauma: jaw-thrust without head tilt to protect the spine. Non-trauma: head-tilt/chin-lift.', cat: 'bls' },
  { q: 'The maximum interruption time during CPR chest compressions should be:', options: ['30 seconds', '20 seconds', '10 seconds', '60 seconds'], answer: 2, explain: 'Keep interruptions <10 seconds to maintain coronary and cerebral perfusion.', cat: 'bls' },
  { q: 'Which rhythm is most likely to respond to an AED shock?', options: ['Asystole', 'PEA', 'VF (ventricular fibrillation)', 'Sinus bradycardia'], answer: 2, explain: 'VF and pulseless VT are shockable rhythms. Asystole and PEA are not.', cat: 'bls' },

  // ================= Airway =================
  { q: 'Normal adult respiratory rate is approximately:', options: ['6–10 /min', '12–20 /min', '25–35 /min', '40–50 /min'], answer: 1, explain: '12–20 breaths/min is the normal adult range.', cat: 'airway' },
  { q: 'An OPA is only used in a patient who is:', options: ['Awake and alert', 'Unresponsive without a gag reflex', 'Responsive to pain', 'Sitting upright'], answer: 1, explain: 'OPA requires no gag reflex; an awake patient will gag or vomit.', cat: 'airway' },
  { q: 'The correct size for an NPA is roughly:', options: ['From the nostril to the earlobe', 'From the nostril to the corner of the mouth', 'From the lips to the tragus', 'The length of the little finger only'], answer: 0, explain: 'Measure from the tip of the nose to the earlobe for the correct NPA length.', cat: 'airway' },
  { q: 'Signs of inadequate breathing include all EXCEPT:', options: ['Accessory muscle use', 'Cyanosis', 'Normal rate with shallow depth', 'Equal bilateral breath sounds'], answer: 3, explain: 'Equal breath sounds are a reassuring sign; the others indicate inadequate breathing.', cat: 'airway' },
  { q: 'Normal SpO₂ target for most adults is:', options: ['80–85%', '88–92%', '94–99%', '100% always'], answer: 2, explain: '94–99% is the usual target; COPD patients may target 88–92%.', cat: 'airway' },
  { q: 'The most common cause of airway obstruction in an unresponsive patient is:', options: ['Foreign body', 'The tongue', 'Laryngospasm', 'Secretions'], answer: 1, explain: 'The tongue is the most common airway obstruction in unresponsiveness.', cat: 'airway' },
  { q: 'BVM ventilation with a good seal should produce:', options: ['No chest rise', 'Visible chest rise over 1 second', 'Gastric distension', 'Audible wheezing'], answer: 1, explain: 'A good seal + 1-second breaths should visibly lift the chest.', cat: 'airway' },
  { q: 'Suctioning an adult should not exceed:', options: ['5 seconds', '10 seconds', '15 seconds', '30 seconds'], answer: 2, explain: 'Max 15 seconds per suction pass for adults, 5–10 s for children/infants.', cat: 'airway' },
  { q: 'High-flow oxygen via non-rebreather mask should be set at:', options: ['2–4 L/min', '6–8 L/min', '10–15 L/min', '25 L/min'], answer: 2, explain: '10–15 L/min fills the reservoir bag of a non-rebreather mask.', cat: 'airway' },
  { q: 'Stridor suggests obstruction at the:', options: ['Upper airway (laryngeal level)', 'Lower airway (bronchi)', 'Alveolar level', 'Nasal passages only'], answer: 0, explain: 'Stridor = upper airway obstruction; wheezing = lower airway.', cat: 'airway' },

  // ================= Cardiac =================
  { q: 'A GCS of 7 indicates:', options: ['Mild', 'Moderate', 'Severe', 'Normal'], answer: 2, explain: 'GCS ≤ 8 is severe and typically warrants airway protection.', cat: 'cardiac' },
  { q: 'An APGAR score of 9 at 5 minutes is:', options: ['Low', 'Moderate', 'Normal', 'Critical'], answer: 2, explain: '7–10 is generally normal; 9 indicates a well-transitioning newborn.', cat: 'cardiac' },
  { q: 'Which 12-lead leads look at the inferior wall?', options: ['V1–V4', 'II, III, aVF', 'I, aVL, V5–V6', 'aVR only'], answer: 1, explain: 'II, III, aVF = inferior wall (RCA territory).', cat: 'cardiac' },
  { q: 'STEMI on ECG is defined by:', options: ['ST depression in 2 leads', 'T wave inversion only', 'ST elevation ≥1 mm in 2+ contiguous leads', 'A wide QRS'], answer: 2, explain: 'ST elevation ≥1 mm in 2+ contiguous leads (≥2 mm in V1–V3).', cat: 'cardiac' },
  { q: 'Which is a shockable rhythm?', options: ['Asystole', 'Pulseless electrical activity (PEA)', 'Pulseless VT', 'Sinus bradycardia'], answer: 2, explain: 'VF and pulseless VT are shockable. Asystole/PEA need CPR + epinephrine.', cat: 'cardiac' },
  { q: 'Ventricular fibrillation produces which pulse finding?', options: ['Weak radial pulse', 'Strong carotid pulse', 'No pulse', 'Bounding pulse'], answer: 2, explain: 'VF is a pulseless arrhythmia — no cardiac output.', cat: 'cardiac' },
  { q: 'First-line drug for cardiac arrest (VF/pVT) is:', options: ['Adenosine', 'Epinephrine 1 mg IV/IO', 'Atropine', 'Amiodarone only'], answer: 1, explain: 'Epinephrine 1 mg IV/IO q3–5 min is first-line; amiodarone after 2nd shock.', cat: 'cardiac' },
  { q: 'Symptomatic bradycardia (HR <50 with symptoms) first treatment is:', options: ['Defibrillation', 'Atropine 1 mg IV', 'Adenosine 6 mg', 'Aspirin'], answer: 1, explain: 'Atropine 0.5–1 mg IV is first-line for symptomatic bradycardia.', cat: 'cardiac' },
  { q: 'Which coronary artery supplies the anterior wall?', options: ['RCA', 'LCx', 'LAD', 'Posterior descending artery'], answer: 2, explain: 'LAD supplies the anterior wall (V1–V4).', cat: 'cardiac' },
  { q: 'Aspirin dose for suspected ACS is:', options: ['81 mg', '162 mg', '325 mg chewable', '500 mg IV'], answer: 2, explain: '325 mg chewable aspirin unless contraindicated.', cat: 'cardiac' },
  { q: 'Nitroglycerin is contraindicated if SBP is:', options: ['>120 mmHg', '<90 mmHg', '>160 mmHg', 'Any value'], answer: 1, explain: 'Avoid nitro if SBP <90 mmHg or recent phosphodiesterase (ED) use.', cat: 'cardiac' },
  { q: 'Sinus tachycardia ECG shows:', options: ['Irregular rhythm, no P waves', 'Regular rhythm with P wave before each QRS, rate >100', 'No QRS complexes', 'Wide QRS >120 ms'], answer: 1, explain: 'Sinus tach: regular, P wave before each QRS, rate 100–150+.', cat: 'cardiac' },

  // ================= Trauma =================
  { q: 'The "C" in DCAP-BTLS stands for:', options: ['Cyanosis', 'Contusions', 'Capillary refill', 'Circulation'], answer: 1, explain: 'DCAP-BTLS = Deformities, Contusions, Abrasions, Punctures, Burns, Tenderness, Lacerations, Swelling.', cat: 'trauma' },
  { q: 'Signs of tension pneumothorax include all EXCEPT:', options: ['Tracheal deviation', 'Absent breath sounds on one side', 'JVD', 'Bilateral crackles'], answer: 3, explain: 'Crackles are not a tension pneumothorax sign; tracheal shift, unilateral breath sounds, JVD are.', cat: 'trauma' },
  { q: 'First step in controlling severe external bleeding is:', options: ['Apply direct pressure', 'Apply a tourniquet', 'Elevate the limb', 'Apply cold'], answer: 0, explain: 'Direct pressure first; escalate to tourniquet if it fails or is impractical.', cat: 'trauma' },
  { q: 'A tourniquet should be placed:', options: ['Over the joint', '2–3 inches above the wound', 'Directly on the wound', 'Below the wound'], answer: 1, explain: 'Place 2–3 inches above the bleeding site, never over a joint.', cat: 'trauma' },
  { q: 'Class III hemorrhage (30–40% blood loss) typically causes:', options: ['Normal vital signs', 'HR 120+, SBP drop, anxious', 'Bradycardia', 'No change in mentation'], answer: 1, explain: 'Class III: 30–40% loss → tachycardic, hypotension, anxious/confused.', cat: 'trauma' },
  { q: 'Splinting a fracture should immobilize:', options: ['The joint above only', 'The joint below only', 'Joints above AND below the fracture', 'Nothing — keep it mobile'], answer: 2, explain: 'Immobilize joints above and below the fracture to prevent movement.', cat: 'trauma' },
  { q: 'The most common preventable cause of death in trauma is:', options: ['Head injury', 'Hemorrhage', 'Infection', 'Hypothermia'], answer: 1, explain: 'Hemorrhage is the most common preventable cause of traumatic death.', cat: 'trauma' },
  { q: 'Cushing\'s triad (increased ICP) includes:', options: ['Hypertension, bradycardia, irregular respirations', 'Hypotension, tachycardia, fever', 'Normal BP, tachypnea, miosis', 'Hypertension, tachycardia, hyperventilation'], answer: 0, explain: 'Cushing\'s: hypertension + bradycardia + irregular respirations = late sign of ↑ICP.', cat: 'trauma' },
  { q: 'Full-thickness (3rd degree) burns are characterized by:', options: ['Painful red blistering', 'White/charred painless skin', 'Superficial redness only', 'Itchy rash'], answer: 1, explain: 'Full-thickness burns destroy nerves — skin appears white/charred and is painless.', cat: 'trauma' },
  { q: 'The Rule of Nines: anterior trunk of an adult equals:', options: ['9%', '18%', '27%', '36%'], answer: 1, explain: 'Anterior trunk = 18% (9% each for chest and abdomen).', cat: 'trauma' },

  // ================= Medical =================
  { q: 'FAST stroke assessment checks:', options: ['Face, Arms, Speech, Time', 'Fingers, Airway, Sputum, Temp', 'Femoral, Abdomen, Spine, Toes', 'Fever, Alertness, Skin, Tremor'], answer: 0, explain: 'FAST = Face droop, Arm weakness, Speech difficulty, Time to call.', cat: 'medical' },
  { q: 'Hypoglycemia (<70 mg/dL) in an awake patient should be treated with:', options: ['Insulin', 'Oral glucose', 'IV fluids only', 'Nothing — wait'], answer: 1, explain: 'Give oral glucose (or IV dextrose if unable to swallow).', cat: 'medical' },
  { q: 'Anaphylaxis first-line treatment is:', options: ['Antihistamine PO', 'Epinephrine IM 0.3 mg (adult)', 'Albuterol only', 'Corticosteroids first'], answer: 1, explain: 'Epinephrine IM 0.3 mg (1:1000) anterolateral thigh is first-line.', cat: 'medical' },
  { q: 'A generalized seizure lasting >5 minutes is:', options: ['Normal — wait', 'Status epilepticus — treat', 'Always a febrile seizure', 'A stroke'], answer: 1, explain: 'Seizures >5 min = status epilepticus; benzodiazepines + rapid transport.', cat: 'medical' },
  { q: 'Signs of respiratory distress in a child include all EXCEPT:', options: ['Nasal flaring', 'Retractions', 'Tripod positioning', 'Bradycardia with normal work of breathing'], answer: 3, explain: 'Bradycardia with normal work of breathing is not typical; distress usually causes tachycardia first.', cat: 'medical' },
  { q: 'The classic triad of diabetic ketoacidosis is:', options: ['Polyuria, polydipsia, polyphagia', 'Fever, cough, rash', 'Bradycardia, hypotension, edema', 'Jaundice, ascites, confusion'], answer: 0, explain: 'DKA: polyuria, polydipsia, polyphagia + high glucose + ketones.', cat: 'medical' },
  { q: 'Naloxone (Narcan) is used to reverse:', options: ['Benzodiazepine overdose', 'Opioid overdose', 'Beta-blocker overdose', 'Aspirin toxicity'], answer: 1, explain: 'Naloxone is a competitive opioid antagonist.', cat: 'medical' },
  { q: 'Which is a contraindication for giving oral glucose?', options: ['Diabetic patient', 'Unresponsive patient', 'Hypoglycemia', 'Able to swallow'], answer: 1, explain: 'Never give anything by mouth to an unresponsive patient.', cat: 'medical' },
  { q: 'Heat stroke is defined by core temp and CNS changes:', options: ['38°C with headache', '>40°C (104°F) with altered mental status', '37°C with cramps', 'Any temp with sweating'], answer: 1, explain: 'Heat stroke: core temp >40°C + altered mentation (hot, dry skin possible).', cat: 'medical' },
  { q: 'A patient with epiglottitis (tripod position, drooling) — the EMT should:', options: ['Inspect the throat with a tongue blade', 'Avoid airway instrumentation, provide O2, transport', 'Insert an OPA', 'Suction aggressively'], answer: 1, explain: 'Never examine the throat in suspected epiglottitis — it may trigger complete obstruction.', cat: 'medical' },

  // ================= Pharmacology =================
  { q: 'Epinephrine 1:10,000 (IV) is used for:', options: ['Anaphylaxis IM', 'Cardiac arrest', 'Asthma', 'Bradycardia'], answer: 1, explain: '1:10,000 IV is the cardiac arrest concentration; 1:1,000 IM for anaphylaxis.', cat: 'pharm' },
  { q: 'Route for epinephrine in anaphylaxis:', options: ['IV push 1:10,000', 'IM 1:1,000', 'Subcutaneous only', 'Oral'], answer: 1, explain: 'IM 0.3 mg of 1:1,000 epinephrine in the anterolateral thigh.', cat: 'pharm' },
  { q: 'Aspirin works in ACS by:', options: ['Vasodilation', 'Inhibiting platelet aggregation', 'Increasing heart rate', 'Blocking pain only'], answer: 1, explain: 'Aspirin inhibits platelets, reducing clot propagation in ACS.', cat: 'pharm' },
  { q: 'Albuterol is primarily used for:', options: ['Bradycardia', 'Bronchospasm', 'Hypotension', 'Seizures'], answer: 1, explain: 'Albuterol is a beta-2 agonist bronchodilator for asthma/COPD.', cat: 'pharm' },
  { q: 'The generic name for Nitrostat is:', options: ['Nitroglycerin', 'Adenosine', 'Amiodarone', 'Diltiazem'], answer: 0, explain: 'Nitrostat = nitroglycerin (sublingual).', cat: 'pharm' },
  { q: 'Atropine is used to treat:', options: ['Tachycardia', 'Symptomatic bradycardia', 'Hypertension', 'Seizures'], answer: 1, explain: 'Atropine is an anticholinergic that increases HR in symptomatic bradycardia.', cat: 'pharm' },
  { q: 'Glucagon is given for hypoglycemia when:', options: ['The patient is awake and can eat', 'No IV access and patient unresponsive', 'Glucose is high', 'The patient refuses transport'], answer: 1, explain: 'Glucagon IM/SC raises glucose when no IV access is available.', cat: 'pharm' },
  { q: 'Which medication should NOT be given to a patient with chest pain and suspected ED drug use?', options: ['Aspirin', 'Nitroglycerin', 'Oxygen', 'None of these'], answer: 1, explain: 'Nitro + PDE-5 inhibitors (Viagra/Cialis) causes severe hypotension.', cat: 'pharm' },
  { q: 'The "5 rights" of medication administration include all EXCEPT:', options: ['Right patient', 'Right drug', 'Right route', 'Right insurance'], answer: 3, explain: 'Right patient, drug, dose, route, time — and documentation.', cat: 'pharm' },
  { q: 'Oxygen should be titrated in a COPD patient to:', options: ['100% always', 'SpO₂ 88–92%', 'SpO₂ 100%', 'Room air only'], answer: 1, explain: 'COPD: titrate to 88–92% to avoid suppressing hypoxic drive.', cat: 'pharm' },

  // ================= Assessment =================
  { q: 'The AVPU scale assesses:', options: ['Pain level', 'Level of consciousness', 'Breathing quality', 'Blood pressure'], answer: 1, explain: 'AVPU = Alert, Verbal, Pain, Unresponsive — a quick LOC assessment.', cat: 'assessment' },
  { q: 'SAMPLE history includes all EXCEPT:', options: ['Signs & symptoms', 'Allergies', 'Medications', 'Vital signs'], answer: 3, explain: 'SAMPLE = S/S, Allergies, Medications, Past history, Last meal, Events.', cat: 'assessment' },
  { q: 'Normal adult heart rate range is:', options: ['40–60 bpm', '60–100 bpm', '100–120 bpm', '120–140 bpm'], answer: 1, explain: 'Normal adult HR is 60–100 bpm at rest.', cat: 'assessment' },
  { q: 'Normal adult blood pressure is approximately:', options: ['90/60 mmHg', '120/80 mmHg', '140/90 mmHg', '160/100 mmHg'], answer: 1, explain: 'Normal adult BP is around 120/80 mmHg.', cat: 'assessment' },
  { q: 'Capillary refill longer than ___ seconds is delayed:', options: ['1', '2', '4', '10'], answer: 1, explain: 'Capillary refill >2 seconds suggests poor perfusion (children).', cat: 'assessment' },
  { q: 'During the primary assessment (ABCDE), the EMT checks:', options: ['Detailed history', 'Airway, breathing, circulation, disability, exposure', 'Blood glucose only', 'Past medical history'], answer: 1, explain: 'Primary = life threats: Airway, Breathing, Circulation, Disability, Exposure.', cat: 'assessment' },
  { q: 'A patient who only responds to painful stimuli is:', options: ['Alert', 'Verbally responsive', 'Pain responsive', 'Unresponsive'], answer: 2, explain: 'AVPU: responds only to pain = "P".', cat: 'assessment' },
  { q: 'The best way to check a pulse in an unresponsive adult is:', options: ['Radial pulse', 'Carotid pulse', 'Pedal pulse', 'Brachial pulse'], answer: 1, explain: 'Carotid (or femoral) is the most reliable in unresponsive adults.', cat: 'assessment' },
  { q: 'OPQRST is used to assess:', options: ['Onset, Provocation, Quality, Radiation, Severity, Time', 'Airway, Breathing, Circulation', 'Orientation, Pupils, Gait', 'Oxygen, Pressure, Rate, Temperature'], answer: 0, explain: 'OPQRST characterizes pain/history of present illness.', cat: 'assessment' },
  { q: 'Skin that is cool, pale, and diaphoretic suggests:', options: ['Normal findings', 'Poor perfusion / shock', 'Hyperthermia', 'Seizure activity'], answer: 1, explain: 'Cool, pale, clammy skin is a classic sign of shock.', cat: 'assessment' },

  // ================= Special Populations =================
  { q: 'Pediatric normal resting HR is generally:', options: ['Slower than adults', 'Faster than adults', 'Same as adults', 'Zero in sleep'], answer: 1, explain: 'Children have higher baseline HR (e.g., infants 100–160 bpm).', cat: 'special' },
  { q: 'A pregnant patient in her third trimester should be transported:', options: ['Supine flat', 'Left lateral recumbent', 'Prone', 'Sitting upright only'], answer: 1, explain: 'Left lateral tilt prevents aortocaval compression from the gravid uterus.', cat: 'special' },
  { q: 'Supine hypotensive syndrome occurs when:', options: ['Patient is dehydrated', 'Gravid uterus compresses the IVC', 'Blood loss is severe', 'Patient is bradycardic'], answer: 1, explain: 'The uterus compresses the IVC in supine → decreased preload and hypotension.', cat: 'special' },
  { q: 'What does APGAR assess?', options: ['Appearance, Pulse, Grimace, Activity, Respiration', 'Airway, Pulse, Glucose, Alertness, Reflexes', 'Age, Position, Gait, Activity, Response', 'Apnea, Pain, Growth, Appetite, Rash'], answer: 0, explain: 'APGAR: Appearance, Pulse, Grimace, Activity, Respiration — 0,1,2 each.', cat: 'special' },
  { q: 'Infant normal respiratory rate is approximately:', options: ['12–20 /min', '30–60 /min', '80–100 /min', '5–10 /min'], answer: 1, explain: 'Infants breathe 30–60 times/min.', cat: 'special' },
  { q: 'When assessing an infant, do it in this order:', options: ['Head first', 'Feet first (least distressing first)', 'Always start with the ears', 'Random order'], answer: 1, explain: 'Examine infants feet-first — least distressing to most distressing.', cat: 'special' },
  { q: 'Eclampsia is:', options: ['High BP only', 'Seizures in pregnancy with preeclampsia', 'Vaginal bleeding', 'Morning sickness'], answer: 1, explain: 'Eclampsia = new-onset seizures in a preeclamptic pregnant patient.', cat: 'special' },
  { q: 'The APGAR score is typically assessed at:', options: ['1 and 5 minutes', '10 and 20 minutes', 'Only at birth', '1 and 24 hours'], answer: 0, explain: 'Scored at 1 and 5 minutes; repeat at 5/10/20 if low.', cat: 'special' },
  { q: 'A neonate\'s first breath should occur within:', options: ['30 seconds', '1 minute', '5 minutes', '10 minutes'], answer: 0, explain: 'The "golden minute": assess and stimulate — first breaths in ~30–60 s.', cat: 'special' },
  { q: 'Pediatric shock is often first recognized by:', options: ['Hypotension', 'Tachycardia + poor perfusion', 'Bradycardia', 'Fever'], answer: 1, explain: 'Children compensate with tachycardia; hypotension is a LATE sign.', cat: 'special' },
];

export function getQuestionsByCat(cat: string): Question[] {
  if (cat === 'all') return questions;
  return questions.filter((q) => q.cat === cat);
}
