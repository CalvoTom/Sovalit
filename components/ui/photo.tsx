import Image from "next/image";
import type { Photo as PhotoType } from "@/lib/photos";

type Props = { photo: PhotoType; sizes: string; priority?: boolean; className?: string };

/** Photo plein cadre (le parent doit être positionné), avec le crédit du photographe. */
export function Photo({ photo, sizes, priority, className = "" }: Props) {
  if (!photo.src) {
    return <div aria-hidden className={`absolute inset-0 bg-[linear-gradient(160deg,#cfe3f7,#e9eef6_60%,#f5f6fa)] ${className}`} />;
  }
  return (
    <>
      <Image src={photo.src} alt={photo.alt} fill sizes={sizes} priority={priority} className={`object-cover ${className}`} />
      {photo.credit && (
        <p className="absolute right-3 bottom-3 rounded-full bg-black/35 px-2.5 py-1 text-[11px] text-white/85 backdrop-blur-sm">
          Photo{" "}
          <a href={photo.credit.url} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">
            {photo.credit.name}
          </a>{" "}
          sur{" "}
          <a href="https://unsplash.com/?utm_source=sovalit&utm_medium=referral" target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">
            Unsplash
          </a>
        </p>
      )}
    </>
  );
}
