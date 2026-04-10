import Hero from "@/components/Hero";
import Bases from "@/components/Bases";
import RegistroForm from "@/components/RegistroForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FFFDF5]">
      <Hero />
      <div className="bg-gradient-to-b from-[#FFFDF5] via-[#FCF8E8] to-[#F5F0DC]">
        <Bases />
        <RegistroForm />
      </div>
      <Footer />
    </main>
  );
}
