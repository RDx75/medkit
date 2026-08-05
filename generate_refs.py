#!/usr/bin/env python3
"""
MedKit SB-to-Web generator
Reads core EMT topics from SB (O:/Obsidian/03 - Knowledge Base/Health-EMT)
and generates Astro reference pages under src/pages/refs/ with i18n shell
+ external reference links. Run BEFORE `npm run build`.

Usage:  python generate_refs.py
"""
import os, re, json

SB = "O:/Obsidian/03 - Knowledge Base/Health-EMT"
OUT = "O:/Obsidian/02 - Projects/medkit/src/pages/refs"
TOPICS = "O:/Obsidian/02 - Projects/medkit/sb_topics.txt"
PUBLIC = "O:/Obsidian/02 - Projects/medkit/public"

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

def gen_page(slug, src, cat, ref):
    path = os.path.join(SB, src)
    if not os.path.exists(path):
        print(f"  [WARN] missing: {src}")
        return None
    md = read_md(path)
    body = md_to_html(md)
    emoji = EMOJI.get(cat, "📄")
    ext = EXT_LINKS.get(cat, [])
    links = "\n".join(f'      <li><a href="{u}" target="_blank" rel="noopener">{n} ↗</a></li>' for n,u in ext)
    tpl = f'''---
import Base from '../../layouts/Base.astro';
const base = import.meta.env.BASE_URL || '/';
---

<Base title="{slug.replace('-',' ').title()} — MedKit" activeSlug="{slug}">
  <div class="breadcrumb"><a href={{base}}>MedKit</a> / <span>References</span> / <span>{slug.replace('-',' ').title()}</span></div>
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
    outp = os.path.join(OUT, f"{slug}.astro")
    with open(outp, "w", encoding="utf-8") as f:
        f.write(tpl)
    return slug

def main():
    os.makedirs(OUT, exist_ok=True)
    topics = parse_topics()
    print(f"Generating {len(topics)} reference pages...")
    slugs = []
    for slug, src, cat, ref in topics:
        r = gen_page(slug, src, cat, ref)
        if r: slugs.append((r, cat))
    # write search index for full-text search (public/ -> dist root)
    os.makedirs(PUBLIC, exist_ok=True)
    index = []
    for slug, cat in slugs:
        src_name = next((p[1] for p in topics if p[0] == slug), "")
        src_path = os.path.join(SB, src_name)
        if src_name and os.path.exists(src_path):
            md = read_md(src_path)
            text = md_to_text(md)
            index.append({
                "path": f"refs/{slug}",
                "title": slug.replace("-", " ").title(),
                "text": text,
                "emoji": EMOJI.get(cat, "📄"),
            })
    idx_path = os.path.join(PUBLIC, "search-index.json")
    with open(idx_path, "w", encoding="utf-8") as f:
        json.dump(index, f, ensure_ascii=False)
    print(f"Done. {len(slugs)} pages + search-index.json ({len(index)} entries)")

if __name__ == "__main__":
    main()
