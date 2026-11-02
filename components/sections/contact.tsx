import { EnvelopeSimpleIcon, PhoneIcon } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/lib/site";
import { ContactForm } from "./contact-form";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-8 px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="grid gap-12 rounded-[28px] bg-givre px-5 py-16 sm:px-8 md:rounded-[36px] md:py-24 lg:grid-cols-[1fr_1.1fr] lg:gap-20 lg:px-16">
        <div className="lg:pt-4">
          <h2 className="max-w-[12ch] text-title">Parlons de votre projet.</h2>
          <p className="mt-6 max-w-[40ch] text-[1.05rem]">
            Décrivez votre besoin en quelques lignes. Vous recevez sous 24 h une première analyse et une proposition de
            rendez-vous, sans engagement.
          </p>
          <ul className="mt-10 grid gap-3">
            {[
              { icon: PhoneIcon, label: site.phone, href: site.phoneHref },
              { icon: EnvelopeSimpleIcon, label: site.email, href: `mailto:${site.email}` },
            ].map(({ icon: Icon, label, href }) => (
              <li key={href}>
                <a href={href} className="inline-flex items-center gap-3 font-display text-xl font-medium text-ink transition-colors hover:text-electrik">
                  <span className="grid size-10 place-items-center rounded-full bg-white ring-1 ring-line"><Icon className="size-[18px]" /></span>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
