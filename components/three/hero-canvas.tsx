"use client";

import dynamic from "next/dynamic";

/** Chargé uniquement côté navigateur, après le contenu : la 3D ne ralentit jamais l'affichage du texte. */
export const HeroCanvas = dynamic(() => import("./hero-scene"), { ssr: false, loading: () => null });
