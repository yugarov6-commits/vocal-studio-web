import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import HeroAboutSections from "./HeroAboutSections";
import ContentSections from "./ContentSections";

import AnimatedWaveCanvas from "@/components/AnimatedWaveCanvas";

function WaveDivider() {
  return (
    <div style={{ marginTop: "-1px", marginBottom: "-1px", lineHeight: 0, opacity: 0.6 }}>
      <AnimatedWaveCanvas height={48} />
    </div>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", direction: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#0a0a0a" }}>
      <NavBar scrolled={scrolled} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <HeroAboutSections />
      <WaveDivider />
      <ContentSections
        formData={formData}
        setFormData={setFormData}
        formSent={formSent}
        handleSubmit={handleSubmit}
      />
      <footer style={{ backgroundColor: "#080808", borderTop: "1px solid rgba(201,168,76,0.1)" }}>
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-oswald text-[10px] tracking-[0.2em] uppercase text-rock-ash">
            © 2025 Анна Артман. Все права защищены.
          </p>
          <a href="mailto:I@aartman.ru" className="font-oswald text-[10px] tracking-[0.2em] uppercase text-rock-ash hover:text-rock-gold transition-colors">
            I@aartman.ru
          </a>
          <p className="font-oswald text-[10px] tracking-[0.2em] uppercase text-rock-ash">
            Самозанятый · ИНН 121523125266
          </p>
        </div>
      </footer>
    </div>
  );
}