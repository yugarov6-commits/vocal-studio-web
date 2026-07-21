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
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2">
            <a
              href="https://cdn.poehali.dev/projects/2c2649a4-f97e-4608-8ac1-4bd4de8bd9d6/bucket/29c2e690-124b-4a5f-bdf3-536ea066e262.docx"
              target="_blank"
              rel="noopener noreferrer"
              className="font-oswald text-[10px] tracking-[0.2em] uppercase text-rock-ash hover:text-rock-gold underline underline-offset-2 transition-colors"
            >
              Публичная оферта
            </a>
            <a
              href="https://cdn.poehali.dev/projects/2c2649a4-f97e-4608-8ac1-4bd4de8bd9d6/bucket/769c6f68-e139-411a-8373-35ad7a2b1e66.docx"
              target="_blank"
              rel="noopener noreferrer"
              className="font-oswald text-[10px] tracking-[0.2em] uppercase text-rock-ash hover:text-rock-gold underline underline-offset-2 transition-colors"
            >
              Согласие на обработку персональных данных
            </a>
            <a
              href="https://cdn.poehali.dev/projects/2c2649a4-f97e-4608-8ac1-4bd4de8bd9d6/bucket/4d9707b2-91e1-4faf-bdaa-b48148c8eaa6.docx"
              target="_blank"
              rel="noopener noreferrer"
              className="font-oswald text-[10px] tracking-[0.2em] uppercase text-rock-ash hover:text-rock-gold underline underline-offset-2 transition-colors"
            >
              Политика обработки персональных данных
            </a>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="font-oswald text-[10px] tracking-[0.2em] uppercase text-rock-ash">
              © 2025 Театр Рока Артман & Ко. Все права защищены.
            </p>
            <a href="mailto:I@aartman.ru" className="font-oswald text-[10px] tracking-[0.2em] uppercase text-rock-ash hover:text-rock-gold transition-colors">
              I@aartman.ru
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}