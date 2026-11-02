/**
 * Photos du site (fichiers dans public/images).
 * Photos Unsplash, utilisables librement (licence Unsplash) ; le crédit est conservé ici par courtoisie.
 * `src: null` affiche un fond neutre en attendant la photo.
 */
export type Photo = { src: string | null; alt: string; credit?: { name: string; url: string } };

export const photos: Record<"hero" | "method" | "web" | "mobile" | "tools" | "ai", Photo> = {
  hero: { src: null, alt: "" },
  method: { src: null, alt: "" },
  web: { src: null, alt: "" },
  mobile: { src: null, alt: "" },
  tools: { src: null, alt: "" },
  ai: { src: null, alt: "" },
};
