// Edit your slides here. Use absolute paths starting with / so they work on all pages.
const slides = [
  {src: "/images/team_aaai2026.jpeg", caption: "Team is having fun at AAAI 2026, Singapore!",link: null},
  {src: "/images/team_ucl.jpeg", caption: "An usual team discussion!",link: null},
  { src: "/images/team_ucl2.jpeg", caption: "Time to celebrate!",  link: null },
  { src: "/images/sos_ucl.jpeg", caption: "'Science of Surgery 2025' Demo at UCL",  link: null },
  // { src: "/images/img4.png", caption: "Research visit to FAU",                link: null },
  // { src: "/images/img5.png", caption: "Students demo our prototype to clinicians", link: null }
];

const elImg     = document.getElementById("slide-img");
const elLink    = document.getElementById("slide-link");
const elCap     = document.getElementById("slide-caption");
const elPrev    = document.getElementById("slide-prev");
const elNext    = document.getElementById("slide-next");
const elDots    = document.getElementById("slide-dots");
const elWrap    = document.getElementById("hero-slider");

let i = 0;
let timer = null;
const intervalMs = 4000;

// helpers
function plainText(html){
  const d = document.createElement("div");
  d.innerHTML = html;
  return (d.textContent || d.innerText || "").trim();
}

function renderDots(){
  elDots.innerHTML = slides.map((_, idx) =>
    `<button data-idx="${idx}" aria-label="Go to slide ${idx+1}"
      style="width:10px;height:10px;margin:0 4px;border-radius:50%;border:1px solid #bbb;background:#eee;cursor:pointer;"></button>`
  ).join("");
}

function setActiveDot(){
  [...elDots.children].forEach((b, idx) => {
    b.style.background = idx === i ? "#666" : "#eee";
  });
}

function show(idx){
  i = (idx + slides.length) % slides.length;
  const s = slides[i];
  const alt = plainText(s.caption).replace(/"/g, "&quot;");

  elImg.src = s.src;
  elImg.alt = alt;

  const link = s.link ?? s.src;
  elLink.href = link;

  elCap.innerHTML = s.caption; // allows links in caption
  setActiveDot();
}

function next(){ show(i + 1); }
function prev(){ show(i - 1); }

function start(){
  stop();
  timer = setInterval(next, intervalMs);
}
function stop(){
  if (timer) { clearInterval(timer); timer = null; }
}

// init
renderDots();
show(0);
start();

// events
elNext.addEventListener("click", () => { next(); start(); });
elPrev.addEventListener("click", () => { prev(); start(); });
elWrap.addEventListener("mouseenter", stop);
elWrap.addEventListener("mouseleave", start);
document.addEventListener("keydown", e => {
  if (e.key === "ArrowRight") { next(); start(); }
  if (e.key === "ArrowLeft")  { prev(); start(); }
});
elDots.addEventListener("click", e => {
  const btn = e.target.closest("button[data-idx]");
  if (!btn) return;
  const idx = parseInt(btn.getAttribute("data-idx"), 10);
  show(idx);
  start();
});
