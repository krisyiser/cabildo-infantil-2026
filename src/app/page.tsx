import Hero from "@/components/Hero";
import Bases from "@/components/Bases";
import RegistroForm from "@/components/RegistroForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <div className="bg-gradient-to-b from-black to-[#0a0a0a]">
        <Bases />
        <RegistroForm />
      </div>
      <Footer />
    </main>
  );
}
