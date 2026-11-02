# Sovalit — site vitrine

Site de Sovalit : produits digitaux, applications mobiles privées, outils internes, data & IA.

## Stack

| Besoin | Techno |
| --- | --- |
| Framework | **Next.js 16** (App Router, rendu statique + server actions) |
| Langage | **TypeScript** (strict) |
| Style | **Tailwind CSS 4** avec les couleurs de la charte (Givre, Acier, Electrik) |
| Typographie | **Sora** (titres, police de marque) et **Hanken Grotesk** (texte) |
| Icônes | **Phosphor Icons**, et **Simple Icons** pour les logos des technologies |
| Composants accessibles | **Radix UI** (onglets des services, accordéon de la FAQ) |
| 3D | **React Three Fiber** + **drei** (Three.js) |
| Animations | **Motion** (ex Framer Motion) |
| Formulaire | Server action + validation **Zod** + envoi SMTP via **Nodemailer** |
| SEO | Metadata Next, Open Graph généré, sitemap, robots, données structurées schema.org |

## Développement

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
```

Copier `.env.example` en `.env.local` pour tester l'envoi du formulaire.

## Déploiement sur Dokploy

**Option recommandée : Dockerfile.** Dans l'application Dokploy → *General* → *Build Type* : choisir **Dockerfile** (chemin `Dockerfile`). L'image est légère (build `standalone`) et écoute sur le port **3000**.

**Option Nixpacks** : fonctionne aussi grâce à `nixpacks.toml` (Node 22, commande `npm run start`). Port **3000**.

Dans les deux cas, renseigner les variables d'environnement dans l'onglet *Environment* (voir `.env.example`) :

- `NEXT_PUBLIC_SITE_URL` — URL publique, ex. `https://www.sovalit.com`
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` — compte email qui envoie les demandes
- `CONTACT_TO_EMAIL` — adresse qui reçoit les demandes

Sans configuration SMTP, le site fonctionne mais le formulaire invite le visiteur à écrire directement par email.

## Où modifier quoi

- `lib/site.ts` : **tous les textes** (services, méthode, FAQ…) et les coordonnées
- `app/globals.css` : couleurs et polices de la charte
- `components/sections/*` : chaque section de la page d'accueil
- `components/mockups/*` : maquettes d'interface affichées dans les services et la section data (contenu d'exemple)
- `components/three/hero-scene.tsx` : scène 3D du hero (le « C » de la marque dans les nuages)
- `app/actions/contact.ts` : envoi des demandes de contact
- `app/mentions-legales/page.tsx` : mentions légales (champs `[à compléter]`)
