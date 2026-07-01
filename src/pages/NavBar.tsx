import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { NAV_ITEMS } from "./data";

interface NavBarProps {
  scrolled: boolean;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
}

export default function NavBar({ scrolled, menuOpen, setMenuOpen }: NavBarProps) {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handler = () => {
      const sections = NAV_ITEMS.map(i => i.href.replace("#", ""));
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          return;
        }
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
        style={{
          background: scrolled
            ? "rgba(8,8,8,0.96)"
            : "rgba(8,8,8,0.75)",
          backdropFilter: scrolled ? "blur(20px)" : "blur(6px)",
          borderBottom: "1px solid rgba(201,168,76,0.12)",
          boxShadow: scrolled
            ? "0 1px 0 rgba(201,168,76,0.08), 0 8px 32px rgba(0,0,0,0.6)"
            : "none",
        }}
      >
        {/* Верхняя золотая линия */}
        {scrolled && (
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.5) 50%, transparent)" }} />
        )}

        <div className="w-full px-4 py-2 flex items-center justify-between gap-2">

          {/* Лого */}
          <a href="#" className="flex items-center select-none group shrink-0">
            <img
              src="https://cdn.poehali.dev/projects/2c2649a4-f97e-4608-8ac1-4bd4de8bd9d6/bucket/1dffc1b8-8ec4-4dd2-b16b-872335c0b4e4.png"
              alt="Театр Рока Артман & Ко"
              className="h-20 w-auto object-contain transition-all duration-500 group-hover:scale-105"
              style={{
                filter: "invert(1) sepia(1) saturate(4) hue-rotate(5deg) brightness(1.8) contrast(1.3) drop-shadow(0 0 20px rgba(201,168,76,0.8))",
                mixBlendMode: "screen",
              }}
            />
          </a>

          {/* Навигация */}
          <div className="hidden lg:flex items-center gap-3 flex-1 justify-center">
            {NAV_ITEMS.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className="relative font-oswald text-[10px] tracking-[0.2em] uppercase transition-all duration-300 whitespace-nowrap"
                  style={{
                    color: isActive ? "#c9a84c" : "rgba(208,208,220,0.5)",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#c9a84c"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = isActive ? "#c9a84c" : "rgba(208,208,220,0.5)"; }}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-px"
                      style={{ background: "linear-gradient(90deg, transparent, #c9a84c, transparent)" }} />
                  )}
                </a>
              );
            })}
          </div>

          {/* Кнопки справа */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <a href="#reviews" className="btn-rock text-[9px] py-2 px-4">
              Отзывы
            </a>

          </div>

          {/* Бургер */}
          <button
            className="lg:hidden transition-all duration-300 p-1"
            style={{ color: "rgba(201,168,76,0.8)" }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
      </nav>

      {/* Мобильное меню */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden flex flex-col"
          style={{ background: "rgba(8,8,8,0.98)", backdropFilter: "blur(20px)" }}
        >
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(122,21,37,0.15) 0%, transparent 60%)" }} />

          <div className="flex items-center justify-between px-6 py-4 relative z-10"
            style={{ borderBottom: "1px solid rgba(201,168,76,0.12)" }}>
            <img
              src="https://cdn.poehali.dev/projects/2c2649a4-f97e-4608-8ac1-4bd4de8bd9d6/bucket/1dffc1b8-8ec4-4dd2-b16b-872335c0b4e4.png"
              alt="Театр Рока Артман & Ко" className="h-14 w-auto object-contain" style={{ filter: "invert(1) sepia(1) saturate(4) hue-rotate(5deg) brightness(1.8) contrast(1.3) drop-shadow(0 0 12px rgba(201,168,76,0.5))", mixBlendMode: "screen" }}
            />
            <button onClick={() => setMenuOpen(false)} style={{ color: "rgba(201,168,76,0.7)" }}>
              <Icon name="X" size={22} />
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-center px-8 gap-1 relative z-10">
            {NAV_ITEMS.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                className="font-cormorant text-2xl italic py-3 transition-all duration-300 hover:pl-4"
                style={{
                  color: "rgba(208,208,220,0.7)",
                  borderBottom: "1px solid rgba(201,168,76,0.06)",
                  animationDelay: `${i * 0.05}s`,
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#c9a84c"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(208,208,220,0.7)"; }}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>


        </div>
      )}
    </>
  );
}