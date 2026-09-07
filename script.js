const projects = [
  {
    id: "01",
    title: "Multi-Agent AI Data Analyst",
    description: "Full-stack data analytics platform for CSV analysis, visualization and AI-generated insights, with ML workflows and automated PDF reporting.",
    tech: ["Python", "FastAPI", "React", "Plotly", "Gemini"],
    categories: ["AI", "Data Analytics"],
    featured: true,
    github: "https://github.com/kavyyyaaa/Multi-Agent-AI-Data-Analyst",
    demo: null,
    caseStudy: true
  },
  {
    id: "02",
    title: "ForgePredict AI",
    description: "F1-inspired predictive maintenance platform for industrial assets with real-time telemetry, failure prediction and Remaining Useful Life estimation.",
    tech: ["Python", "XGBoost", "Dash", "Plotly", "Scikit-learn"],
    categories: ["Machine Learning", "Predictive Maintenance"],
    featured: true,
    github: "https://github.com/kavyyyaaa/ForgePredict-AI",
    demo: null,
    caseStudy: true
  },
  {
    id: "03",
    title: "MarketMind",
    description: "Stock forecasting and risk analytics platform combining machine learning forecasts, technical indicators and interactive dashboards.",
    tech: ["Python", "Prophet", "XGBoost", "Flask", "Plotly"],
    categories: ["Machine Learning", "Data Analytics"],
    featured: true,
    github: "https://github.com/kavyyyaaa/Marketmind",
    demo: null,
    caseStudy: true
  },
  {
    id: "04",
    title: "VisionSearch",
    description: "AI-powered visual product search engine using image embeddings and similarity search to find visually similar products.",
    tech: ["Python", "ResNet-50", "FAISS", "OpenCV", "Flask"],
    categories: ["Computer Vision", "AI"],
    featured: true,
    github: "https://github.com/kavyyyaaa/VisionSearch",
    demo: null,
    caseStudy: true
  },
  {
    id: "05",
    title: "DRI Kiln Thermal Analytics",
    description: "Industrial thermal analytics work focused on kiln temperature data, monitoring and predictive-maintenance workflows.",
    tech: ["Python", "LSTM", "Plotly", "Scikit-learn"],
    categories: ["Predictive Maintenance", "Machine Learning"],
    featured: false,
    github: "https://github.com/kavyyyaaa/DRI-Kiln-Thermal-Analytics",
    demo: null
  },
  {
    id: "06",
    title: "AI-Based Logo Detection & Obfuscation",
    description: "Computer-vision research work around brand/logo detection and obfuscation in videos.",
    tech: ["Computer Vision", "Deep Learning"],
    categories: ["Computer Vision", "AI"],
    featured: false,
    github: "https://github.com/kavyyyaaa/logo_detection_obfuscation",
    demo: null
  },
  {
    id: "07",
    title: "AI Research Assistant",
    description: "RAG-based PDF question-answering assistant using Google Gemini, LangChain and FAISS for document-grounded answers.",
    tech: ["Python", "Gemini", "LangChain", "FAISS"],
    categories: ["AI"],
    featured: false,
    github: "https://github.com/kavyyyaaa/AI-Research-Assistant",
    demo: null
  },
  {
    id: "08",
    title: "Customer Segmentation Project",
    description: "Customer analytics project focused on segmenting customers into meaningful groups for data-driven business insights.",
    tech: ["Python", "Pandas", "Scikit-learn"],
    categories: ["Data Analytics", "Machine Learning"],
    featured: false,
    github: "https://github.com/kavyyyaaa/Customer-Segmentation-Project",
    demo: null
  }
  // FUTURE PROJECTS: add another object here. Keep featured:false for additional work.
];

const featuredEl = document.getElementById("featured-projects");
const allEl = document.getElementById("all-projects");
const filtersEl = document.getElementById("filters");

function linkHTML(p) {
  const demo = p.demo ? `<a href="${p.demo}" target="_blank" rel="noreferrer">Live demo ↗</a>` : "";
  const caseStudy = p.caseStudy ? `<a href="project.html?id=${p.id}" >Case study ↗</a>` : "";
  return `<div class="project-links"><a href="${p.github}" target="_blank" rel="noreferrer">GitHub ↗</a>${caseStudy}${demo}</div>`;
}

function featuredCard(p) {
  return `
    <article class="project-card reveal">
      <div class="project-top"><span class="project-number">${p.id} / 04</span><span class="project-type">${p.categories[0]}</span></div>
      <div>
        <h3>${p.title}</h3>
        <p>${p.description}</p>
      </div>
      <div class="project-bottom">
        <div class="tech-list">${p.tech.map(t => `<span>${t}</span>`).join("")}</div>
        ${linkHTML(p)}
      </div>
    </article>`;
}

function miniCard(p) {
  return `
    <article class="mini-project reveal">
      <span class="project-number">${p.id}</span>
      <h4>${p.title}</h4>
      <p>${p.description}</p>
      <div class="tech-list">${p.tech.slice(0,4).map(t => `<span>${t}</span>`).join("")}</div>
      <div class="project-links" style="margin-top:12px">${linkHTML(p)}</div>
    </article>`;
}

function renderFeatured() {
  featuredEl.innerHTML = projects.filter(p => p.featured).map(featuredCard).join("");
}

function renderFilters() {
  // Keep the lower section focused on repositories not already shown above.
  // This prevents duplicate project cards while still showing every repository once.
  const moreProjects = projects.filter(p => !p.featured);
  const cats = ["All", ...new Set(moreProjects.flatMap(p => p.categories))];
  filtersEl.innerHTML = cats.map((c, i) => `<button class="filter ${i===0 ? "active":""}" data-filter="${c}">${c}</button>`).join("");
  filtersEl.querySelectorAll(".filter").forEach(btn => {
    btn.addEventListener("click", () => {
      filtersEl.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderAll(btn.dataset.filter);
    });
  });
}

function renderAll(filter = "All") {
  const moreProjects = projects.filter(p => !p.featured);
  const list = filter === "All" ? moreProjects : moreProjects.filter(p => p.categories.includes(filter));
  allEl.innerHTML = list.map(miniCard).join("");
  observeReveals();
}

function observeReveals() {
  document.querySelectorAll(".reveal:not(.observed)").forEach(el => {
    el.classList.add("observed");
    observer.observe(el);
  });
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12 });

renderFeatured();
renderFilters();
renderAll();
observeReveals();

const nav = document.querySelector(".nav");
document.querySelector(".menu-btn").addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  document.querySelector(".menu-btn").setAttribute("aria-expanded", open);
});
document.querySelectorAll(".nav-links a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));


// Optional GitHub freshness helper:
// The main portfolio remains fully static, but this helper can be used later
// to surface recent public repositories without changing the project cards.
async function fetchRecentGitHubRepos(username = "kavyyyaaa") {
  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
    if (!res.ok) throw new Error("GitHub API unavailable");
    return await res.json();
  } catch (err) {
    console.warn("GitHub sync unavailable; using curated portfolio data.", err);
    return [];
  }
}

// Premium intro, scroll progress and subtle cursor lighting.
const introScreen = document.getElementById("introScreen");
const enterPortfolio = document.getElementById("enterPortfolio");
const skipIntro = document.getElementById("skipIntro");
const cursorGlow = document.getElementById("cursorGlow");
const scrollProgress = document.getElementById("scrollProgress");

function closeIntro() {
  if (!introScreen) return;
  introScreen.classList.add("is-hidden");
  try { sessionStorage.setItem("kavyaaIntroSeen", "1"); } catch(e) {}
}

try {
  if (sessionStorage.getItem("kavyaaIntroSeen") === "1") introScreen?.classList.add("is-hidden");
} catch(e) {}

enterPortfolio?.addEventListener("click", closeIntro);
skipIntro?.addEventListener("click", closeIntro);

window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const progress = max > 0 ? (window.scrollY / max) * 100 : 0;
  if (scrollProgress) scrollProgress.style.width = `${progress}%`;
}, { passive: true });

document.addEventListener("pointermove", (e) => {
  if (!cursorGlow || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  cursorGlow.style.opacity = "1";
  cursorGlow.style.left = `${e.clientX}px`;
  cursorGlow.style.top = `${e.clientY}px`;
}, { passive: true });

document.addEventListener("mouseleave", () => { if (cursorGlow) cursorGlow.style.opacity = "0"; });

// Gentle 3D tilt on larger screens; disabled on touch devices.
if (window.matchMedia("(pointer: fine)").matches) {
  document.addEventListener("pointermove", (e) => {
    const card = e.target.closest(".project-card, .cert-card, .research-card, .skill-card");
    if (!card) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    card.style.transform = `perspective(900px) rotateX(${(-y*2.2).toFixed(2)}deg) rotateY(${(x*2.2).toFixed(2)}deg) translateY(-5px)`;
  }, { passive: true });
  document.addEventListener("pointerout", (e) => {
    const card = e.target.closest?.(".project-card, .cert-card, .research-card, .skill-card");
    if (card && !card.contains(e.relatedTarget)) card.style.transform = "";
  }, { passive: true });
}
