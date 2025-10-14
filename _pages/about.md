---
permalink: /
title: <marquee scrollamount="4"><span style="color:red">⭐New PhD Openings [Fully Funded] ✨</span></marquee>
# excerpt: "About me"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

<!-- # <marquee scrollamount="4"><span style="color:red">⭐New PhD Openings [Fully Funded] ✨</span></marquee> -->

<style>
.blink{animation:bl 1s steps(10,start) infinite}
@keyframes bl{to{visibility:hidden}}
</style>

1. MRC DTP Studentship/Scholarship (<span class="blink">Deadline: Saturday, November 08, 2025</span>): <a href="https://www.findaphd.com/phds/project/mrc-dtp-early-detection-of-prostate-cancer-progression-with-longitudinal-multimodal-llm-agents/?p187159" target="_blank" rel="noopener"> Early Detection of Prostate Cancer Progression with Longitudinal Multimodal LLM Agents</a>

2. Bicentenary Studentship/Scholarship (<span class="blink">Deadline: Saturday, November 15, 2025</span>): <a href="https://www.findaphd.com/phds/project/bicentenary-interactive-vision-language-foundation-models-for-decision-support-in-pathological-stratification-of-appendix-cancers/?p187373" target="_blank" rel="noopener"> Interactive Vision-Language Foundation Models for Decision Support in Pathological Stratification of Appendix Cancers</a>


Bio
---

Dr Mobarak Hoque is an __Associate Professor__ (Senior Lecturer) in Multimodal Agentic AI for Healthcare, at the Division of Informatics, Imaging and Data Science, [University of manchester](https://www.manchester.ac.uk/). He also currently appointed as an honorary senior research fellow positions at University College London. He holds a PhD in AI from the National University of Singapore and was a postdoctoral researcher at the Hawkes Institute at UCL, and the BioMedIA group at Imperial College London. Before his academic career, he gained extensive industry experience in real-world translation of machine learning and computer vision research as a Senior Software Engineer at Samsung R&D Institute.

His pioneering work on multimodal medical imaging AI has been widely recognised by leading international groups across academia and industry. His research focuses on developing safe, trustworthy, and adaptive multimodal large vision-language models and AI agents for medical imaging and surgical intelligence. He has published over 100 papers in top-tier peer-reviewed journals and conferences in medical imaging AI and multimodal LLM. He serves as Area Chair and Session Chair for MICCAI (2022–2025) and IPCAI (2024–2026), Senior Program Committee Member for AAAI 2026, and Organising/Programme Committee Member for several international workshops, including [MICCAI-DART (2022–2023)](https://sites.google.com/view/dart2023/home), [MICCAI-UNSURE 2025](https://unsuremiccai.github.io/), and [IROS-C4SR+ 2025](https://sites.google.com/view/iros-2025-c4sr/). He also serves on the Editorial Board of Nature Scientific Reports.


Research Interests
---
<div class="row">
    <ul>
      <li>Mulitmodal LLM Agent in Healthcare</li>
      <li>Medical Imaging AI</li>
      <li>Safe and Trusted AI</li>
      <li>Biomedical Data Science</li>
    </ul>
</div>

![MLLM Agent for Healthcare](images/MLLM_Agent_Healthcare.PNG)


Team Updates
---

<div id="news-wrap" style="max-width:1100px;margin:0 auto;position:relative;">
  <button id="news-prev" aria-label="Previous"
          style="position:absolute;left:-6px;top:45%;transform:translateY(-50%);
                 width:36px;height:36px;border:1px solid #ddd;border-radius:50%;
                 background:#fff;cursor:pointer;">‹</button>

  <button id="news-next" aria-label="Next"
          style="position:absolute;right:-6px;top:45%;transform:translateY(-50%);
                 width:36px;height:36px;border:1px solid #ddd;border-radius:50%;
                 background:#fff;cursor:pointer;">›</button>

  <div id="news-grid"
       style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;padding:12px 28px 4px 28px;">
  </div>
</div>

<script>
  // Edit your items
  const newsItems = [
    {
      src: "images/EMA_Keynote.jpg", date: "23 Sep 2025",
      caption: 'Dr Hoque is giving a keynote at <a href="https://sites.google.com/view/ema4miccai2025" target="_blank" rel="noopener">EMA4MICCAI 2025</a>',
      href: null   
    },
    { 
	    src: "images/Oral_Chairing.jpeg", date: "26 Sep 2025",  
		caption: 'Dr Hoque is serving as co-chair of an oral session at <a href="https://conferences.miccai.org/2025/en/" target="_blank" rel="noopener">MICCAI 2025</a>', 
		href: null },
    { 
		src: "images/SurgVU.png", date: "27 Sep 2025", 
		caption: 'UoM-SurgicalAI won (&#36;2000) runner-up and best report in the 2025 MICCAI <a href="https://surgvu25.grand-challenge.org/" target="_blank" rel="noopener">SurgVU VLM VQA Challenge</a> .',  
		href: null },
    { 
		src: "images/keynote_meta.jpg", date: "14 May 2025", 
		caption: "Dr Hoque is giving a keynote at <a href='https://www.linkedin.com/posts/giswqs_ai-opensource-activity-7328503910183104513-QfOn/' target='_blank' rel='noopener'>Meta's Open Source AI Summit 2025</a>",     
		href: null },
    { src: "images/panel_meat.jpg", date: "14 May 2025", caption: "Panel Discussion at <a href='https://www.linkedin.com/posts/giswqs_ai-opensource-activity-7328503910183104513-QfOn/' target='_blank' rel='noopener'>Meta's Open Source AI Summit 2025</a>", href: null }
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
</script>





<!-- <div style="display:flex; flex-wrap:wrap; gap:16px; justify-content:center;">
  <a href="/news/post-1/" style="text-decoration:none; color:inherit;">
    <figure style="width:260px; margin:0; background:#fff; border:1px solid #e5e5e5; border-radius:10px; overflow:hidden;">
      <img src="/images/img1.png" alt="MICCAI poster" loading="lazy"
           style="display:block; width:100%; height:160px; object-fit:cover;">
      <figcaption style="padding:12px; text-align:center; font-size:16px;">
        Attending MICCAI 2025 in Daejeon
      </figcaption>
    </figure>
  </a>

  <a href="/news/post-2/" style="text-decoration:none; color:inherit;">
    <figure style="width:260px; margin:0; background:#fff; border:1px solid #e5e5e5; border-radius:10px; overflow:hidden;">
      <img src="/images/img2.png" alt="Award day" loading="lazy"
           style="display:block; width:100%; height:160px; object-fit:cover;">
      <figcaption style="padding:12px; text-align:center; font-size:16px;">
        Award for Best Paper
      </figcaption>
    </figure>
  </a>

  <a href="/news/post-3/" style="text-decoration:none; color:inherit;">
    <figure style="width:260px; margin:0; background:#fff; border:1px solid #e5e5e5; border-radius:10px; overflow:hidden;">
      <img src="/images/img3.png" alt="Lab visit" loading="lazy"
           style="display:block; width:100%; height:160px; object-fit:cover;">
      <figcaption style="padding:12px; text-align:center; font-size:16px;">
        Research Visit to FAU
      </figcaption>
    </figure>
  </a>
</div> -->


News
----

<!-- <div style="height: 280px; overflow: auto;"> -->
<div style="position:relative;height:280px;overflow-y:scroll;padding:12px 16px;border:1px solid #e0e0e0;border-radius:8px;background:#fff;">
<ul>
  <li>
	[11/2024] Serving as the Senior Program Committee at AAAI 2026.
  </li>
  <li>
		[10/2025] Congratulations to the Team for being the Runner-up ($2000) in the 2025 MICCAI EndoVis SurgVU VLM VQA Challenge.
	</li>
  <li>
		[10/2025] Congratulations to the Team for Winning Best Methodology Report ($500) in the 2025 MICCAI EndoVis SurgVU Challenge.
	</li>
  <li>
		[10/2025] Chairing oral session 13: Surgical Data Science at <a href="https://conferences.miccai.org/2025/en/" target="_blank">MICCAI 2025</a>.
	</li>
  <li>
		[10/2025] Presenting 4 papers this year, including 2 early acceptances with oral and my students earning recognitions including "Young Scientist Award", a "Paper Highlight Selection", and a "Best Paper Shortlist" at <a href="https://conferences.miccai.org/2025/en/" target="_blank">MICCAI 2025</a>.
	</li>
    <li>
		[11/2024] Honored to have received the IEEE TMI Distinguished Reviewer Award for 2023-2024
	</li>
  <li>
		[10/2024] Chairing oral session 12: Surgical Data Science at <a href="https://conferences.miccai.org/2024/en/" target="_blank">MICCAI 2024</a>.
	</li>
  <li>
		[10/2024] Congratulations to the Team for being the Runner-up in the 2024 MICCAI BraTS SSA Segmentation Challenge.
	</li> 
  <li>
		[10/2024] Presenting 4 main conference papers this year, including 2 early acceptances and 1 invited oral presentation at <a href="https://conferences.miccai.org/2024/en/" target="_blank">MICCAI 2024</a>.
	</li> 
	<li>
		[10/2023] Chairing oral session 8 at <a href="https://conferences.miccai.org/2023/en/" target="_blank">MICCAI 2023</a>.
	</li>
	<li>
		[10/2023] Presenting 7 papers at <a href="https://conferences.miccai.org/2023/en/" target="_blank">MICCAI 2023</a> where 5 in main conference (1 orals, 4 posters) and 2 workshop.
	</li>	
	<li>
		[06/2023] 5 papers on image-guided diagnosis and intervention have been accepted at <a href="https://conferences.miccai.org/2023/en/" target="_blank">MICCAI 2023</a>, including an early acceptance.
	</li> 
	<li>
		[06/2023] A paper on one-to-many sysnthesis got acceptance at at <a href="https://ieee-iros.org/" target="_blank">IROS 2023</a>.
	</li>
	<li>
		[06/2023] Serving as a Area Chair at <a href="https://conferences.miccai.org/2023/en/" target="_blank">MICCAI2023</a>.
	</li>
	<li>
		[05/2023] Presenting two papers at <a href="https://www.icra2023.org/" target="_blank">ICRA2023</a>.
	</li> 
	<li>
		[05/2023] Giving a seminar talk at  <a href="https://talks.ox.ac.uk/talks/id/af798453-a86e-49a9-b264-f84884d16d89/" target="_blank">OxfordXML</a>.
	</li> 
	<li>
		[03/2023] Giving a talk at  <a href="https://events.marketsandmarkets.com/digital-pathology-conference/#day2" target="_blank">Next-Gen Digital Pathology Conference</a>.
	</li> 
	<li>
		[02/2023] A paper got acceptance at  <a href="https://www.springer.com/journal/11548" target="_blank">IJCARS (International Journal of Computer Assisted Radiology and Surgery)</a>.
	</li> 
	<li>
		[01/2023] Two papers got acceptance at  <a href="https://www.icra2023.org/" target="_blank">ICRA2023</a>.
	</li>
	<li>
		[12/2022] Chairing <a href="https://github.com/RISE-MICCAI/AI-in-Medical-Imaging-Winter-2022-School" target="_blank">AI in Medical Imaging Winter School - 2022</a>  belong to <a href="http://www.miccai.org/about-miccai/rise-miccai/" target="_blank">RISE-MICCAI</a>.
	</li>
	<li>
		[12/2022] A paper got acceptance at  <a href="https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=8856" target="_blank">IEEE Transactions on Automation Science and Engineering (IEEE T-ASE)</a>.
	</li> 
	<li>
		[09/2022] A paper got acceptance at ECCV2022 <a href="https://mcv-workshop.github.io/" target="_blank">Medical Computer Vision Workshop</a>.
	</li>
	<li>
		[09/2022] Presenting 4 papers at <a href="https://conferences.miccai.org/2022/" target="_blank">MICCAI 2022</a>.
	</li>
	<li>
		[09/2022] Meta-reviewing and Charing <a href="https://sites.google.com/view/dart2022" target="_blank">MICCAI DART 2002 Workshop</a> and 
		<a href="https://link.springer.com/book/10.1007/978-3-031-16852-9" target="_blank">MICCAI DART 2002 Proceedings</a>
	</li>	
	<li>
		[08/2022] Started new role as senior research fellow at <a href="https://www.ucl.ac.uk/interventional-surgical-sciences/wellcome-epsrc-centre-interventional-and-surgical-sciences-weiss" target="_blank">WEISS </a>, University College London, UK.
	</li>	
	<li>
		[07/2022] A paper got acceptance at ACM Multimedia 2022 <a href="https://2022.acmmm.org/" target="_blank">Medical Computer Vision Workshop</a>.
	</li>
	<li>
		[06/2022] 4 papers got acceptance at <a href="https://conferences.miccai.org/2022" target="_blank">MICCAI 2022</a>.
	</li>
	<li>
		[01/2022] A paper on 'Global-Reasoned Multi-Task Learning' is accepted in both RA-L and  <a href="https://www.icra2022.org/" target="_blank">IEEE ICRA & RA-L 2022</a>. 
	</li>
	<li>
		[07/2021] Presenting our paper <a href="http://www.gatsby.ucl.ac.uk/~balaji/udl2021/accepted-papers/UDL2021-paper-040.pdf" target="_blank">Class-Distribution-Aware LS TS </a>  
		in ICML UDL 2021 workshop.
	</li>
	<li>
		[06/2021] A paper on <a href="https://arxiv.org/pdf/2107.11091.pdf" target="_blank">Class-Incremental Domain Adaptation for Surgical Report Generation </a> 
		has been accepted in MICCAI 2021 </a>.
	</li>
	<li>
		[03/2021] A paper on Glioblastoma Multiforme Prognosis has accepted in <a href="https://www.journals.elsevier.com/computerized-medical-imaging-and-graphics" 
		target="_blank">Computerized Medical Imaging and Graphics </a>.
	</li>
	<li>
		[02/2021] A paper on Model Calibration for Surgical Report Generation has accepted in <a href="http://icrax2021.org/" target="_blank">ICRA 2021 </a>.
	</li>
	<li>
		[02/2021] A paper on Capturing Uncertainty in Medical Image Segmentation has accepted in <a href="http://ipmi2021.org/" target="_blank">IPMI 2021 </a>.
	</li>
	<li>
		[10/2020] Presenting my paper at <a href="https://www.miccai2020.org/en/" target="_blank">MICCAI 2020 </a>.
	</li>
	<li>
		[06/2020] Paper on <a href="https://arxiv.org/abs/2007.03357" target="_blank">Graph Structure Representation in Robotic Surgery</a>  is accepted in MICCAI 2020.
	</li>
	<li>
		[06/2020] Presenting my paper at <a href="http://icrax2020.org/" target="_blank">ICRA2020 </a>.
	</li>
	<li>
		[05/2020] Paper on "Spatio-temporal MTL model of predicting saliency while tracking surgical instrument" is accepted in the journal of 
		<a href="https://www.journals.elsevier.com/medical-image-analysis" target="_blank">Medical Image Analysis</a> .
	</li>
	<li>
		[02/2020] Started my postdoc journey in <a href="https://biomedia.doc.ic.ac.uk/" target="_blank">BioMedIA </a> at Imperial College London, UK.
	</li>
	<li>
		[01/2020] Paper on <a href="https://arxiv.org/abs/2003.04769/" target="_blank">Attention Pruned Multitask Learning Model</a>
            is accepted in <a href="https://www.icra2020.org/" target="_blank">ICRA 2020</a>.
	</li>
	<li>
		[10/2019] Oral presentation of our <a href="https://link.springer.com/chapter/10.1007/978-3-030-32254-0_46/" target="_blank">paper</a> at
            <a href="https://www.miccai2019.org/" target="_blank">MICCAI 2019</a>.
	</li>
	<li>
		[06/2019] Paper on <a href="https://link.springer.com/chapter/10.1007/978-3-030-32254-0_46/" target="_blank">MTL model of saliency and segmentation</a>
            is accepted in MICCAI 2019.
	</li>
	<li>
		[06/2019] Paper on <a href="https://ieeexplore.ieee.org/abstract/document/8648150/" target="_blank">Surgical Instrument Segmentation</a> is accepted in
            <a href="https://www.ieee-ras.org/publications/ra-l" target="_blank">IEEE RA-L</a>.
	</li>
</ul>
  <!-- subtle bottom fade to signal more content -->
  <div style="position:sticky;bottom:0;height:28px;background:linear-gradient(to bottom, rgba(255,255,255,0), #fff 70%);pointer-events:none;"></div>

  <!-- small sticky hint -->
  <div style="position:sticky;bottom:2px;text-align:center;font:500 12px/1.2 system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;color:#666;pointer-events:none;">
    Scroll for more
  </div>
</div>

Awards and honours
------------------
- 2025: Runner-up ($2000) in the 2025 MICCAI EndoVis SurgVU VLM VQA Challenge
- 2025: Best Methodology Report ($500) in the 2025 MICCAI EndoVis SurgVU Challenge.
- 2025: Best Paper shortlist at the MICCAI 2025
- 2024: Excellence in Interventional and Surgical Science Award. UCL, UK.
- 2024: IEEE TMI Distinguished Reviewer Award, IEEE.
- 2024: Runner-up in the 2024 MICCAI BraTs SSA Segmentation Challenge.
- 2024: MedICSS 2024 Best Project Award. UCL, London, UK.
- 2023: RAS Travel Grant. ICRA 2023.
- 2022: Turing Postdoc Enrichment Award. Alan Turing Institute, UK.
- 2018: AUAPAF Stipend. Asian Universities Alliance Postgraduate Academic Forum, Asia.
- 2015: ISEP PhD Scholarship. ISEP, National University of Singapore, Singapore.

Contact
-------

- Email: mobarak dot hoque at manchester dot ac dot uk
- Address: Stopford Building, Oxford Road, Manchester, M13 9PT 
