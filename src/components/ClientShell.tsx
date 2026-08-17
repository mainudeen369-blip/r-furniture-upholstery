"use client";

import { LanguageProvider } from "@/context/LanguageContext";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Highlights } from "@/components/Highlights";
import { Gallery } from "@/components/Gallery";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer, WhatsAppFloat } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";

export function ClientShell() {
  return (
    <LanguageProvider>
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <Services />
        <Highlights />
        <Gallery />
        <About />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </LanguageProvider>
  );
}
