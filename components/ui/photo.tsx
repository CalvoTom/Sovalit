"use client";

import Image, { type ImageLoaderProps } from "next/image";
import type { Photo as PhotoType } from "@/lib/photos";

type Props = { photo: PhotoType; sizes: string; priority?: boolean; loading?: "eager" | "lazy"; className?: string };

/** Les photos Unsplash sont redimensionnées par le CDN d'Unsplash lui-même (WebP/AVIF, taille exacte). */
function unsplashLoader({ src, width, quality }: ImageLoaderProps) {
  return `${src}&w=${width}&q=${quality ?? 75}&auto=format&fit=max`;
}

/** Photo plein cadre (le parent doit être positionné). */
export function Photo({ photo, sizes, priority, loading, className = "" }: Props) {
  if (!photo.src) {
    return <div aria-hidden className={`absolute inset-0 bg-[linear-gradient(160deg,#cfe3f7,#e9eef6_60%,#f5f6fa)] ${className}`} />;
  }
  const isUnsplash = photo.src.startsWith("https://images.unsplash.com/");
  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      fill
      sizes={sizes}
      priority={priority}
      loading={priority ? undefined : loading}
      loader={isUnsplash ? unsplashLoader : undefined}
      style={photo.color ? { backgroundColor: photo.color } : undefined}
      className={`object-cover ${className}`}
    />
  );
}
