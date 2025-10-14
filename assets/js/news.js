// Edit your items
const newsItems = [
  {
    src: "/images/EMA_Keynote.jpg",
    date: "22 Sep 2025",
    caption:'Dr Hoque is giving a keynote at <a href="https://sites.google.com/view/ema4miccai2025" target="_blank" rel="noopener">EMA4MICCAI 2025</a>',
    href: null
  },
  { src: "/images/Oral_Chairing.jpeg", date: "1 Aug 2025",  caption: "Dr Hoque is serving as co-chair of an oral session at", href: null },
  { src: "/images/EMA_Keynote.jpg", date: "22 Jul 2025", caption: "Dr Hoque is serving as co-chair of an oral session at", href: null },
  { src: "/images/EMA_Keynote.jpg", date: "22 Jul 2025", caption: "Dr Hoque is serving as co-chair of an oral session at", href: null },
  { src: "/images/EMA_Keynote.jpg", date: "10 Jun 2025", caption: "Dr Hoque is serving as co-chair of an oral session at", href: null }
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
        <div class="news-caption" style="text-align:center;font-size:16px;line-height:1.35;"></div>
      </div>
    </div>
  `;
}

function render() {
  const slice = newsItems.slice(start, start + pageSize);
  grid.innerHTML = slice.map(cardHTML).join("");
  grid.querySelectorAll(".news-caption").forEach((node, i) => {
    node.innerHTML = slice[i].caption; // keeps links clickable
  });
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
