import "./style.css";

// ---------- 3D du hero ----------
const canvas = document.getElementById("hero-canvas");
// Chargée à part pour ne pas retarder l'affichage du contenu
if (canvas) import("./hero3d.js").then(({ initHero3D }) => initHero3D(canvas));

// ---------- Menu mobile ----------
const burger = document.querySelector(".nav__burger");
const mobile = document.querySelector(".nav__mobile");
const setMenu = (open) => {
  burger.setAttribute("aria-expanded", String(open));
  burger.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
  mobile.hidden = !open;
};
burger?.addEventListener("click", () => setMenu(mobile.hidden));
mobile?.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));

// ---------- Apparition au scroll ----------
const reveals = document.querySelectorAll(".reveal");
// Décalage en cascade entre éléments frères
reveals.forEach((el) => {
  const siblings = [...el.parentElement.children].filter((c) => c.classList.contains("reveal"));
  const i = siblings.indexOf(el);
  if (i > 0) el.style.setProperty("--d", `${Math.min(i, 6) * 0.08}s`);
});
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
    }),
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("is-in"));
}

// ---------- Formulaire de contact ----------
// Sans backend, la demande est préparée dans le client mail de l'utilisateur.
const CONTACT_EMAIL = "contact@sovalit.com";
const form = document.getElementById("contact-form");
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const status = form.querySelector(".form__status");
  const fields = ["name", "email", "message"].map((n) => form.elements[n]);
  let ok = true;
  fields.forEach((f) => {
    const valid = f.value.trim() && (f.type !== "email" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value));
    f.classList.toggle("is-invalid", !valid);
    if (!valid) ok = false;
  });
  if (!ok) {
    status.textContent = "Merci de compléter votre nom, un email valide et votre message.";
    status.className = "form__status is-error";
    return;
  }
  const data = new FormData(form);
  const needs = data.getAll("need").join(", ") || "Non précisé";
  const subject = `Nouveau projet — ${data.get("name")}${data.get("company") ? ` (${data.get("company")})` : ""}`;
  const body = [
    `Nom : ${data.get("name")}`,
    `Entreprise : ${data.get("company") || "-"}`,
    `Email : ${data.get("email")}`,
    `Besoin : ${needs}`,
    "",
    data.get("message"),
  ].join("\n");
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  status.textContent = "Votre client mail s'ouvre avec votre demande. Merci !";
  status.className = "form__status is-ok";
});

document.getElementById("year").textContent = new Date().getFullYear();
