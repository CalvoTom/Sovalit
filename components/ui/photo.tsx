import Image from "next/image";
import type { Photo as PhotoType } from "@/lib/photos";

type Props = { photo: PhotoType; sizes: string; priority?: boolean; className?: string };

/** Photo plein cadre (le parent doit être positionné). Fond neutre si la photo n'est pas encore définie. */
export function Photo({ photo, sizes, priority, className = "" }: Props) {
  if (!photo.src) {
    return <div aria-hidden className={`absolute inset-0 bg-[linear-gradient(160deg,#cfe3f7,#e9eef6_60%,#f5f6fa)] ${className}`} />;
  }
  return <Image src={photo.src} alt={photo.alt} fill sizes={sizes} priority={priority} className={`object-cover ${className}`} />;
}
