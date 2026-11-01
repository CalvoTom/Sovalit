import { LinkButton } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container-site grid min-h-[80svh] place-content-center justify-items-start gap-6 pt-32">
      <p className="font-title text-[clamp(5rem,16vw,10rem)] leading-none font-extrabold tracking-tighter text-electrik">404</p>
      <h1 className="text-[clamp(1.8rem,4vw,2.6rem)] font-bold">Cette page n&apos;existe pas.</h1>
      <LinkButton href="/" arrow>Retour à l&apos;accueil</LinkButton>
    </section>
  );
}
