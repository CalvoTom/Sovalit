"use client";

import { motion, useScroll, useSpring, useTransform, type MotionStyle } from "motion/react";

/** Distance de défilement (px) sur laquelle l'encoche se referme. Partagée avec la navigation. */
export const NOTCH_CLOSE_DISTANCE = 140;

const NAV_W = 860; // largeur max de la navbar
const NAV_H = 52; // hauteur de la navbar
const GAP = 12; // air autour de la navbar quand l'encoche est ouverte
const RADIUS = 28; // arrondis de l'encoche ouverte

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (a: number, b: number) => (p: number) => {
  const t = clamp01((p - a) / (b - a));
  return t * t * (3 - 2 * t);
};

/**
 * Encoche de la carte du hero dans laquelle se loge la navigation (grand écran).
 *
 * Au défilement, elle reste accrochée à la navbar : ses raccords avec le bord disparaissent,
 * ses coins hauts s'arrondissent, puis le contour se resserre jusqu'à épouser la capsule et
 * se fond dedans. La carte redevient un rectangle complet. Tout s'inverse en remontant.
 */
export function HeroNotch() {
  const { scrollY } = useScroll();
  // Suit exactement le défilement pour rester collée à la navbar (pas de ressort ici)
  const y = useTransform(scrollY, (s) => Math.min(Math.max(s, 0), NOTCH_CLOSE_DISTANCE));
  // La forme, elle, est lissée par un ressort
  const raw = useTransform(scrollY, [0, NOTCH_CLOSE_DISTANCE], [0, 1], { clamp: true });
  const p = useSpring(raw, { stiffness: 220, damping: 30, mass: 0.7 });

  const yPx = useTransform(y, (v) => `${v}px`);
  const fillet = useTransform(p, (v) => RADIUS * (1 - smooth(0, 0.18)(v)));
  const filletPx = useTransform(fillet, (r) => `${r}px`);
  const topRadius = useTransform(p, (v) => (NAV_H / 2) * smooth(0.05, 0.4)(v));
  const margin = useTransform(p, (v) => GAP * (1 - smooth(0.15, 0.8)(v)));
  const width = useTransform(margin, (m) => NAV_W + 2 * m);
  const height = useTransform(margin, (m) => NAV_H + m);
  const bottomRadius = useTransform(p, (v) => RADIUS - (RADIUS - NAV_H / 2) * smooth(0.15, 0.8)(v));
  const opacity = useTransform(p, (v) => 1 - smooth(0.72, 1)(v));
  // Liaison blanche entre le bord de la carte et l'encoche, qui s'efface pendant le détachement
  const neckOpacity = useTransform(p, (v) => 1 - smooth(0.08, 0.35)(v));

  const filletStyle = (side: "left" | "right"): React.CSSProperties => ({
    position: "absolute",
    // Les raccords restent attachés au bord de la carte, qui remonte avec la page
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
      <motion.span
        style={{ position: "absolute", left: 0, right: 0, top: "calc(-1 * var(--y))", height: "var(--y)", background: "var(--color-paper)", opacity: neckOpacity }}
      />
      <span style={filletStyle("left")} />
      <span style={filletStyle("right")} />
    </motion.div>
  );
}
