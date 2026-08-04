# ⚕️ MedKit — Medical Tools & References

Free, fast, privacy-first medical calculators and references. Built in the style of
developer toolboxes like [HubKit.dev](https://hubkit.dev/) — everything runs **100% in
your browser**, nothing is uploaded, no account needed.

## 🔗 Live site

**https://rdx75.github.io/medkit/**

## 🧰 Tools

### Calculators
| Tool | Description |
|------|-------------|
| [BMI Calculator](https://rdx75.github.io/medkit/tools/bmi/) | Body Mass Index with WHO category |
| [BSA Calculator](https://rdx75.github.io/medkit/tools/bsa/) | Body Surface Area (Mosteller formula) |
| [MAP Calculator](https://rdx75.github.io/medkit/tools/map/) | Mean Arterial Pressure |
| [GCS Calculator](https://rdx75.github.io/medkit/tools/gcs/) | Glasgow Coma Scale (3–15) |
| [APGAR Calculator](https://rdx75.github.io/medkit/tools/apgar/) | Newborn APGAR score |
| [Drug Dose by Weight](https://rdx75.github.io/medkit/tools/drug-dose/) | Weight-based dosing with max-dose guard |
| [Unit Converter](https://rdx75.github.io/medkit/tools/unit-converter/) | Temp, weight, volume, length |

### References
| Tool | Description |
|------|-------------|
| [CPR / BLS Guide](https://rdx75.github.io/medkit/tools/cpr/) | Adult/child/infant CPR steps |
| [Vital Signs Ranges](https://rdx75.github.io/medkit/tools/vital-signs/) | Normal ranges by age |

### Study
| Tool | Description |
|------|-------------|
| [EMT Quiz](https://rdx75.github.io/medkit/tools/quiz/) | Practice questions for EMT study |

## 🛠️ Stack

- **Astro** (static site, no backend)
- Plain CSS with dark/light theme, ⌘K search palette, responsive grid
- Deploy: **GitHub Pages** via GitHub Actions (`.github/workflows/deploy.yml`)
  — build output goes to `gh-pages/medkit/` so the site lives at `/medkit/`

## 🚀 Run locally

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
```

## 📁 Structure

```
src/
  data/tools.ts          # central registry — add a tool here + a page to list it
  layouts/Base.astro     # shell: header, sidebar, search, theme, footer
  pages/                 # index + about/privacy/terms
  pages/tools/*.astro    # one page per calculator/reference
  styles/global.css      # all styling
public/
  favicon.svg
```

**Adding a new tool** = create `src/pages/tools/<slug>.astro` + one entry in `src/data/tools.ts`.
Push to `main` → GitHub Actions builds and deploys automatically.

## ⚠️ Disclaimer

MedKit is for education and quick reference only — **not** a substitute for
professional medical advice, diagnosis, or treatment. Always follow your local
protocols and the direction of qualified clinicians. In an emergency, call your
local emergency number.
