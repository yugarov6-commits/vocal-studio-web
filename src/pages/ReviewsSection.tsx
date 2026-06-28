import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const REVIEWS_URL = "https://functions.poehali.dev/8fceccaa-af08-47b6-a466-3d235812262d";

interface Review {
  id: number;
  name: string;
  course: string | null;
  text: string;
  rating: number;
  created_at: string;
}

function StarRating({ value, onChange }: { value: number; onChange?: (v: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange?.(star)}
          className={onChange ? "cursor-pointer" : "cursor-default"}
          style={{ background: "none", border: "none", padding: 0 }}
        >
          <Icon
            name="Star"
            size={20}
            style={{ color: star <= value ? "var(--gold)" : "rgba(201,168,76,0.25)", fill: star <= value ? "var(--gold)" : "none" }}
          />
        </button>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: "", course: "", text: "", rating: 5 });

  useEffect(() => {
    fetch(REVIEWS_URL)
      .then((r) => r.json())
      .then((data) => {
        const parsed = typeof data === "string" ? JSON.parse(data) : data;
        setReviews(parsed.reviews || []);
      })
      .catch(() => {});
  }, [done]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.text.trim()) return;
    setSending(true);
    try {
      await fetch(REVIEWS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setDone(true);
      setShowForm(false);
      setForm({ name: "", course: "", text: "", rating: 5 });
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="reviews" className="py-28" style={{ background: "linear-gradient(180deg, transparent 0%, rgba(201,168,76,0.03) 50%, transparent 100%)" }}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Заголовок */}
        <div className="text-center mb-16">
          <p className="section-eyebrow mb-4">Ученики об Анне</p>
          <h2 className="section-title"><em>Отзывы</em></h2>
        </div>

        {/* Карточки отзывов */}
        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {reviews.map((r) => (
              <div key={r.id} className="card-rock rounded-lg p-6 flex flex-col gap-3">
                <StarRating value={r.rating} />
                <p style={{ color: "var(--silver)", fontFamily: "Cormorant, serif", fontSize: "1.05rem", lineHeight: 1.6 }}>
                  «{r.text}»
                </p>
                <div className="mt-auto pt-3" style={{ borderTop: "1px solid rgba(201,168,76,0.12)" }}>
                  <p style={{ color: "var(--gold)", fontFamily: "Oswald, sans-serif", fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    {r.name}
                  </p>
                  {r.course && (
                    <p style={{ color: "var(--silver-dim)", fontSize: "0.75rem", marginTop: "2px" }}>{r.course}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center mb-12" style={{ color: "var(--silver-dim)" }}>
            Будьте первым, кто оставит отзыв!
          </p>
        )}

        {/* Кнопка / форма */}
        <div className="flex justify-center">
          {!showForm && !done && (
            <button className="btn-gold" onClick={() => setShowForm(true)}>
              Оставить отзыв
            </button>
          )}
          {done && (
            <p style={{ color: "var(--gold)", fontFamily: "Oswald, sans-serif", letterSpacing: "0.1em" }}>
              Спасибо за ваш отзыв!
            </p>
          )}
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-10 card-rock rounded-lg p-8 flex flex-col gap-5">
            <h3 style={{ color: "var(--gold)", fontFamily: "Cormorant, serif", fontSize: "1.5rem", fontWeight: 300 }}>
              Ваш отзыв
            </h3>

            <div>
              <label className="section-eyebrow block mb-2">Ваше имя *</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Имя"
                className="w-full rounded px-4 py-3"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.2)", color: "var(--silver)", outline: "none", fontFamily: "Cormorant, serif", fontSize: "1rem" }}
              />
            </div>

            <div>
              <label className="section-eyebrow block mb-2">Курс или услуга</label>
              <input
                value={form.course}
                onChange={(e) => setForm({ ...form, course: e.target.value })}
                placeholder="Например, Харизма 2.0"
                className="w-full rounded px-4 py-3"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.2)", color: "var(--silver)", outline: "none", fontFamily: "Cormorant, serif", fontSize: "1rem" }}
              />
            </div>

            <div>
              <label className="section-eyebrow block mb-2">Оценка</label>
              <StarRating value={form.rating} onChange={(v) => setForm({ ...form, rating: v })} />
            </div>

            <div>
              <label className="section-eyebrow block mb-2">Отзыв *</label>
              <textarea
                required
                value={form.text}
                onChange={(e) => setForm({ ...form, text: e.target.value })}
                placeholder="Расскажите о вашем опыте..."
                rows={4}
                className="w-full rounded px-4 py-3 resize-none"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.2)", color: "var(--silver)", outline: "none", fontFamily: "Cormorant, serif", fontSize: "1rem" }}
              />
            </div>

            <div className="flex gap-3">
              <button type="submit" className="btn-gold" disabled={sending}>
                {sending ? "Отправляю..." : "Отправить"}
              </button>
              <button type="button" className="btn-rock" onClick={() => setShowForm(false)}>
                Отмена
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
