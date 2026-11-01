# Sovalit — site vitrine

Site one-page de Sovalit (produits digitaux, outils internes, data & IA).
Vite + Three.js, sans framework : du HTML/CSS/JS simple à faire évoluer.

## Lancer en local

```bash
npm install
npm run dev
```

## Construire pour la production

```bash
npm run build
```

Le dossier `dist/` est statique : il se déploie tel quel sur Netlify, Vercel, Cloudflare Pages, GitHub Pages ou OVH.

## Où modifier quoi

- `index.html` : tous les textes et sections
- `src/style.css` : charte (couleurs Givre / Acier / Electrik, polices Sora / Montserrat), mise en page
- `src/hero3d.js` : scène 3D du hero (le « C » de la marque et les objets flottants)
- `src/main.js` : menu mobile, animations au scroll, formulaire (ouvre le client mail vers `contact@sovalit.com`)
