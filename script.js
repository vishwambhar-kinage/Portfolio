const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");
const copyBtn = document.getElementById("copyLinkedIn");
const toast = document.getElementById("toast");

const LINKEDIN_URL = "https://www.linkedin.com/in/vishwambhar-kinage-b6077523a/";

const savedTheme = localStorage.getItem("vk-theme");
if (savedTheme === "light") {
  body.classList.add("light");
  themeToggle.textContent = "☀";
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light");
  const light = body.classList.contains("light");
  themeToggle.textContent = light ? "☀" : "☾";
  localStorage.setItem("vk-theme", light ? "light" : "dark");
});

menuToggle.addEventListener("click", () => {
  const open = mobileNav.classList.toggle("open");
  mobileNav.setAttribute("aria-hidden", String(!open));
});

document.querySelectorAll(".mobile-nav a").forEach(link => {
  link.addEventListener("click", () => mobileNav.classList.remove("open"));
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });

document.querySelectorAll(".section, .card, .project-card").forEach(el => {
  el.classList.add("reveal");
  revealObserver.observe(el);
});

copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(LINKEDIN_URL);
    showToast("LinkedIn profile copied");
  } catch {
    showToast("LinkedIn: " + LINKEDIN_URL);
  }
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
}

// Real-time date and clock
const liveDate = document.getElementById("liveDate");
const liveClock = document.getElementById("liveClock");

function updateDateTime() {
  const now = new Date();

  liveDate.textContent = new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(now);

  liveClock.textContent = new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).format(now);
}

updateDateTime();
setInterval(updateDateTime, 1000);

// Click/tap a skill to highlight it.
document.querySelectorAll(".skill-selectable").forEach(card => {
  const toggleSkill = () => {
    const active = card.classList.toggle("active");
    card.setAttribute("aria-pressed", String(active));
  };

  card.addEventListener("click", toggleSkill);

  card.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleSkill();
    }
  });
});

document.getElementById("year").textContent = new Date().getFullYear();
