/* ===== config ===== */
const VISIBLE = 4;               // show 4 items
const STEP = 1;                  // slide by 1 item
const AUTO_ADVANCE_MS = 10000;    // change every 4s
const AUTOPLAY = true;
/* ================== */

/* Edit your items */
const newsItems = [
  { src: "/images/chairing.jpeg",      date: "24 Jan 2026",
    caption: 'Dr Hoque is chairing a AAAI 2026 main track session, Singapore', href: null },
  { src: "/images/team_presenting_aaai.jpeg",      date: "22 Jan 2026",
    caption: 'Our group is presenting at AAAI 2026, Singapore', href: null },
  { src: "/images/iids_uom.jpeg",      date: "17 Dec 2025",
    caption: 'Dr Hoque is giving a talk at IIDS Open Meeting, UoM', href: null },
  { src: "/images/EMA_Keynote.jpg",      date: "23 Sep 2025",
    caption: 'Dr Hoque is giving a keynote at <a href="https://sites.google.com/view/ema4miccai2025" target="_blank" rel="noopener">EMA4MICCAI 2025</a>', href: null },
  { src: "/images/Oral_Chairing.jpeg",   date: "26 Sep 2025",
    caption: 'Dr Hoque is serving as co-chair of an oral session at <a href="https://conferences.miccai.org/2025/en/" target="_blank" rel="noopener">MICCAI 2025</a>', href: null },
  { src: "/images/SurgVU.png",           date: "27 Sep 2025",
    caption: 'Won ($2500) runner-up & best report in MICCAI <a href="https://surgvu25.grand-challenge.org/" target="_blank" rel="noopener">SurgVU VQA</a>.', href: null },
  { src: "/images/UNSURE.jpeg",           date: "27 Sep 2025",
    caption: 'Organisation and panel discussion at <a href="https://unsuremiccai.github.io/" target="_blank" rel="noopener">MICCAI UNSURE 2025</a>.', href: null },
  { src: "/images/keynote_meta.jpg",     date: "14 May 2025",
    caption: "Dr Hoque is giving a keynote at <a href='https://www.linkedin.com/posts/giswqs_ai-opensource-activity-7328503910183104513-QfOn/' target='_blank' rel='noopener'>Meta Open Source AI Summit 2025</a>", href: null },
  { src: "/images/SDS_summer_school.jpeg", date: "9 Jun 2025",
    caption: "Invited lecture at <a href='https://www.edu4sds.org/' target='_blank' rel='noopener'>Surgical Data Science Summer School 2025</a>", href: null },
  { src: "/images/panel_discussion.jpg", date: "14 May 2025",
    caption: "Panel discussion at <a href='https://www.linkedin.com/posts/giswqs_ai-opensource-activity-7328503910183104513-QfOn/' target='_blank' rel='noopener'>Meta Open Source AI Summit 2025</a>", href: null },
  { src: "/images/brats2024.jpeg", date: "06 Oct 2024",
    caption: "Collab. team with LabREN runner-up at <a href='https://www.synapse.org/Synapse:syn53708249/wiki/626323' target='_blank' rel='noopener'> BRATS2024 challenge</a>", href: null }
];

let start = 0;            // index of first visible item in the grid
let timerId = null;
let modalIndex = 0;       // index of the item shown in the modal

const grid    = document.getElementById("news-grid");
const prevBtn = document.getElementById("news-prev");
const nextBtn = document.getElementById("news-next");
const wrap    = document.getElementById("news-wrap");

/* ---------- helpers ---------- */
function plainText(html){
  const el = document.createElement("div");
  el.innerHTML = html;
  return (el.textContent || el.innerText || "").trim();
}
function itemAt(i){
  const n = newsItems.length;
  return newsItems[((start + i) % n + n) % n];
}

/* ---------- modal/lightbox ---------- */
const modal = document.createElement("div");
modal.id = "news-modal";
modal.setAttribute("aria-hidden", "true");
modal.style = "position:fixed;inset:0;background:rgba(0,0,0,0.65);display:none;align-items:center;justify-content:center;z-index:9999;padding:20px;";
modal.innerHTML = `
  <div id="news-modal-content" role="dialog" aria-modal="true"
       style="background:#fff;border-radius:10px;max-width:900px;width:min(92vw,900px);max-height:90vh;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.35);">
    <button id="news-modal-close" aria-label="Close"
            style="position:absolute;top:12px;right:16px;font-size:22px;border:1px solid #ddd;border-radius:18px;width:32px;height:32px;background:#fff;cursor:pointer;">×</button>
    <div style="width:100%;flex:1 1 auto;display:flex;align-items:center;justify-content:center;background:#000;">
      <img id="news-modal-img" alt="" style="max-width:100%;max-height:80vh;object-fit:contain;display:block;">
    </div>
    <div id="news-modal-meta" style="padding:12px 14px 16px 14px;">
      <div id="news-modal-date" style="text-align:center;color:#666;font-size:14px;margin:0 0 8px 0;"></div>
      <div id="news-modal-caption" style="text-align:center;font-size:16px;line-height:1.4;"></div>
    </div>
    <button id="news-modal-prev" aria-label="Previous"
            style="position:absolute;left:16px;top:50%;transform:translateY(-50%);width:36px;height:36px;border:1px solid #ddd;border-radius:50%;background:#fff;cursor:pointer;">‹</button>
    <button id="news-modal-next" aria-label="Next"
            style="position:absolute;right:16px;top:50%;transform:translateY(-50%);width:36px;height:36px;border:1px solid #ddd;border-radius:50%;background:#fff;cursor:pointer;">›</button>
  </div>
`;
document.body.appendChild(modal);

const modalImg      = document.getElementById("news-modal-img");
const modalDate     = document.getElementById("news-modal-date");
const modalCaption  = document.getElementById("news-modal-caption");
const modalClose    = document.getElementById("news-modal-close");
const modalPrev     = document.getElementById("news-modal-prev");
const modalNext     = document.getElementById("news-modal-next");
const modalContent  = document.getElementById("news-modal-content");

function openModalByIndex(globalIndex){
  modalIndex = globalIndex;
  const item = newsItems[modalIndex];
  modalImg.src = item.src;
  modalImg.alt = plainText(item.caption);
  modalDate.textContent = item.date;
  modalCaption.innerHTML = item.caption; // keep links in caption clickable
  modal.style.display = "flex";
  modal.setAttribute("aria-hidden", "false");
  stopAutoplay();
  document.body.style.overflow = "hidden";
}
function closeModal(){
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modalImg.src = "";
  document.body.style.overflow = "";
  startAutoplay();
}
function modalNextItem(){
  modalIndex = (modalIndex + 1) % newsItems.length;
  openModalByIndex(modalIndex);
}
function modalPrevItem(){
  modalIndex = (modalIndex - 1 + newsItems.length) % newsItems.length;
  openModalByIndex(modalIndex);
}

/* close and nav handlers */
modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", e => { if (!modalContent.contains(e.target)) closeModal(); });
modalNext.addEventListener("click", e => { e.stopPropagation(); modalNextItem(); });
modalPrev.addEventListener("click", e => { e.stopPropagation(); modalPrevItem(); });

/* ---------- cards/grid ---------- */
function cardHTML(item, globalIndex) {
  const alt = plainText(item.caption).replace(/"/g, "&quot;");
  // Image uses a button to open modal. Caption retains HTML links.
  return `
    <div style="display:block;background:#fff;border:1px solid #e5e5e5;border-radius:10px;overflow:hidden;color:#222;">
      <button data-modal-index="${globalIndex}" aria-label="Open image"
              style="display:block;padding:0;border:0;background:none;cursor:pointer;width:100%;">
        <img src="${item.src}" alt="${alt}" style="width:100%;height:160px;object-fit:cover;display:block;">
      </button>
      <div style="padding:10px 12px 12px 12px;">
        <div style="text-align:center;color:#666;font-size:14px;margin:2px 0 8px 0;">${item.date}</div>
        <div class="news-caption" style="text-align:center;font-size:13px;line-height:1.35;"></div>
      </div>
    </div>
  `;
}

function render() {
  const n = newsItems.length;
  const count = Math.min(VISIBLE, n);
  const windowItems = Array.from({length: count}, (_, i) => itemAt(i));
  // We need each card to know its global index in newsItems for modal nav
  const globalIndices = Array.from({length: count}, (_, i) => (start + i) % n);

  grid.innerHTML = windowItems.map((it, i) => cardHTML(it, globalIndices[i])).join("");

  // captions
  grid.querySelectorAll(".news-caption").forEach((node, i) => {
    node.innerHTML = windowItems[i].caption;
  });

  // wire modal openers
  grid.querySelectorAll("button[data-modal-index]").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.getAttribute("data-modal-index"), 10);
      openModalByIndex(idx);
    });
  });

  // carousel loops, keep buttons enabled
  prevBtn.disabled = false;
  nextBtn.disabled = false;
  prevBtn.style.opacity = "1";
  nextBtn.style.opacity = "1";
}

/* ---------- carousel step-by-step ---------- */
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
  if (timerId) { clearInterval(timerId); timerId = null; }
}

/* controls */
prevBtn.addEventListener("click", () => { stopAutoplay(); prevStep(); startAutoplay(); });
nextBtn.addEventListener("click", () => { stopAutoplay(); nextStep(); startAutoplay(); });

document.addEventListener("keydown", e => {
  if (modal.style.display === "flex") {
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowLeft")  modalPrevItem();
    if (e.key === "ArrowRight") modalNextItem();
  } else {
    if (e.key === "ArrowLeft")  { stopAutoplay(); prevStep(); startAutoplay(); }
    if (e.key === "ArrowRight") { stopAutoplay(); nextStep(); startAutoplay(); }
  }
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
