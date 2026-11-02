/**
 * Contenu et coordonnées du site, centralisés pour être modifiés sans toucher aux composants.
 */
export const site = {
  name: "Sovalit",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sovalit.com",
  title: "Sovalit — Produits digitaux, outils internes et IA sur mesure",
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
    points: ["Assistants sur vos documents", "Modèles prédictifs", "Hébergement en Europe possible"],
  },
];

export const commitments = [
  { title: "Un seul interlocuteur", text: "La personne qui vous écoute est celle qui conçoit et développe." },
  { title: "Un prix fixé d'avance", text: "Un devis au forfait, détaillé, validé avant le premier jour." },
  { title: "Le code vous appartient", text: "Sources, données et accès vous sont remis. Sans dépendance." },
  { title: "Un suivi dans la durée", text: "Maintenance, corrections et évolutions après la mise en ligne." },
];

export const dataUseCases = [
  { title: "Prévoir", text: "Ventes, stocks, charge de travail : des prévisions qui s'appuient sur votre historique." },
  { title: "Retrouver", text: "Un assistant qui répond à partir de vos contrats, procédures et fiches produits, sources à l'appui." },
  { title: "Automatiser", text: "Lecture de factures, tri des emails, saisie : les tâches répétitives passent en arrière-plan." },
  { title: "Piloter", text: "Un tableau de bord unique, mis à jour tout seul, avec les chiffres qui comptent vraiment." },
];

export const steps = [
  { title: "Cadrage", text: "Un premier échange pour comprendre vos objectifs et vos contraintes. Vous recevez un devis détaillé." },
  { title: "Maquettes", text: "Vous voyez et testez le produit sur des maquettes interactives avant qu'il soit développé." },
  { title: "Développement", text: "Des versions livrées régulièrement, que vous essayez au fil de l'eau." },
  { title: "Mise en ligne", text: "Lancement, prise en main par vos équipes, puis maintenance et évolutions." },
];

export const faq = [
  { q: "Combien coûte un projet ?", a: "Chaque projet est chiffré après un premier échange gratuit. Vous recevez un devis au forfait, détaillé par étape, avant tout engagement." },
  { q: "Quels sont les délais ?", a: "Comptez en général 2 à 4 semaines pour un site vitrine, et 1 à 4 mois pour une application ou un outil métier selon sa complexité." },
  { q: "Qu'est-ce qu'une application mobile privée ?", a: "Une application installée uniquement par vos collaborateurs ou vos clients, sans être publiée publiquement sur les stores. C'est idéal pour les outils de terrain." },
  { q: "Mes données restent-elles confidentielles ?", a: "Oui. Les solutions IA peuvent être hébergées en Europe ou sur votre propre infrastructure, et vos données ne servent jamais à entraîner des modèles tiers." },
  { q: "Pouvez-vous reprendre un projet existant ?", a: "Oui, après un audit du code et de l'hébergement. Vous saurez précisément ce qui peut être conservé, amélioré ou refait." },
  { q: "Assurez-vous la maintenance ?", a: "Oui. Des formules de maintenance gardent votre produit sécurisé et à jour, et permettent de le faire évoluer avec votre activité." },
];

export const needs = ["Site vitrine", "Application mobile", "Outil interne", "Data et IA"] as const;
