
// Edit your items
const newsItems = [
  {
    src: "/images/EMA_Keynote.jpg", date: "23 Sep 2025",
    caption: 'Dr Hoque is giving a keynote at <a href="https://sites.google.com/view/ema4miccai2025" target="_blank" rel="noopener">EMA4MICCAI 2025</a>',
    href: null   
  },
  { 
    src: "/images/Oral_Chairing.jpeg", date: "26 Sep 2025",  
  caption: 'Dr Hoque is serving as co-chair of an oral session at <a href="https://conferences.miccai.org/2025/en/" target="_blank" rel="noopener">MICCAI 2025</a>', 
  href: null },
  { 
  src: "/images/SurgVU.png", date: "27 Sep 2025", 
  caption: 'UoM-SurgicalAI won (&#36;2000) runner-up and best report in the 2025 MICCAI <a href="https://surgvu25.grand-challenge.org/" target="_blank" rel="noopener">SurgVU VLM VQA Challenge</a> .',  
  href: null },
  { 
  src: "/images/keynote_meta.jpg", date: "14 May 2025", 
  caption: "Dr Hoque is giving a keynote at <a href='https://www.linkedin.com/posts/giswqs_ai-opensource-activity-7328503910183104513-QfOn/' target='_blank' rel='noopener'>Meta's Open Source AI Summit 2025</a>",     
  href: null },
  { src: "/images/panel_meat.jpg", date: "14 May 2025", caption: "Panel Discussion at <a href='https://www.linkedin.com/posts/giswqs_ai-opensource-activity-7328503910183104513-QfOn/' target='_blank' rel='noopener'>Meta's Open Source AI Summit 2025</a>", href: null }
];

const pageSize = 4;
let start = 0;

const grid = document.getElementById("news-grid");
const prevBtn = document.getElementById("news-prev");
const nextBtn = document.getElementById("news-next");

function plainText(html){
  const el = document.createElement('div');
  el.innerHTML = html;
  return (el.textContent || el.innerText || '').trim();
}

function cardHTML(item) {
  const photoLink = item.href || item.src; // image click target
  const alt = plainText(item.caption).replace(/"/g, '&quot;');
  return `
    <div style="display:block;background:#fff;border:1px solid #e5e5e5;border-radius:10px;overflow:hidden;color:#222;">
      <a href="${photoLink}" target="_blank" rel="noopener" aria-label="Open image"
          style="display:block;text-decoration:none;">
        <img src="${item.src}" alt="${alt}"
              style="width:100%;height:160px;object-fit:cover;display:block;">
      </a>
      <div style="padding:10px 12px 12px 12px;">
        <div style="text-align:center;color:#666;font-size:14px;margin:2px 0 8px 0;">${item.date}</div>
        <div class="news-caption" style="text-align:center;font-size:13px;line-height:1.35;"></div>
      </div>
    </div>
  `;
}

function render() {
  const slice = newsItems.slice(start, start + pageSize);
  grid.innerHTML = slice.map(cardHTML).join("");

  // inject caption HTML so links in captions are clickable
  const nodes = grid.querySelectorAll(".news-caption");
  nodes.forEach((node, i) => { node.innerHTML = slice[i].caption; });

  prevBtn.disabled = start === 0;
  nextBtn.disabled = start + pageSize >= newsItems.length;
  prevBtn.style.opacity = prevBtn.disabled ? "0.4" : "1";
  nextBtn.style.opacity = nextBtn.disabled ? "0.4" : "1";
}

prevBtn.addEventListener("click", () => {
  if (start > 0) { start = Math.max(0, start - pageSize); render(); }
});
nextBtn.addEventListener("click", () => {
  if (start + pageSize < newsItems.length) { start = start + pageSize; render(); }
});

document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") prevBtn.click();
  if (e.key === "ArrowRight") nextBtn.click();
});

render();

