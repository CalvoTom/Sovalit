/**
 * Photos du site, issues d'Unsplash (licence Unsplash : usage libre, y compris commercial).
 * Servies depuis le CDN d'Unsplash comme le demandent leurs règles d'API ; le photographe est crédité sur chaque photo.
 * Pour utiliser une photo à vous : déposez-la dans public/images et indiquez son chemin dans `src` (sans `credit`).
 */
export type Photo = {
  src: string | null;
  alt: string;
  credit?: { name: string; url: string };
};

const unsplash = (id: string) => `https://images.unsplash.com/${id}?ixlib=rb-4.1.0&fm=jpg&crop=entropy&cs=srgb&w=1800&q=80`;
const ref = "?utm_source=sovalit&utm_medium=referral";

export const photos: Record<"method" | "web" | "mobile" | "tools" | "ai", Photo> = {
  method: {
    src: unsplash("photo-1690264461712-d630b81890a4"),
    alt: "Deux personnes échangent autour d'un ordinateur portable dans un bureau",
    credit: { name: "Walls.io", url: `https://unsplash.com/@walls_io${ref}` },
  },
  web: {
    src: unsplash("photo-1633113092754-523fd2d9a90c"),
    alt: "Une personne consulte un site sur son ordinateur portable, une boisson chaude à la main",
    credit: { name: "Microsoft Edge", url: `https://unsplash.com/@microsoftedge${ref}` },
  },
  mobile: {
    src: unsplash("photo-1764795850513-fa8a469a4600"),
    alt: "Une employée vérifie le stock en rayon avec une tablette",
    credit: { name: "Cova Software", url: `https://unsplash.com/@covasoftware${ref}` },
  },
  tools: {
    src: unsplash("photo-1581093206409-01076de81a1b"),
    alt: "Une ingénieure travaille sur ses plans depuis un ordinateur portable",
    credit: { name: "ThisisEngineering", url: `https://unsplash.com/@thisisengineering${ref}` },
  },
  ai: {
    src: unsplash("photo-1707762890671-52ef6d6f51e7"),
    alt: "Une personne prend des notes à côté d'un écran affichant des graphiques",
    credit: { name: "Jakub Żerdzicki", url: `https://unsplash.com/@jakubzerdzicki${ref}` },
  },
};
