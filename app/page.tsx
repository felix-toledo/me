import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TechStack from "@/components/TechStack";
import SelectedWorks from "@/components/SelectedWorks";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";

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
