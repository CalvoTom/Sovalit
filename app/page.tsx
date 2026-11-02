import { Hero } from "@/components/sections/hero";
import { Statement } from "@/components/sections/statement";
import { Services } from "@/components/sections/services";
import { DataAI } from "@/components/sections/data-ai";
import { Process } from "@/components/sections/process";
import { Faq } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Statement />
      <Services />
      <DataAI />
      <Process />
      <Faq />
      <Contact />
    </>
  );
}
