import { useEffect, useRef } from "react";
import AnimatedWaveCanvas from "@/components/AnimatedWaveCanvas";

function WaveVisualizer() {
  const bars = [4, 8, 12, 18, 24, 30, 24, 18, 14, 10, 7, 5, 8, 14, 22, 28, 32, 26, 18, 12, 8, 5, 9, 16, 24];
  return (
    <div className="flex items-end gap-[2px] h-10">
      {bars.map((h, i) => (
        <span
          key={i}
          className="wave-bar"
          style={{
            height: `${h}px`,
            animationDelay: `${i * 0.06}s`,
            opacity: 0.7 + (i % 3) * 0.1,
          }}
        />
      ))}
    </div>
  );
}

function SoundWaveSVG() {
  return (
    <svg viewBox="0 0 400 80" className="w-full opacity-20" preserveAspectRatio="none">
      <path
        d="M0,40 Q20,10 40,40 Q60,70 80,40 Q100,10 120,40 Q140,70 160,40 Q180,10 200,40 Q220,70 240,40 Q260,10 280,40 Q300,70 320,40 Q340,10 360,40 Q380,70 400,40"
        fill="none"
        stroke="#8b1a2a"
        strokeWidth="1.5"
      />
      <path
        d="M0,40 Q20,20 40,40 Q60,60 80,40 Q100,20 120,40 Q140,60 160,40 Q180,20 200,40 Q220,60 240,40 Q260,20 280,40 Q300,60 320,40 Q340,20 360,40 Q380,60 400,40"
        fill="none"
        stroke="#c9a227"
        strokeWidth="0.8"
        opacity="0.6"
      />
    </svg>
  );
}

export { SoundWaveSVG };

function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const STAR_COUNT = 180;
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.2,
      speed: Math.random() * 0.25 + 0.05,
      alpha: Math.random(),
      dAlpha: (Math.random() * 0.004 + 0.001) * (Math.random() > 0.5 ? 1 : -1),
      color: Math.random() > 0.7 ? "#a8851e" : Math.random() > 0.5 ? "#8b1a2a" : "#c0c0c8",
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        s.alpha += s.dAlpha;
        if (s.alpha >= 1) { s.alpha = 1; s.dAlpha *= -1; }
        if (s.alpha <= 0) { s.alpha = 0; s.dAlpha *= -1; }
        s.y -= s.speed;
        if (s.y < -2) { s.y = canvas.height + 2; s.x = Math.random() * canvas.width; }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.alpha * 0.85;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
    />
  );
}

function Equalizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const BAR_COUNT = 80;
    const phases = Array.from({ length: BAR_COUNT }, () => Math.random() * Math.PI * 2);
    const speeds = Array.from({ length: BAR_COUNT }, () => 0.015 + Math.random() * 0.025);
    const amps = Array.from({ length: BAR_COUNT }, () => 0.2 + Math.random() * 0.8);
    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      const barW = w / BAR_COUNT;
      const maxH = h * 0.38;
      const centerY = h * 0.72;

      for (let i = 0; i < BAR_COUNT; i++) {
        phases[i] += speeds[i];
        const wave =
          Math.sin(phases[i]) * 0.5 +
          Math.sin(phases[i] * 1.7 + t * 0.8) * 0.3 +
          Math.sin(phases[i] * 0.5 + t * 1.2) * 0.2;
        const barH = Math.abs(wave) * maxH * amps[i] + 2;
        const x = i * barW + barW * 0.15;
        const bw = barW * 0.7;

        const ratio = i / BAR_COUNT;
        const r = Math.round(139 + (168 - 139) * ratio);
        const g = Math.round(26 + (133 - 26) * ratio);
        const b = Math.round(42 + (30 - 42) * ratio);
        const alpha = 0.18 + Math.abs(wave) * 0.35;

        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.fillRect(x, centerY - barH, bw, barH);
        ctx.fillRect(x, centerY, bw, barH * 0.4);
      }

      t += 0.018;
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
    />
  );
}

export default function HeroAboutSections() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

        {/* Фото на весь фон */}
        <div className="absolute inset-0">
          <img
            src="https://cdn.poehali.dev/projects/2c2649a4-f97e-4608-8ac1-4bd4de8bd9d6/bucket/24816572-50fa-4d7b-a522-fb859536e950.jpg"
            alt="Анна Артман"
            className="w-full h-full object-cover object-top"
            style={{ filter: "brightness(0.45) contrast(1.1)" }}
          />
        </div>

        {/* Затемняющие градиенты */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(8,8,8,0.5) 0%, rgba(8,8,8,0.1) 40%, rgba(8,8,8,0.3) 70%, rgba(8,8,8,0.85) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(122,21,37,0.15) 0%, transparent 70%)" }} />
        <Equalizer />

        {/* Декоративные линии */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.5) 50%, transparent)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(122,21,37,0.5) 50%, transparent)" }} />

        {/* Контент по центру */}
        <div className="relative z-10 w-full flex flex-col items-center justify-center px-6 pt-24 pb-24 text-center">

          {/* Логотип */}
          <div className="animate-fade-in mb-8 mt-16 w-full flex justify-center">
            <img
              src="https://cdn.poehali.dev/projects/2c2649a4-f97e-4608-8ac1-4bd4de8bd9d6/bucket/9303eaa8-b5a6-41c7-8fdf-8d0710bfeb41.png"
              alt="Театр Рока Артман & Ко"
              className="w-full max-w-6xl"
              style={{
                mixBlendMode: "screen",
                filter: "contrast(2) brightness(3) drop-shadow(0 0 60px rgba(201,168,76,0.7))",
              }}
            />
          </div>

          {/* Слоган */}
          <p className="font-cormorant text-xl md:text-2xl italic mb-10 animate-fade-in scroll-delay-2"
            style={{ color: "rgba(201,168,76,0.85)", textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}>
            Обучение. Книги. Выступления. Сообщество.
          </p>

          {/* Кнопка */}
          <div className="animate-fade-in scroll-delay-3 mb-14">
            <a href="#courses" className="btn-gold text-base px-10 py-4">Все курсы и книги</a>
          </div>

          {/* Статы */}
          <div className="flex gap-12 animate-fade-in scroll-delay-4">
            {[{ num: "20+", label: "лет" }, { num: "500+", label: "учеников" }, { num: "6", label: "направлений" }].map((s) => (
              <div key={s.label}>
                <div className="font-cormorant font-semibold text-3xl text-gradient-gold">{s.num}</div>
                <div className="font-oswald text-[9px] tracking-[0.3em] uppercase mt-1" style={{ color: "rgba(208,208,220,0.5)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Скролл-хинт */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in scroll-delay-5">
          <div className="w-px h-10 bg-gradient-to-b from-rock-gold/50 to-transparent" />
          <span className="font-oswald text-[8px] tracking-[0.4em] uppercase" style={{ color: "rgba(201,168,76,0.4)" }}>scroll</span>
        </div>
      </section>

      {/* ── РАЗДЕЛИТЕЛЬ ── */}
      <div className="divider-gold" />

      {/* ABOUT */}
      <section id="about" className="relative overflow-hidden py-28" style={{ backgroundColor: "#080808" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute right-0 top-0 w-[600px] h-[600px]" style={{ background: "radial-gradient(circle at 100% 0%, rgba(201,168,76,0.05) 0%, transparent 60%)" }} />
          <div className="absolute left-0 bottom-0 w-[400px] h-[400px]" style={{ background: "radial-gradient(circle at 0% 100%, rgba(122,21,37,0.07) 0%, transparent 60%)" }} />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-rock-gold/60" />
                <p className="section-eyebrow">О студии</p>
              </div>
              <h2 className="section-title mb-10 line-gold" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
                Театр Рока <em>Артман & Ко</em>
              </h2>
              <div className="space-y-5 font-cormorant text-lg leading-relaxed" style={{ color: "rgba(208,208,220,0.82)" }}>
                <p>Авторская творческая студия, основанная Анной Артман — специалистом по всем видам экстремальных техник вокала, горловому и обертональному пению, джазу и современной эстраде.</p>
                <p>Здесь учат не просто петь — учат пользоваться голосом как инструментом: понимать механику, управлять телом и мозгом, выходить на сцену с уверенностью.</p>
                <p>В каталоге студии — онлайн-курсы, авторские методички, книги и мастер-классы для любого уровня: от полного новичка до практикующего музыканта.</p>
                <p style={{ color: "#c9a84c" }} className="italic font-semibold">
                  Методика «Чем он это сделал» — на основе CVT, EVT, SLS и BVT, адаптированная для самостоятельного обучения.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6 mt-12 pt-10" style={{ borderTop: "1px solid rgba(201,168,76,0.12)" }}>
                {[{ num: "20+", label: "лет практики" }, { num: "500+", label: "учеников" }, { num: "6", label: "направлений" }].map((stat) => (
                  <div key={stat.label}>
                    <div className="font-cormorant text-4xl font-semibold text-gradient-gold mb-1">{stat.num}</div>
                    <div className="font-oswald text-[9px] tracking-[0.3em] uppercase" style={{ color: "rgba(201,168,76,0.45)" }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center items-center relative" style={{ margin: "-4rem -2rem" }}>
              <div className="absolute inset-0 pointer-events-none" style={{
                background: "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)"
              }} />
              <img
                src="https://cdn.poehali.dev/projects/2c2649a4-f97e-4608-8ac1-4bd4de8bd9d6/bucket/37875366-5357-467d-8608-88ccaf3906ed.JPG"
                alt="Rock & Extreme Vocal Coach"
                className="w-full object-contain relative z-10"
                style={{
                  maxWidth: "120%",
                  filter: "contrast(1.05) sepia(0.1) drop-shadow(0 0 40px rgba(201,168,76,0.15)) drop-shadow(0 0 80px rgba(122,21,37,0.15))",
                  maskImage: "radial-gradient(ellipse 80% 82% at 50% 50%, black 45%, transparent 100%)",
                  WebkitMaskImage: "radial-gradient(ellipse 80% 82% at 50% 50%, black 45%, transparent 100%)",
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}