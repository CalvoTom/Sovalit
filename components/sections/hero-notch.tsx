"use client";

import { motion, useScroll, useTransform, type MotionStyle } from "motion/react";

/** Distance de défilement (px) sur laquelle l'encoche se referme. Partagée avec la navigation. */
export const NOTCH_CLOSE_DISTANCE = 140;

const NAV_TOP = 16; // position de la navbar (et du haut de la carte, page en haut)
const NAV_W = 860; // largeur max de la navbar
const NAV_H = 52; // hauteur de la navbar
const GAP = 12; // air autour de la navbar quand l'encoche est ouverte
const RADIUS = 28; // arrondis de l'encoche ouverte

/** Courbe douce entre a et b (en px de défilement), 0 avant a, 1 après b. */
const smooth = (a: number, b: number) => (s: number) => {
  const t = Math.min(1, Math.max(0, (s - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
const fillets = smooth(0, NAV_TOP); // les raccords disparaissent avec le bord de la carte
const detach = smooth(20, 70); // l'encoche se décroche du haut et arrondit ses coins
const tighten = smooth(50, 115); // le contour se resserre sur la navbar
const fade = smooth(110, NOTCH_CLOSE_DISTANCE); // il se fond dans la navbar

/** Haut de l'encoche dans la fenêtre : collé au bord de la carte, puis au haut de l'écran, puis à la navbar. */
const notchTop = (s: number) => Math.max(NAV_TOP - s, 0) + NAV_TOP * detach(s) * (s > NAV_TOP ? 1 : 0);

/**
 * Encoche de la carte du hero dans laquelle se loge la navigation (grand écran).
 * Pilotée directement par le défilement (aucun retard) et réversible :
 * raccords qui partent avec le bord de la carte, décrochage aux coins arrondis,
 * contour qui se resserre sur la capsule puis s'y fond. La carte redevient un rectangle complet.
 */
export function HeroNotch() {
  const { scrollY } = useScroll();
  const s = useTransform(scrollY, (v) => Math.min(Math.max(v, 0), NOTCH_CLOSE_DISTANCE));

  // Décalage par rapport au haut de la carte (qui remonte de s pixels)
  const y = useTransform(s, (v) => notchTop(v) - (NAV_TOP - v));
  const margin = useTransform(s, (v) => GAP * (1 - tighten(v)));
  const height = useTransform(s, (v) => NAV_TOP + NAV_H + GAP * (1 - tighten(v)) - notchTop(v));
  const width = useTransform(margin, (m) => NAV_W + 2 * m);
  const topRadius = useTransform(s, (v) => (NAV_H / 2) * detach(v));
  const bottomRadius = useTransform(s, (v) => RADIUS - (RADIUS - NAV_H / 2) * tighten(v));
  const opacity = useTransform(s, (v) => 1 - fade(v));
  const filletPx = useTransform(s, (v) => `${RADIUS * (1 - fillets(v))}px`);
  const yPx = useTransform(y, (v) => `${v}px`);

  const filletStyle = (side: "left" | "right"): React.CSSProperties => ({
    position: "absolute",
    // Les raccords restent attachés au bord de la carte
    top: "calc(-1 * var(--y))",
    [side]: "calc(-1 * var(--r))",
    width: "var(--r)",
    height: "var(--r)",
    background: `radial-gradient(circle at ${side === "left" ? "0" : "100%"} 100%, transparent calc(var(--r) - 0.5px), var(--color-paper) var(--r))`,
  });

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute top-0 left-1/2 hidden bg-paper will-change-transform lg:block"
      style={
        {
          x: "-50%",
          y,
          width,
          height,
          opacity,
          borderTopLeftRadius: topRadius,
          borderTopRightRadius: topRadius,
          borderBottomLeftRadius: bottomRadius,
          borderBottomRightRadius: bottomRadius,
          "--r": filletPx,
          "--y": yPx,
        } as MotionStyle
      }
    >
      <span style={filletStyle("left")} />
      <span style={filletStyle("right")} />
    </motion.div>
  );
}
