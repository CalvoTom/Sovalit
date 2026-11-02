/**
 * Photos du site (fichiers dans public/images).
 * Photos Unsplash, utilisables librement (licence Unsplash) ; le crédit est conservé ici par courtoisie.
 * `src: null` affiche une mise en page sans photo.
 * Pour ajouter une photo : déposer le fichier dans public/images, puis renseigner src et alt, par exemple
 *   method: { src: "/images/methode.jpg", alt: "Rendez-vous de cadrage avec un client" }
 * Fichiers attendus : methode.jpg, service-web.jpg, service-mobile.jpg, service-outils.jpg, service-ia.jpg
 */
export type Photo = { src: string | null; alt: string; credit?: { name: string; url: string } };

export const photos: Record<"method" | "web" | "mobile" | "tools" | "ai", Photo> = {
  method: { src: null, alt: "" },
  web: { src: null, alt: "" },
  mobile: { src: null, alt: "" },
  tools: { src: null, alt: "" },
  ai: { src: null, alt: "" },
};
