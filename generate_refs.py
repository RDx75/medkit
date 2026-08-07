#!/usr/bin/env python3
"""
MedKit SB-to-Web generator
Reads core EMT topics from your Second Brain vault (Health-EMT)
and generates Astro reference pages under src/pages/refs/ with i18n shell
+ external reference links. Run BEFORE `npm run build`.

Usage:  python generate_refs.py
"""
import os, re, json
from pathlib import Path

REPO = Path(__file__).resolve().parent
# SB vault location: set MEDKIT_SB env var, or default to a relative path from repo root.
SB = Path(os.environ.get("MEDKIT_SB", str(REPO / "../../Obsidian/03 - Knowledge Base/Health-EMT")))
OUT = REPO / "src" / "pages" / "refs"
TOPICS = REPO / "sb_topics.txt"
PUBLIC = REPO / "public"

# External study links per category (for "Learn more" footer)
EXT_LINKS = {
    "assessment": [("NHTSA EMT Scope of Practice", "https://www.nhtsa.gov/ems"),
                   ("NREMT", "https://www.nremt.org/")],
    "airway":     [("NREMT Airway", "https://www.nremt.org/"),
                   ("AHA BLS", "https://cpr.heart.org/")],
    "trauma":     [("NHTSA Trauma", "https://www.nhtsa.gov/ems"),
                   ("ACS STOP THE BLEED", "https://www.stopthebleed.org/")],
    "medical":    [("NHTSA Medical", "https://www.nhtsa.gov/ems"),
                   ("WikEM", "https://wikem.org/")],
    "cardiac":    [("AHA CPR & ECC", "https://cpr.heart.org/"),
                   ("AHA 2025 Guidelines", "https://doi.org/10.1161/CIR.0000000000001183")],
    "peds-obs":   [("AAP", "https://www.aap.org/"), ("ACOG", "https://www.acog.org/")],
    "pharmacology":[("NHTSA Pharmacology", "https://www.nhtsa.gov/ems"),
                    ("NREMT", "https://www.nremt.org/")],
    "ops":        [("NHTSA EMS Operations", "https://www.nhtsa.gov/ems")],
}

EMOJI = {
    "assessment":"🔍","airway":"🫁","trauma":"🩹","medical":"💊",
    "cardiac":"❤️","peds-obs":"👶","pharmacology":"💉","ops":"🚨"
}

# Display titles that slug.title() would mangle (acronyms etc.)
TITLE_OVERRIDES = {
    "ecg-basics": "ECG Basics — 12-Lead",
    "ecg-interpretation": "ECG Interpretation",
    "cardiac-rhythms-normal": "Cardiac Rhythms — Normal",
    "cardiac-rhythms-abnormal": "Cardiac Rhythms — Abnormal",
}

def display_title(slug):
    return TITLE_OVERRIDES.get(slug, slug.replace("-", " ").title())

def parse_topics():
    out = []
    with open(TOPICS, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            line = re.sub(r"^-\s*", "", line)  # strip markdown list bullet
            parts = [p.strip() for p in line.split("|")]
            if len(parts) < 4:
                continue
            slug, src, cat, ref = parts[0], parts[1], parts[2], parts[3]
            out.append((slug, src, cat, ref))
    return out

def read_md(path):
    with open(path, encoding="utf-8") as f:
        txt = f.read()
    # strip frontmatter
    if txt.startswith("---"):
        txt = txt.split("---", 2)[-1]
    return txt.strip()

def md_to_text(md):
    """Strip markdown to plain text for search indexing."""
    t = md
    t = re.sub(r"```[\s\S]*?```", " ", t)  # code blocks
    t = re.sub(r"\|", "  ", t)  # table pipes
    t = re.sub(r"^[#>*\-]\s+", "", t, flags=re.MULTILINE)  # headings, quotes, bullets
    t = re.sub(r"\*{1,2}(.+?)\*{1,2}", r"\1", t)  # bold/italic
    t = re.sub(r"`(.+?)`", r"\1", t)  # inline code
    t = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", t)  # links
    t = re.sub(r"\s+", " ", t).strip()
    return t[:3000]

def md_to_html(md):
    """Minimal markdown -> HTML (headings, tables, lists, bold, code, blockquote)."""
    lines = md.split("\n")
    html, i = [], 0
    while i < len(lines):
        line = lines[i]
        # code block
        if line.strip().startswith("```"):
            lang = line.strip()[3:].strip()
            code = []
            i += 1
            while i < len(lines) and not lines[i].strip().startswith("```"):
                code.append(lines[i]); i += 1
            i += 1
            html.append('<pre class="code"><code>' + escape("\n".join(code)) + "</code></pre>")
            continue
        # heading
        m = re.match(r"^(#{1,4})\s+(.*)", line)
        if m:
            lvl = len(m.group(1)) + 1  # h2..h5 (h1 is title)
            html.append(f"<h{lvl}>{inline(m.group(2))}</h{lvl}>")
            i += 1; continue
        # table
        if "|" in line and i+1 < len(lines) and re.match(r"^\s*\|?[-:\s|]+\|?\s*$", lines[i+1]):
            tbl = [line]
            i += 1
            while i < len(lines) and "|" in lines[i]:
                tbl.append(lines[i]); i += 1
            html.append(table_to_html(tbl)); continue
        # blockquote
        if line.strip().startswith(">"):
            quote = []
            while i < len(lines) and lines[i].strip().startswith(">"):
                quote.append(lines[i].strip()[1:].strip()); i += 1
            html.append('<blockquote>' + inline(" ".join(quote)) + "</blockquote>"); continue
        # list
        if re.match(r"^\s*[-*]\s+", line):
            items = []
            while i < len(lines) and re.match(r"^\s*[-*]\s+", lines[i]):
                items.append("<li>" + inline(re.sub(r"^\s*[-*]\s+", "", lines[i])) + "</li>"); i += 1
            html.append("<ul>" + "".join(items) + "</ul>"); continue
        # blank
        if not line.strip():
            i += 1; continue
        # paragraph
        html.append("<p>" + inline(line) + "</p>")
        i += 1
    return "\n".join(html)

def inline(s):
    s = escape(s)
    s = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", s)
    s = re.sub(r"\*(.+?)\*", r"<em>\1</em>", s)
    s = re.sub(r"`(.+?)`", r"<code>\1</code>", s)
    return s

def escape(s):
    return s.replace("&","&amp;").replace("<","&lt;").replace(">","&gt;")

def table_to_html(rows):
    cells = []
    for r in rows:
        r = r.strip().strip("|")
        cells.append([c.strip() for c in r.split("|")])
    # skip separator row (row 2)
    head = cells[0]
    body = [c for c in cells[2:] if any(c)]
    html = ["<table>","<tr>" + "".join(f"<th>{inline(h)}</th>" for h in head) + "</tr>"]
    for row in body:
        html.append("<tr>" + "".join(f"<td>{inline(c)}</td>" for c in row) + "</tr>")
    html.append("</table>")
    return "\n".join(html)

def post_process(html, slug_map):
    """Turn SB artifacts into proper web UI:
    1. '## Quiz' Q/A blocks -> FAQ <details> accordions
    2. '### Related' [[wikilinks]] -> real links to existing ref pages (drop if no page)
    """
    # 1) Quiz Q/A -> accordion. Pattern: <p><strong>Q1:</strong> q</p>\n<p><strong>A1:</strong> a</p>
    html = re.sub(
        r'<p><strong>Q\d+:</strong>\s*(.*?)</p>\s*<p><strong>A\d+:</strong>\s*(.*?)</p>',
        lambda m: f'<details class="faq"><summary>{m.group(1).strip()}</summary><div class="body">{m.group(2).strip()}</div></details>',
        html, flags=re.DOTALL)
    # 2) Related wikilinks -> real links (slug match) or drop entirely
    html = re.sub(
        r'<li>\[\[([^\]|]+)(?:\|[^\]]+)?\]\]</li>',
        lambda m: related_link(m.group(1).strip(), slug_map),
        html)
    return html

def related_link(title, slug_map):
    slug = slug_map.get(title)
    if slug:
        return '<li><a class="related-link" href="../%s/">%s</a></li>' % (slug, title)
    return ""  # no matching ref page -> remove

def gen_page(slug, src, cat, ref, slug_map):
    path = SB / src
    if not path.exists():
        print(f"  [WARN] missing: {src}")
        return None
    md = read_md(path)
    body = post_process(md_to_html(md), slug_map)
    emoji = EMOJI.get(cat, "📄")
    ext = EXT_LINKS.get(cat, [])
    links = "\n".join(f'      <li><a href="{u}" target="_blank" rel="noopener">{n} ↗</a></li>' for n,u in ext)
    tpl = f'''---
import Base from '../../layouts/Base.astro';
const base = import.meta.env.BASE_URL || '/';
---

<Base title="{display_title(slug)}" activeSlug="{slug}">
  <div class="breadcrumb"><a href={{base}}>MedKit</a> / <span>References</span> / <span>{display_title(slug)}</span></div>
  <article class="ref-page">
    <div class="ref-body">
{body}
    </div>
    <aside class="ref-side">
      <div class="ref-card">
        <h3>Study further</h3>
        <p class="muted">ตรวจสอบกับอาจารย์และแนวทางปฏิบัติล่าสุดเสมอ</p>
        <ul class="ref-links">
{links}
        </ul>
        <p class="src">Source: {ref}</p>
      </div>
    </aside>
  </article>
</Base>
'''
    outp = OUT / f"{slug}.astro"
    with open(outp, "w", encoding="utf-8") as f:
        f.write(tpl)
    return slug

def main():
    OUT.mkdir(parents=True, exist_ok=True)
    topics = parse_topics()
    # Map SB source filename (without .md) -> slug for Related wikilink resolution
    slug_map = {}
    for slug, src, cat, ref in topics:
        slug_map[Path(src).stem] = slug
    print(f"Generating {len(topics)} reference pages...")
    slugs = []
    for slug, src, cat, ref in topics:
        r = gen_page(slug, src, cat, ref, slug_map)
        if r: slugs.append((r, cat))
    # write search index for full-text search (public/ -> dist root)
    PUBLIC.mkdir(parents=True, exist_ok=True)
    index = []
    for slug, cat in slugs:
        src_name = next((p[1] for p in topics if p[0] == slug), "")
        src_path = SB / src_name
        if src_name and src_path.exists():
            md = read_md(src_path)
            text = md_to_text(md)
            index.append({
                "path": f"refs/{slug}",
                "title": display_title(slug),
                "text": text,
                "emoji": EMOJI.get(cat, "📄"),
            })
    idx_path = PUBLIC / "search-index.json"
    with open(idx_path, "w", encoding="utf-8") as f:
        json.dump(index, f, ensure_ascii=False)
    print(f"Done. {len(slugs)} pages + search-index.json ({len(index)} entries)")

if __name__ == "__main__":
    main()
