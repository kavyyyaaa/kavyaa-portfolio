const projects=[
{id:"01",title:"Multi-Agent AI Data Analyst",description:"Full-stack data analytics platform for CSV analysis, visualization and AI-generated insights, with ML workflows and automated PDF reporting.",tech:["Python","FastAPI","React","Plotly","Gemini"],categories:["AI","Data Analytics"],featured:true,github:"https://github.com/kavyyyaaa/Multi-Agent-AI-Data-Analyst",caseStudy:true},
{id:"02",title:"ForgePredict AI",description:"F1-inspired predictive maintenance platform for industrial assets with real-time telemetry, failure prediction and Remaining Useful Life estimation.",tech:["Python","XGBoost","Dash","Plotly","Scikit-learn"],categories:["Machine Learning","Predictive Maintenance"],featured:true,github:"https://github.com/kavyyyaaa/ForgePredict-AI",caseStudy:true},
{id:"03",title:"MarketMind",description:"Stock forecasting and risk analytics platform combining machine learning forecasts, technical indicators and interactive dashboards.",tech:["Python","Prophet","XGBoost","Flask","Plotly"],categories:["Machine Learning","Data Analytics"],featured:true,github:"https://github.com/kavyyyaaa/Marketmind",caseStudy:true},
{id:"04",title:"VisionSearch",description:"AI-powered visual product search engine using image embeddings and similarity search to find visually similar products.",tech:["Python","ResNet-50","FAISS","OpenCV","Flask"],categories:["Computer Vision","AI"],featured:true,github:"https://github.com/kavyyyaaa/VisionSearch",caseStudy:true},
{id:"05",title:"DRI Kiln Thermal Analytics",description:"Industrial thermal analytics work focused on kiln temperature data, monitoring and predictive-maintenance workflows.",tech:["Python","LSTM","Plotly","Scikit-learn"],categories:["Predictive Maintenance","Machine Learning"],github:"https://github.com/kavyyyaaa/DRI-Kiln-Thermal-Analytics"},
{id:"06",title:"AI-Based Logo Detection & Obfuscation",description:"Computer-vision research work around brand/logo detection and obfuscation in videos.",tech:["Computer Vision","Deep Learning"],categories:["Computer Vision","AI"],github:"https://github.com/kavyyyaaa/logo_detection_obfuscation"},
{id:"07",title:"AI Research Assistant",description:"RAG-based PDF question-answering assistant using Google Gemini, LangChain and FAISS for document-grounded answers.",tech:["Python","Gemini","LangChain","FAISS"],categories:["AI"],github:"https://github.com/kavyyyaaa/AI-Research-Assistant"},
{id:"08",title:"Customer Segmentation Project",description:"Customer analytics project focused on segmenting customers into meaningful groups for data-driven business insights.",tech:["Python","Pandas","Scikit-learn"],categories:["Data Analytics","Machine Learning"],github:"https://github.com/kavyyyaaa/Customer-Segmentation-Project"}
];
const featuredEl=document.getElementById("featured-projects"),allEl=document.getElementById("all-projects"),filtersEl=document.getElementById("filters");
const stage=document.getElementById("projectStage"),stageTitle=document.getElementById("stageTitle"),stageDescription=document.getElementById("stageDescription"),stageTech=document.getElementById("stageTech"),stageActions=document.getElementById("stageActions"),stageId=document.getElementById("stageId"),stageCategory=document.getElementById("stageCategory"),stageProgress=document.getElementById("stageProgress"),stageSystem=document.getElementById("stageSystem"),stageList=document.getElementById("stageProjectList");
function links(p){return `<div class="project-links"><a href="${p.github}" target="_blank" rel="noreferrer">GitHub ↗</a>${p.caseStudy?`<a href="project.html?id=${p.id}">Case study ↗</a>`:""}</div>`}
function card(p){return `<article class="project-card reveal"><div class="project-top"><span>${p.id} / 04</span><span class="project-type">${p.categories[0]}</span></div><div><h3>${p.title}</h3><p>${p.description}</p></div><div class="project-bottom"><div class="tech-list">${p.tech.map(t=>`<span>${t}</span>`).join("")}</div>${links(p)}</div></article>`}
function mini(p){return `<article class="mini-project reveal"><span class="project-number">${p.id}</span><h4>${p.title}</h4><p>${p.description}</p><div class="tech-list">${p.tech.slice(0,4).map(t=>`<span>${t}</span>`).join("")}</div>${links(p)}</article>`}
const featured=projects.filter(p=>p.featured);
function renderStage(p){
  if(!p||!stage)return;
  const idx=featured.findIndex(x=>x.id===p.id);
  stageTitle.textContent=p.title; stageDescription.textContent=p.description;
  stageId.textContent=p.id; stageSystem.textContent=p.id; stageProgress.textContent=`${p.id} / ${String(featured.length).padStart(2,"0")}`;
  stageCategory.textContent=p.categories.join(" · ").toUpperCase();
  stageTech.innerHTML=p.tech.map(t=>`<span>${t}</span>`).join("");
  stageActions.innerHTML=links(p);
  stageList.querySelectorAll(".stage-project").forEach(x=>x.classList.toggle("active",x.dataset.id===p.id));
  const bars=[...document.querySelectorAll("#stageBars i")];
  bars.forEach((b,i)=>b.style.height=(24+((i+2)*(idx+3)*7)%68)+"%");
  stage.classList.remove("stage-flash"); void stage.offsetWidth; stage.classList.add("stage-flash");
}
if(stageList){
  stageList.innerHTML=featured.map(p=>`<button class="stage-project" type="button" data-id="${p.id}"><span>${p.id}</span><b>${p.title}</b><i>${p.categories[0]}</i></button>`).join("");
  stageList.querySelectorAll(".stage-project").forEach(btn=>btn.addEventListener("click",()=>renderStage(featured.find(p=>p.id===btn.dataset.id))));
  renderStage(featured[0]);
}
const more=()=>projects.filter(p=>!p.featured);
const cats=["All",...new Set(more().flatMap(p=>p.categories))];
filtersEl.innerHTML=cats.map((c,i)=>`<button class="filter ${i===0?"active":""}" data-filter="${c}">${c}</button>`).join("");
const revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");revealObserver.unobserve(e.target)}}),{threshold:.12});
function observeReveals(){document.querySelectorAll(".reveal:not(.observed)").forEach(el=>{el.classList.add("observed");revealObserver.observe(el)})}
function renderAll(filter="All"){allEl.innerHTML=more().filter(p=>filter==="All"||p.categories.includes(filter)).map(mini).join("");observeReveals()}
filtersEl.querySelectorAll(".filter").forEach(b=>b.addEventListener("click",()=>{filtersEl.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderAll(b.dataset.filter)}));
renderAll();
observeReveals();
const stageObserver=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){const p=featured.find(x=>x.id===e.target.dataset.project); if(p)renderStage(p)}})
},{rootMargin:"-45% 0px -45% 0px",threshold:0});
document.querySelectorAll(".project-sentinel").forEach(s=>stageObserver.observe(s));
const nav=document.querySelector(".nav"),menu=document.querySelector(".menu-btn");
menu?.addEventListener("click",()=>{const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",open)});
document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));
const intro=document.getElementById("introScreen");
function closeIntro(){intro?.classList.add("is-hidden");try{sessionStorage.setItem("kavyaaIntroSeen","1")}catch(e){}}
try{if(sessionStorage.getItem("kavyaaIntroSeen")==="1")intro?.classList.add("is-hidden")}catch(e){}
document.getElementById("enterPortfolio")?.addEventListener("click",closeIntro);
document.getElementById("skipIntro")?.addEventListener("click",closeIntro);
let ticking=false;const progress=document.getElementById("scrollProgress");
window.addEventListener("scroll",()=>{if(ticking)return;ticking=true;requestAnimationFrame(()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=`${max>0?(scrollY/max)*100:0}%`;ticking=false})},{passive:true});

// Editorial scroll-story: the left chapter title types itself whenever the active chapter changes.
const steps=[...document.querySelectorAll(".story-step")],storyTitle=document.getElementById("storyTitle"),storyTitleText=document.getElementById("storyTitleText"),storyText=document.getElementById("storyText"),storyIndex=document.getElementById("storyIndex"),storyMeter=document.getElementById("storyMeter");
let titleRun=0,textRun=0;
function typeInto(el,text,speed,runRef){
  if(!el)return;
  const run=++runRef.value;
  el.textContent="";
  let i=0;
  const tick=()=>{
    if(run!==runRef.value)return;
    el.textContent=text.slice(0,++i);
    if(i<text.length)window.setTimeout(tick,speed);
  };
  tick();
}
const titleState={value:0},textState={value:0};
function activateStory(s){
  if(!s)return;
  steps.forEach(x=>x.classList.toggle("active",x===s));
  storyIndex.textContent=s.dataset.index;
  storyMeter.style.width=`${parseInt(s.dataset.index)*33.333}%`;
  typeInto(storyTitleText,s.dataset.title,52,titleState);
  typeInto(storyText,s.dataset.text,13,textState);
}
const storyObserver=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)activateStory(e.target)})
},{rootMargin:"-38% 0px -42% 0px",threshold:0});
steps.forEach(s=>storyObserver.observe(s));
activateStory(steps[0]);

// Lightweight animated intro status: gives the landing screen a living system feel without heavy effects.
(function initIntroMotion(){
  const live=document.getElementById('introLiveText');
  const system=document.getElementById('introSystemText');
  const percent=document.getElementById('introPercent');
  const bar=document.getElementById('introBar');
  const clock=document.getElementById('introClock');
  if(!live)return;
  const phrases=['ANALYZING DATA','FINDING SIGNAL','TRAINING MODELS','BUILDING INSIGHT','READY TO EXPLORE'];
  const systems=['INITIALIZING ANALYTICS ENGINE','LOADING MODEL PIPELINE','MAPPING PROJECT SYSTEMS','PACKAGING INSIGHTS','PORTFOLIO READY'];
  let step=0, progressValue=0;
  function update(){
    live.textContent=phrases[step%phrases.length];
    system.textContent=systems[step%systems.length];
    step++;
  }
  update();
  setInterval(update,1600);
  function progressTick(){
    progressValue=Math.min(100,progressValue+1);
    if(percent)percent.textContent=String(progressValue).padStart(2,'0')+'%';
    if(bar)bar.style.width=progressValue+'%';
    if(progressValue<100)requestAnimationFrame(()=>setTimeout(progressTick,26));
  }
  progressTick();
  function tickClock(){
    if(!clock)return;
    const d=new Date();
    clock.textContent=[d.getHours(),d.getMinutes(),d.getSeconds()].map(v=>String(v).padStart(2,'0')).join(':');
  }
  tickClock(); setInterval(tickClock,1000);
})();

// Lightweight ambient telemetry — no mouse tracking, no canvas.
(function initTelemetry(){
  const msg=document.getElementById("telemetryMessage"), count=document.getElementById("telemetryCount");
  if(!msg)return;
  const messages=["MAPPING FEATURES","TRAINING SIGNALS","VALIDATING OUTPUT","EXPLAINING MODELS","PACKAGING INSIGHT","SYSTEM SYNCHRONIZED"];
  let i=0;
  setInterval(()=>{i=(i+1)%messages.length; msg.textContent=messages[i]},1800);
  let n=0;
  setInterval(()=>{n=(n+3.7)%100; count.textContent=n.toFixed(1).padStart(4,"0")+"%"},90);
})();


// Recruiter mode: a focused, one-screen route into the portfolio.
(function initRecruiterMode(){
  const modal=document.getElementById("recruiterModal"), open=document.getElementById("recruiterOpen"), close=document.getElementById("recruiterClose");
  if(!modal||!open)return;
  const setOpen=(state)=>{modal.classList.toggle("open",state);modal.setAttribute("aria-hidden",String(!state));document.body.classList.toggle("modal-open",state);if(state)close?.focus()};
  open.addEventListener("click",()=>setOpen(true));
  close?.addEventListener("click",()=>setOpen(false));
  modal.querySelectorAll("[data-recruiter-close]").forEach(el=>el.addEventListener("click",()=>setOpen(false)));
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&modal.classList.contains("open"))setOpen(false)});
})();

// Skill constellation: small, accessible interactions with no heavy rendering.
(function initSkillConstellation(){
  const nodes=[...document.querySelectorAll(".skill-node")], text=document.getElementById("skillConstellationText");
  if(!nodes.length||!text)return;
  const activate=(node)=>{nodes.forEach(n=>n.classList.remove("active"));node.classList.add("active");text.textContent=node.dataset.skill||""};
  nodes.forEach(node=>node.addEventListener("click",()=>activate(node)));
  activate(nodes[0]);
})();
