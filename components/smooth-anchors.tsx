"use client";

import { useEffect } from "react";

/**
 * Gère les liens vers une section de la page (« /#contact », « #methode », logo « / »…).
 * Chaque clic fait défiler en douceur jusqu'à la cible, puis l'ancre est retirée de l'adresse :
 * recliquer sur le même lien fonctionne toujours, même après être remonté.
 */
export function SmoothAnchors() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.("a");
      if (!link || link.target === "_blank") return;
      const href = link.getAttribute("href");
      if (!href) return;

      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname) return;

      const id = decodeURIComponent(url.hash.slice(1));
      // Lien vers la page elle-même (logo) ou vers « #top » : retour en haut
      const target = id && id !== "top" ? document.getElementById(id) : null;
      if (id && id !== "top" && !target) return;

      e.preventDefault();
      const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
      if (target) target.scrollIntoView({ behavior, block: "start" });
      else window.scrollTo({ top: 0, behavior });

      // Adresse propre, sans ancre, pour que le prochain clic soit toujours pris en compte
      window.history.replaceState(window.history.state, "", url.pathname + url.search);
      // Accessibilité : le focus suit la section atteinte
      if (target) {
        if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }
    };
    // Phase de capture : passe avant la navigation de next/link
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
