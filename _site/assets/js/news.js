/* ===== config ===== */
const VISIBLE = 4;               // show 4 items
const STEP = 1;                  // slide by 1 item
const AUTO_ADVANCE_MS = 4000;    // change every 4s
const AUTOPLAY = true;
/* ================== */

/* Edit your items */
const newsItems = [
  {
    src: "/images/EMA_Keynote.jpg", date: "23 Sep 2025",
    caption: 'Dr Hoque is giving a keynote at <a href="https://sites.google.com/view/ema4miccai2025" target="_blank" rel="noopener">EMA4MICCAI 2025</a>',
    href: null
  },
  {
    src: "/images/Oral_Chairing.jpeg", date: "26 Sep 2025",
    caption: 'Dr Hoque is serving as co-chair of an oral session at <a href="https://conferences.miccai.org/2025/en/" target="_blank" rel="noopener">MICCAI 2025</a>',
    href: null
  },
  {
    src: "/images/SurgVU.png", date: "27 Sep 2025",
    caption: 'We won ($2500) runner-up & best report in MICCAI <a href="https://surgvu25.grand-challenge.org/" target="_blank" rel="noopener">SurgVU VQA</a> .',
    href: null
  },
  {
    src: "/images/keynote_meta.jpg", date: "14 May 2025",
    caption: "Dr Hoque is giving a keynote at <a href='https://www.linkedin.com/posts/giswqs_ai-opensource-activity-7328503910183104513-QfOn/' target='_blank' rel='noopener'>Meta Open Source AI Summit 2025</a>",
    href: null
  },
  {
    src: "/images/SDS_summer_school.jpeg", date: "9 Jun 2025",
    caption: "Invited lecture at <a href='https://www.edu4sds.org/' target='_blank' rel='noopener'>Surgical Data Science Summer School 2025</a>",
    href: null
  },
  {
    src: "/images/panel_discussion.jpg", date: "14 May 2025",
    caption: "Panel discussion at <a href='https://www.linkedin.com/posts/giswqs_ai-opensource-activity-7328503910183104513-QfOn/' target='_blank' rel='noopener'>Meta Open Source AI Summit 2025</a>",
    href: null
  }
];

let start = 0;        // index of the first visible item
let timerId = null;

const grid    = document.getElementById("news-grid");
const prevBtn = document.getElementById("news-prev");
const nextBtn = document.getElementById("news-next");
const wrap    = document.getElementById("news-wrap");

function plainText(html){
  const el = document.createElement("div");
  el.innerHTML = html;
  return (el.textContent || el.innerText || "").trim();
}

function itemAt(i){
  const n = newsItems.length;
  return newsItems[((start + i) % n + n) % n];  // safe modulo
}

function cardHTML(item) {
  const photoLink = item.href || item.src;
  const alt = plainText(item.caption).replace(/"/g, "&quot;");
  return `
    <div style="display:block;background:#fff;border:1px solid #e5e5e5;border-radius:10px;overflow:hidden;color:#222;">
      <a href="${photoLink}" aria-label="Open image" style="display:block;text-decoration:none;">
        <img src="${item.src}" alt="${alt}" style="width:100%;height:160px;object-fit:cover;display:block;">
      </a>
      <div style="padding:10px 12px 12px 12px;">
        <div style="text-align:center;color:#666;font-size:14px;margin:2px 0 8px 0;">${item.date}</div>
        <div class="news-caption" style="text-align:center;font-size:13px;line-height:1.35;"></div>
      </div>
    </div>
  `;
}

function render() {
  // build the window of VISIBLE items starting at current start
  const windowItems = Array.from({length: Math.min(VISIBLE, newsItems.length)}, (_, i) => itemAt(i));
  grid.innerHTML = windowItems.map(cardHTML).join("");

  // inject caption HTML so links stay clickable
  grid.querySelectorAll(".news-caption").forEach((node, i) => {
    node.innerHTML = windowItems[i].caption;
  });

  // carousel loops, so buttons stay enabled
  prevBtn.disabled = false;
  nextBtn.disabled = false;
  prevBtn.style.opacity = "1";
  nextBtn.style.opacity = "1";
}

function nextStep() {
  if (newsItems.length === 0) return;
  start = (start + STEP) % newsItems.length;
  render();
}

function prevStep() {
  if (newsItems.length === 0) return;
  start = (start - STEP) % newsItems.length;
  if (start < 0) start += newsItems.length;
  render();
}

function startAutoplay() {
  if (!AUTOPLAY || timerId || newsItems.length <= VISIBLE) return;
  timerId = setInterval(nextStep, AUTO_ADVANCE_MS);
}

function stopAutoplay() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
}

/* controls */
prevBtn.addEventListener("click", () => { stopAutoplay(); prevStep(); startAutoplay(); });
nextBtn.addEventListener("click", () => { stopAutoplay(); nextStep(); startAutoplay(); });

document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft")  { stopAutoplay(); prevStep(); startAutoplay(); }
  if (e.key === "ArrowRight") { stopAutoplay(); nextStep(); startAutoplay(); }
});

/* pause on hover */
if (wrap) {
  wrap.addEventListener("mouseenter", stopAutoplay);
  wrap.addEventListener("mouseleave", startAutoplay);
}

/* pause when tab hidden */
document.addEventListener("visibilitychange", () => {
  if (document.hidden) stopAutoplay();
  else startAutoplay();
});

/* init */
render();
startAutoplay();