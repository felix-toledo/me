import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TechStack from "@/components/TechStack";
import SelectedWorks from "@/components/SelectedWorks";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import me from "@/data/me.json";

export const metadata: Metadata = {
  title: `${me.personal.name} | Full-Stack Engineer`,
  description: `Full-stack engineer specialized in Next.js, Node.js, and AI integrations. ${me.personal.mantra} Based in ${me.personal.location}.`,
  alternates: { canonical: me.siteUrl },
};

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-16 pb-24 md:pb-0">
        <Hero />
        <TechStack />
        <SelectedWorks />
        <ContactCTA />
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
