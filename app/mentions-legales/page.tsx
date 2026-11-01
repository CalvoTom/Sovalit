import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Mentions légales", alternates: { canonical: "/mentions-legales" } };

// Les champs entre crochets sont à compléter avec les informations officielles de l'entreprise.
export default function MentionsLegales() {
  return (
    <section className="container-site max-w-3xl pt-40 pb-24 [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-semibold [&_p]:mb-3">
      <h1 className="text-[clamp(2.4rem,5vw,3.6rem)] font-bold">Mentions légales</h1>

      <h2>Éditeur du site</h2>
      <p>Sovalit — [forme juridique] au capital de [montant] €</p>
      <p>Siège social : [adresse]</p>
      <p>SIRET : [numéro] — RCS [ville] — TVA intracommunautaire : [numéro]</p>
      <p>Directeur de la publication : [nom]</p>
      <p>Contact : <a className="text-electrik" href={`mailto:${site.email}`}>{site.email}</a> — {site.phone}</p>

      <h2>Hébergement</h2>
      <p>[Nom de l&apos;hébergeur] — [adresse] — [téléphone]</p>

      <h2>Propriété intellectuelle</h2>
      <p>L&apos;ensemble des contenus de ce site (textes, visuels, logo, code) est la propriété exclusive de Sovalit, sauf mention contraire. Toute reproduction sans autorisation est interdite.</p>

      <h2>Données personnelles</h2>
      <p>Les informations transmises via le formulaire de contact sont utilisées uniquement pour répondre à votre demande et ne sont jamais cédées à des tiers. Elles sont conservées au maximum 3 ans après le dernier échange.</p>
      <p>Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos données en écrivant à {site.email}.</p>

      <h2>Cookies</h2>
      <p>Ce site n&apos;utilise aucun cookie de suivi ou publicitaire.</p>
    </section>
  );
}
