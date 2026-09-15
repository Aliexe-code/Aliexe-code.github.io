// app.js — Controllers: Theme, Filtering, Modal, Contact (Blueprint §5)
var isExpanded = false;
var currentFilter = "all";

function initTheme() {
  var saved = localStorage.getItem("portfolio-theme") || "dark";
  document.documentElement.setAttribute("data-theme", saved);
  updateThemeIcon(saved);
}
function toggleTheme() {
  var current = document.documentElement.getAttribute("data-theme") || "dark";
  var target = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", target);
  localStorage.setItem("portfolio-theme", target);
  updateThemeIcon(target);
}
function updateThemeIcon(theme) {
  var btn = document.getElementById("themeToggle");
  if (btn) btn.textContent = theme === "dark" ? "☀️" : "🌙";
}

function getFilteredProjects() {
  if (!window.PROJECTS_DATA) return [];
  if (currentFilter === "all") return window.PROJECTS_DATA.slice();
  return window.PROJECTS_DATA.filter(function (p) { return p.category === currentFilter; });
}

function createProjectCardHtml(proj) {
  var badges = (proj.badges || []).slice(0,4).map(function(b){ return '<span>'+escapeHtml(b)+'</span>'; }).join("");
  var initials = proj.title.split(" ").map(function(w){return w[0]}).join("").slice(0,3).toUpperCase();
  var catLabel = proj.category || "project";
  var mediaInner = proj.coverImage
    ? '<img src="'+escapeHtml(proj.coverImage)+'" alt="'+escapeHtml(proj.title)+' cover" loading="lazy" style="width:100%;height:100%;object-fit:contain;padding:14px;background:#fff;" />'
    : '<span>'+escapeHtml(initials)+'</span>';
  var mediaStyle = proj.coverImage
    ? 'background:#fff;'
    : 'background: linear-gradient(135deg,'+escapeHtml(proj.themeColor||"#3D5A80")+','+escapeHtml("#1A212B")+');';
  return ''+
  '<article class="project-card" data-id="'+escapeHtml(proj.id)+'">'+
    '<div class="card-media" style="'+mediaStyle+'">'+
      mediaInner+
      '<span class="media-badge">'+escapeHtml(catLabel)+'</span>'+
    '</div>'+
    '<div class="card-body">'+
      '<h3>'+escapeHtml(proj.title)+'</h3>'+
      '<div class="tagline">'+escapeHtml(proj.tagline||"")+'</div>'+
      '<p class="summary">'+escapeHtml(proj.summary||"")+'</p>'+
      '<div class="card-badges">'+badges+'</div>'+
      '<div class="card-actions">'+
        '<button class="btn btn-secondary" onclick="openModal(\''+escapeHtml(proj.id)+'\')">Deep Dive</button>'+
        '<a class="btn btn-ghost" href="'+escapeHtml(proj.githubUrl)+'" target="_blank" rel="noopener">GitHub ↗</a>'+
      '</div>'+
    '</div>'+
  '</article>';
}

function renderProjects() {
  var grid = document.getElementById("projectsGrid");
  var toggleBtn = document.getElementById("btnToggleProjects");
  if (!grid) return;
  var filtered = getFilteredProjects();
  var toDisplay = (currentFilter === "all" && !isExpanded) ? filtered.slice(0, 3) : filtered;
  grid.innerHTML = toDisplay.map(createProjectCardHtml).join("");
  if (toggleBtn) {
    if (filtered.length <= 3) {
      toggleBtn.style.display = "none";
    } else {
      toggleBtn.style.display = "";
      toggleBtn.innerHTML = isExpanded
        ? '<span>Show Less (Top 3)</span><span>↑</span>'
        : '<span>Show All Projects ('+filtered.length+')</span><span>↓</span>';
    }
  }
  document.querySelectorAll(".filter-btn").forEach(function(b){
    b.classList.toggle("active", b.getAttribute("data-filter")===currentFilter);
  });
}

function createOssCardHtml(item) {
  var stateClass = item.state==="merged" ? "badge-merged" : "badge-open";
  var stateLabel = item.state==="merged" ? "✓ merged" : "◷ open";
  var badges = (item.badges||[]).map(function(b){return '<span class="tag">'+escapeHtml(b)+'</span>';}).join("");
  return ''+
  '<article class="oss-card">'+
    '<h3><a href="'+escapeHtml(item.prUrl)+'" target="_blank" rel="noopener">'+escapeHtml(item.repo)+' — '+escapeHtml(item.title)+'</a></h3>'+
    '<div class="meta"><span class="'+stateClass+'">'+stateLabel+'</span><span>'+escapeHtml(item.date)+'</span>'+(item.version?' <span>• '+escapeHtml(item.version)+'</span>':'')+'</div>'+
    '<p>'+escapeHtml(item.summary)+'</p>'+
    (item.highlights?'<p style="color:var(--text-muted);font-size:0.82rem">• '+escapeHtml(item.highlights[0])+'</p>':'')+
    '<div class="oss-badges">'+badges+'</div>'+
    '<div style="margin-top:6px;display:flex;gap:8px"><a class="btn btn-ghost" style="padding:6px 12px;font-size:0.8rem" href="'+escapeHtml(item.prUrl)+'" target="_blank" rel="noopener">View PR ↗</a></div>'+
  '</article>';
}
function renderOSS() {
  var grid = document.getElementById("ossGrid");
  if (!grid || !window.OSS_DATA) return;
  grid.innerHTML = window.OSS_DATA.map(createOssCardHtml).join("");
}

function openModal(id) {
  var proj = (window.PROJECTS_DATA||[]).find(function(p){return p.id===id;});
  if (!proj) return;
  var modal = document.getElementById("projectModal");
  var content = document.getElementById("modalContent");
  var stack = (proj.techStack||[]).map(function(t){return '<span class="tag">'+escapeHtml(t)+'</span>';}).join(" ");
  var highlights = (proj.highlights||[]).map(function(h){return '<li>'+escapeHtml(h)+'</li>';}).join("");
  var arch = proj.architecture||{};
  var coverHtml = proj.coverImage ? '<div style="margin:12px 0; background:#fff; border-radius:12px; padding:12px; border:1px solid var(--border-glass); text-align:center"><img src="'+escapeHtml(proj.coverImage)+'" alt="'+escapeHtml(proj.title)+' cover" style="max-width:100%; max-height:220px; object-fit:contain;" /></div>' : '';
  content.innerHTML = ''+
    '<h2 id="modalTitle">'+escapeHtml(proj.title)+'</h2>'+
    '<div class="modal-tagline">'+escapeHtml(proj.tagline||"")+'</div>'+
    coverHtml+
    '<div style="margin-top:8px;display:flex;gap:6px;flex-wrap:wrap">'+(proj.badges||[]).map(function(b){return '<span class="tag">'+escapeHtml(b)+'</span>';}).join("")+'</div>'+
    '<div class="modal-section"><h3>Summary</h3><p>'+escapeHtml(proj.summary||"")+'</p></div>'+
    '<div class="modal-section"><h3>Tech Stack</h3><div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:6px">'+stack+'</div></div>'+
    '<div class="modal-section"><h3>Highlights</h3><ul>'+highlights+'</ul></div>'+
    '<div class="modal-section"><h3>Architecture</h3>'+
      '<p><strong>Pattern:</strong> '+escapeHtml(arch.pattern||"")+'</p>'+
      '<p><strong>Layers:</strong> '+escapeHtml(arch.layers||"")+'</p>'+
      '<p><strong>Key Decisions:</strong> '+escapeHtml(arch.keyDecisions||"")+'</p>'+
    '</div>'+
    '<div class="modal-actions">'+
      '<a class="btn btn-primary" href="'+escapeHtml(proj.githubUrl)+'" target="_blank" rel="noopener">View on GitHub ↗</a>'+
      (proj.liveUrl?'<a class="btn btn-secondary" href="'+escapeHtml(proj.liveUrl)+'" target="_blank" rel="noopener">Live Demo</a>':'')+
      '<button class="btn btn-ghost" onclick="closeModal()">Close</button>'+
    '</div>';
  modal.classList.add("open");
  modal.setAttribute("aria-hidden","false");
  document.body.style.overflow="hidden";
}
function closeModal() {
  var modal = document.getElementById("projectModal");
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden","true");
  document.body.style.overflow="";
}
function escapeHtml(s) {
  if (!s) return "";
  return String(s).replace(/[&<>"']/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]; });
}

async function handleContactSubmit(event) {
  event.preventDefault();
  var nameEl = document.getElementById("name");
  var emailEl = document.getElementById("email");
  var msgEl = document.getElementById("message");
  var statusMsg = document.getElementById("formStatusMsg");
  var btn = document.getElementById("btnSubmit");
  var name = nameEl.value.trim();
  var email = emailEl.value.trim();
  var message = msgEl.value.trim();
  if (!name || !email || !message) {
    statusMsg.className = "form-status-msg error";
    statusMsg.textContent = "Please fill all fields.";
    return;
  }
  if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }
  statusMsg.className = "form-status-msg";
  statusMsg.textContent = "";
  try {
    var res = await fetch("https://formsubmit.co/ajax/terminalexe1@gmail.com", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ name: name, email: email, message: message, _subject: "Portfolio inquiry from " + name, _captcha: "false" })
    });
    if (res.ok) {
      statusMsg.className = "form-status-msg success";
      statusMsg.textContent = "✓ Message sent! Delivered directly to my inbox. I'll reply soon.";
      event.target.reset();
    } else {
      throw new Error("submit failed");
    }
  } catch (err) {
    statusMsg.className = "form-status-msg error";
    statusMsg.textContent = "Couldn't send via form — opening your email client as fallback.";
    setTimeout(function(){
      window.location.href = "mailto:terminalexe1@gmail.com?subject=" + encodeURIComponent("Portfolio inquiry from " + name) + "&body=" + encodeURIComponent("From: " + name + " <" + email + ">\n\n" + message);
    }, 600);
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = "Send Message →"; }
  }
}

document.addEventListener("DOMContentLoaded", function(){
  initTheme();
  renderProjects();
  renderOSS();
  var themeBtn = document.getElementById("themeToggle");
  if (themeBtn) themeBtn.addEventListener("click", toggleTheme);
  document.querySelectorAll(".filter-btn").forEach(function(btn){
    btn.addEventListener("click", function(){
      currentFilter = btn.getAttribute("data-filter");
      isExpanded = false;
      renderProjects();
    });
  });
  var toggleBtn = document.getElementById("btnToggleProjects");
  if (toggleBtn) toggleBtn.addEventListener("click", function(){
    isExpanded = !isExpanded;
    renderProjects();
    if (isExpanded) document.getElementById("projects").scrollIntoView({behavior:"smooth", block:"start"});
  });
  var form = document.getElementById("contactForm");
  if (form) form.addEventListener("submit", handleContactSubmit);
  var closeBtn = document.getElementById("modalClose");
  var backdrop = document.getElementById("modalBackdrop");
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (backdrop) backdrop.addEventListener("click", closeModal);
  document.addEventListener("keydown", function(e){ if (e.key==="Escape") closeModal(); });
});
