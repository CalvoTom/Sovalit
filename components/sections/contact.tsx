import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "./contact-form";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 px-2 pb-[clamp(60px,8vw,100px)] sm:px-4">
      <div className="relative mx-auto grid max-w-[1280px] gap-10 overflow-hidden rounded-[28px] bg-ink p-[clamp(28px,7vw,88px)] text-white/70 md:grid-cols-2 md:gap-16 md:rounded-[40px]">
        <div aria-hidden className="brand-ring -bottom-[420px] -left-[300px] w-[640px] -rotate-[35deg] border-[110px] border-electrik border-t-transparent" />
        <Reveal className="relative">
          <h2 className="h2 mb-6 text-white">
            Prêt à passer
            <br />
            au niveau supérieur&nbsp;?
          </h2>
          <p className="max-w-[28rem] text-[1.1rem]">
            Parlez-moi de votre projet. Je vous réponds sous 24&nbsp;h avec une première analyse, sans engagement.
          </p>
          <div className="mt-10 grid gap-3">
            {[
              { label: "Téléphone", value: site.phone, href: site.phoneHref },
              { label: "Email", value: site.email, href: `mailto:${site.email}` },
            ].map((c) => (
              <a key={c.label} href={c.href} className="flex flex-col font-title text-[1.4rem] font-semibold text-white transition-colors hover:text-electrik-light">
                <span className="font-sans text-[0.8rem] font-medium tracking-[0.1em] text-white/50 uppercase">{c.label}</span>
                {c.value}
              </a>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1} className="relative">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
