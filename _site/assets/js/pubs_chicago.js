// ---------- config ----------
const BIB_URL = "/assets/data/publications.bib";
const MAX_AUTHORS = 10;   // Chicago: list up to 10, then first 7 + et al
// ----------------------------

// Basic BibTeX parse: split into entries and pull common keys + entry type
function parseBibtex(bib) {
  const entries = [];
  const reEntryStart = /^@\w+\s*{/i;
  let buf = [];
  for (const line of bib.split(/\r?\n/)) {
    if (reEntryStart.test(line.trim())) {
      if (buf.length) entries.push(buf.join("\n"));
      buf = [line];
    } else buf.push(line);
  }
  if (buf.length) entries.push(buf.join("\n"));

  const get = (key, txt) => {
    const m = txt.match(new RegExp(key + `\\s*=\\s*[{"']([\\s\\S]*?)["'}]\\s*,?`, "i"));
    return m ? m[1].replace(/\s+/g, " ").trim() : "";
  };
  const getType = txt => {
    const m = txt.match(/^@(\w+)/i);
    return m ? m[1].toLowerCase() : "";
  };
  return entries.map(e => ({
    type: getType(e),
    title:  get("title", e),
    author: get("author", e),
    editor: get("editor", e),
    year:   get("year", e),
    journal:    get("journal", e),
    booktitle:  get("booktitle", e),
    publisher:  get("publisher", e),
    organization:get("organization", e),
    school:     get("school", e),
    institution:get("institution", e),
    address:    get("address", e) || get("location", e),
    edition:    get("edition", e),
    volume:     get("volume", e),
    number:     get("number", e) || get("issue", e),
    pages:      get("pages", e).replace(/--/g, "–"),
    doi:        get("doi", e).replace(/^https?:\/\/doi\.org\//i, ""),
    url:        get("url", e),
    eprint:     get("eprint", e),          // arXiv id sometimes here
    archivePrefix: get("archivePrefix", e) // "arXiv"
  })).filter(x => x.title);
}

// Turn "Last, First and Second, Third" into Chicago author string
function formatAuthors(authorField) {
  if (!authorField) return "";
  // Split on ' and ' not within braces
  const raw = authorField.split(/\s+and\s+/i).map(s => s.trim()).filter(Boolean);

  const norm = raw.map(a => {
    // BibTeX often uses "Last, First Middle"
    if (a.includes(",")) {
      const [last, first] = a.split(",").map(s => s.trim());
      return `${last}, ${first}`;
    }
    // Or "First Middle Last"
    const parts = a.split(/\s+/);
    if (parts.length === 1) return parts[0];
    const last = parts.pop();
    return `${last}, ${parts.join(" ")}`;
  });

  if (norm.length <= 10) {
    if (norm.length === 1) return norm[0];
    if (norm.length === 2) return `${norm[0]} and ${norm[1]}`;
    return `${norm.slice(0, -1).join(", ")}, and ${norm[norm.length - 1]}`;
  }
  // More than 10: first 7 then et al
  const first = norm.slice(0, 7).join(", ");
  return `${first}, et al.`;
}

// Helpers
const q = s => s ? `&ldquo;${escapeHTML(s)}&rdquo;` : "";          // quoted title
const em = s => s ? `<em>${escapeHTML(s)}</em>` : "";
function escapeHTML(s) {
  return String(s)
    .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;").replace(/'/g,"&#39;");
}
function joinParts(parts) {
  return parts.filter(Boolean).join(" ");
}
function withTerminalPeriod(s) {
  if (!s) return "";
  return /[.?!]$/.test(s) ? s : s + ".";
}
function doiOrUrl({doi, url, archivePrefix, eprint}) {
  if (doi) return `<a href="https://doi.org/${doi}" target="_blank" rel="noopener">https://doi.org/${doi}</a>.`;
  if (archivePrefix && archivePrefix.toLowerCase() === "arxiv" && eprint)
    return `<a href="https://arxiv.org/abs/${eprint}" target="_blank" rel="noopener">arXiv:${eprint}</a>.`;
  if (url) return `<a href="${url}" target="_blank" rel="noopener">${escapeHTML(url)}</a>.`;
  return "";
}

// Chicago formatting by entry type
function chicagoEntry(e) {
  const authors = formatAuthors(e.author) || formatAuthors(e.editor);
  const year = e.year || "n.d.";
  const titleQ = q(e.title);

  if (e.type === "article") {
    // Authors. Year. “Title.” Journal volume(number): pages. DOI/URL.
    const volIssue = e.volume ? (e.number ? `${e.volume}(${e.number})` : e.volume) : "";
    const pages = e.pages ? `:${e.pages}` : "";
    return joinParts([
      withTerminalPeriod(`${authors}.`),
      withTerminalPeriod(`${year}.`),
      withTerminalPeriod(`${titleQ}`),
      withTerminalPeriod(`${em(e.journal)} ${volIssue}${pages}`),
      doiOrUrl(e)
    ]);
  }

  if (e.type === "inproceedings" || e.type === "conference") {
    // Authors. Year. “Title.” In Proceedings/Booktitle, pages. Publisher/Org, Address. DOI/URL.
    const venue = e.booktitle ? `In ${em(e.booktitle)}` : "";
    const pages = e.pages ? `, ${e.pages}` : "";
    const tail  = [e.publisher || e.organization, e.address].filter(Boolean).join(", ");
    return joinParts([
      withTerminalPeriod(`${authors}.`),
      withTerminalPeriod(`${year}.`),
      withTerminalPeriod(`${titleQ}`),
      withTerminalPeriod(`${venue}${pages}.`),
      withTerminalPeriod(tail ? `${tail}.` : ""),
      doiOrUrl(e)
    ]);
  }

  if (e.type === "book") {
    // Authors. Year. Title. Edition. Address: Publisher. DOI/URL.
    const edition = e.edition ? `${escapeHTML(e.edition)} ed.` : "";
    const placePub = [e.address, e.publisher].filter(Boolean).join(": ");
    return joinParts([
      withTerminalPeriod(`${authors}.`),
      withTerminalPeriod(`${year}.`),
      withTerminalPeriod(`${em(e.title)}`),
      withTerminalPeriod(edition),
      withTerminalPeriod(placePub),
      doiOrUrl(e)
    ]);
  }

  if (e.type === "incollection") {
    // Chapter in edited book
    const venue = e.booktitle ? `In ${em(e.booktitle)}` : "";
    const pages = e.pages ? `, ${e.pages}` : "";
    const editors = e.editor ? `, edited by ${formatAuthors(e.editor)}` : "";
    const placePub = [e.address, e.publisher].filter(Boolean).join(": ");
    return joinParts([
      withTerminalPeriod(`${authors}.`),
      withTerminalPeriod(`${year}.`),
      withTerminalPeriod(`${titleQ}`),
      withTerminalPeriod(`${venue}${editors}${pages}.`),
      withTerminalPeriod(placePub),
      doiOrUrl(e)
    ]);
  }

  if (e.type === "phdthesis" || e.type === "mastersthesis" || e.type === "thesis") {
    const kind = e.type === "phdthesis" ? "PhD thesis" : (e.type === "mastersthesis" ? "Master’s thesis" : "Thesis");
    const inst = e.school || e.institution;
    return joinParts([
      withTerminalPeriod(`${authors}.`),
      withTerminalPeriod(`${year}.`),
      withTerminalPeriod(`${titleQ}`),
      withTerminalPeriod(`${kind}, ${inst}.`),
      doiOrUrl(e)
    ]);
  }

  // Fallback for techreport, misc, etc.
  const host = e.journal || e.booktitle || e.publisher || e.institution || "";
  return joinParts([
    withTerminalPeriod(`${authors}.`),
    withTerminalPeriod(`${year}.`),
    withTerminalPeriod(`${titleQ}`),
    withTerminalPeriod(host ? `${em(host)}.` : ""),
    doiOrUrl(e)
  ]);
}

function renderPubs(items) {
  const root = document.getElementById("pubs-root");
  if (!items.length) { root.innerHTML = "<p>No publications found.</p>"; return; }

  // Sort by year desc then title
  items.sort((a,b) => (parseInt(b.year||0) - parseInt(a.year||0)) || a.title.localeCompare(b.title));

  // Group by year
  const byYear = {};
  for (const it of items) (byYear[it.year || "In press"] ||= []).push(it);
  const years = Object.keys(byYear).sort((a,b) => (b === "In press" ? -1 : parseInt(b) - parseInt(a)));

  const html = years.map(y => {
    const lis = byYear[y].map(e => `<li>${chicagoEntry(e)}</li>`).join("");
    return `<h3>${y}</h3><ol>${lis}</ol>`;
  }).join("");

  root.innerHTML = html;
}

// Load and render
fetch(BIB_URL)
  .then(r => r.ok ? r.text() : Promise.reject(r.status))
  .then(txt => renderPubs(parseBibtex(txt)))
  .catch(err => {
    console.error(err);
    document.getElementById("pubs-root").innerHTML = "<p>Failed to load publications.</p>";
  });
