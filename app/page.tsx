import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { Services } from "@/components/sections/services";
import { DataAI } from "@/components/sections/data-ai";
import { Process } from "@/components/sections/process";
import { Why } from "@/components/sections/why";
import { Faq } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <div id="top">
      <Hero />
      <Marquee />
      <Services />
      <DataAI />
      <Process />
      <Why />
      <Faq />
      <Contact />
    </div>
  );
}
