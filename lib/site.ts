/**
 * Contenu et coordonnées du site, centralisés pour être modifiés sans toucher aux composants.
 */
export const site = {
  name: "Sovalit",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sovalit.com",
  title: "Sovalit — Produits digitaux, outils internes & IA sur mesure",
  description:
    "Sovalit conçoit et développe vos produits digitaux sur mesure : sites vitrines, applications mobiles privées, outils internes et solutions data & IA.",
  email: "contact@sovalit.com",
  phone: "+33 6 52 93 64 84",
  phoneHref: "tel:+33652936484",
} as const;

export const nav = [
  { href: "/#services", label: "Services" },
  { href: "/#data", label: "Data & IA" },
  { href: "/#methode", label: "Méthode" },
  { href: "/#faq", label: "FAQ" },
] as const;

export type ServiceArt = "web" | "mobile" | "tools" | "data";

export const services: {
  num: string;
  title: string;
  text: string;
  tags: string[];
  art: ServiceArt;
  accent?: boolean;
}[] = [
  {
    num: "01",
    title: "Sites vitrines",
    text: "Un site rapide, élégant et bien référencé, qui présente votre activité et transforme vos visiteurs en clients.",
    tags: ["Design sur mesure", "SEO", "CMS", "Performance"],
    art: "web",
  },
  {
    num: "02",
    title: "Applications mobiles privées",
    text: "Des apps iOS & Android réservées à vos équipes ou à vos clients : terrain, commerciaux, suivi, réservation…",
    tags: ["iOS & Android", "Hors ligne", "Distribution privée"],
    art: "mobile",
  },
  {
    num: "03",
    title: "Outils internes",
    text: "Back-offices, CRM, portails, automatisations : des outils pensés pour vos process, qui font gagner des heures chaque semaine.",
    tags: ["Back-office", "Intégrations API", "Workflows"],
    art: "tools",
  },
  {
    num: "04",
    title: "Data, IA & Machine Learning",
    text: "Valorisez vos données : tableaux de bord, modèles prédictifs, assistants IA branchés sur vos documents et vos outils.",
    tags: ["Dashboards", "ML", "LLM & RAG"],
    art: "data",
    accent: true,
  },
];

export const marquee = [
  "Sites vitrines",
  "Applications mobiles",
  "Outils internes",
  "Tableaux de bord",
  "Machine learning",
  "IA générative",
  "Automatisation",
];

export const dataUseCases = [
  { title: "Pilotage & dashboards", text: "Vos indicateurs clés centralisés, fiables et à jour automatiquement." },
  { title: "Modèles prédictifs", text: "Prévision des ventes, scoring, détection d'anomalies, maintenance prédictive." },
  { title: "Assistants IA sur mesure", text: "Des LLM connectés à vos documents et à vos outils, en toute confidentialité." },
  { title: "Automatisation intelligente", text: "Extraction de documents, classification, traitement des tâches répétitives." },
];

export const steps = [
  { title: "Cadrage", text: "On échange sur vos objectifs, vos contraintes et vos utilisateurs. Vous recevez une proposition claire, chiffrée et planifiée." },
  { title: "Design", text: "Maquettes interactives et parcours utilisateurs : vous validez le produit avant la moindre ligne de code." },
  { title: "Développement", text: "Livraisons régulières que vous pouvez tester. Vous suivez l'avancement en continu, sans effet tunnel." },
  { title: "Lancement & suivi", text: "Mise en production, formation de vos équipes, maintenance et évolutions dans la durée." },
];

export const reasons = [
  { title: "Interlocuteur unique", text: "Du premier appel à la mise en ligne, une seule personne qui connaît votre projet par cœur." },
  { title: "100 % sur mesure", text: "Pas de template recyclé : chaque produit est conçu autour de vos besoins réels." },
  { title: "Vous êtes propriétaire", text: "Le code, les données et les accès vous appartiennent. Aucune dépendance cachée." },
  { title: "Pensé pour durer", text: "Technologies éprouvées, code documenté, sécurité et performance dès le départ." },
];

export const faq = [
  { q: "Combien coûte un projet ?", a: "Chaque projet est chiffré sur mesure après un premier échange gratuit. Vous recevez un devis détaillé, au forfait, avant tout engagement." },
  { q: "Quels sont les délais ?", a: "Comptez généralement 2 à 4 semaines pour un site vitrine, et de 1 à 4 mois pour une application ou un outil métier selon sa complexité." },
  { q: "Qu'est-ce qu'une application mobile « privée » ?", a: "Une application distribuée uniquement à vos collaborateurs ou à vos clients, sans publication publique sur les stores. Idéal pour les outils métier." },
  { q: "Mes données restent-elles confidentielles ?", a: "Oui. Les solutions IA peuvent être hébergées en Europe ou sur votre propre infrastructure, et vos données ne servent jamais à entraîner des modèles tiers." },
  { q: "Assurez-vous la maintenance après la livraison ?", a: "Oui, des formules de maintenance et d'évolution sont proposées pour garder votre produit sécurisé, à jour et en phase avec votre croissance." },
];

export const needs = ["Site vitrine", "Application mobile", "Outil interne", "Data / IA"] as const;
