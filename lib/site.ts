/**
 * Contenu et coordonnées du site, centralisés pour être modifiés sans toucher aux composants.
 */
export const site = {
  name: "Sovalit",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sovalit.com",
  title: "Sovalit",
  description:
    "Sovalit conçoit et développe vos produits digitaux sur mesure : sites vitrines, applications mobiles privées, outils internes et solutions data et IA.",
  email: "contact@sovalit.com",
  phone: "+33 6 52 93 64 84",
  phoneHref: "tel:+33652936484",
} as const;

export const nav = [
  { href: "/#services", label: "Services" },
  { href: "/#data", label: "Data et IA" },
  { href: "/#methode", label: "Méthode" },
  { href: "/#faq", label: "Questions" },
] as const;

export type ServiceId = "web" | "mobile" | "tools" | "ai";

export const services: { id: ServiceId; title: string; text: string; points: string[] }[] = [
  {
    id: "web",
    title: "Sites vitrines",
    text: "Un site rapide et bien référencé, qui explique clairement ce que vous faites et donne envie de vous contacter.",
    points: ["Design sur mesure", "Référencement naturel", "Contenus modifiables par vos soins"],
  },
  {
    id: "mobile",
    title: "Applications mobiles privées",
    text: "Des apps iOS et Android réservées à vos équipes ou à vos clients, distribuées sans passer par une publication publique.",
    points: ["Fonctionne hors connexion", "iOS et Android", "Distribution privée"],
  },
  {
    id: "tools",
    title: "Outils internes",
    text: "Back-offices, suivi de devis, portails clients : des outils taillés pour vos process, branchés sur ceux que vous utilisez déjà.",
    points: ["Remplace les tableurs partagés", "Connexion à vos logiciels", "Droits par utilisateur"],
  },
  {
    id: "ai",
    title: "Data et IA",
    text: "Des assistants qui répondent à partir de vos documents, des prévisions fiables, des tâches répétitives automatisées.",
    points: ["Assistants sur vos documents", "Modèles prédictifs", "Hébergement souverain possible"],
  },
];

export const commitments = [
  { title: "Un seul interlocuteur", text: "La personne qui vous écoute est celle qui conçoit et développe." },
  { title: "Un prix fixé d'avance", text: "Un devis au forfait, détaillé, validé avant le premier jour." },
  { title: "Vos données restent chez vous", text: "Code, accès et hébergement vous appartiennent, jusqu'au serveur si vous le souhaitez." },
  { title: "Un suivi dans la durée", text: "Maintenance, corrections et évolutions après la mise en ligne." },
];

export const dataUseCases = [
  { title: "Prévoir", text: "Ventes, stocks, charge de travail." },
  { title: "Retrouver", text: "Des réponses sourcées dans vos documents." },
  { title: "Automatiser", text: "Factures, emails, saisie." },
  { title: "Piloter", text: "Vos chiffres clés, toujours à jour." },
];

export const steps = [
  { title: "Cadrage", text: "Un premier échange pour comprendre vos objectifs, vos contraintes et où doivent vivre vos données. Vous recevez un devis détaillé." },
  { title: "Maquettes", text: "Vous voyez et testez le produit sur des maquettes interactives avant qu'il soit développé." },
  { title: "Développement", text: "Des versions livrées régulièrement, que vous essayez au fil de l'eau." },
  { title: "Mise en ligne", text: "Installation sur l'infrastructure choisie, d'un serveur dans votre pays à une machine dans vos locaux. Puis prise en main, maintenance et évolutions." },
];

export const faq = [
  { q: "Combien coûte un projet ?", a: "Chaque projet est chiffré après un premier échange gratuit. Vous recevez un devis au forfait, détaillé par étape, avant tout engagement." },
  { q: "Quels sont les délais ?", a: "Comptez en général 2 à 4 semaines pour un site vitrine, et 1 à 4 mois pour une application ou un outil métier selon sa complexité." },
  { q: "Qu'est-ce qu'une application mobile privée ?", a: "Une application installée uniquement par vos collaborateurs ou vos clients, sans être publiée publiquement sur les stores. C'est idéal pour les outils de terrain." },
  { q: "Où sont hébergées mes données ?", a: "Là où vous le décidez. L'infrastructure peut être montée de A à Z pour vous : un serveur loué dans votre pays, ou installé directement dans vos locaux. Les modèles d'IA peuvent y tourner aussi, sans que vos données partent chez un tiers." },
  { q: "Pouvez-vous reprendre un projet existant ?", a: "Oui, après un audit du code et de l'hébergement. Vous saurez précisément ce qui peut être conservé, amélioré ou refait." },
  { q: "Assurez-vous la maintenance ?", a: "Oui. Des formules de maintenance gardent votre produit sécurisé et à jour, et permettent de le faire évoluer avec votre activité." },
];

export const needs = ["Site vitrine", "Application mobile", "Outil interne", "Data et IA"] as const;
