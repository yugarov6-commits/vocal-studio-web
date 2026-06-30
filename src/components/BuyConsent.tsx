import { useState } from "react";
import Icon from "@/components/ui/icon";

interface BuyConsentProps {
  className?: string;
  buttonClassName?: string;
  onBuy?: () => void;
}

export default function BuyConsent({ className = "", buttonClassName = "", onBuy }: BuyConsentProps) {
  const [oferta, setOferta] = useState(false);
  const [personal, setPersonal] = useState(false);
  const ready = oferta && personal;

  return (
    <div className={className}>
      <div className="space-y-3 mb-5">
        <label className="flex items-start gap-3 cursor-pointer group">
          <button
            type="button"
            onClick={() => setOferta(!oferta)}
            className="flex-shrink-0 mt-0.5 w-5 h-5 border flex items-center justify-center transition-all"
            style={{
              borderColor: oferta ? "rgba(201,162,39,0.8)" : "rgba(255,255,255,0.2)",
              background: oferta ? "rgba(201,162,39,0.15)" : "transparent",
            }}
          >
            {oferta && <Icon name="Check" size={12} className="text-rock-gold" />}
          </button>
          <span className="font-cormorant text-rock-ash leading-snug" style={{ fontSize: "13px" }}>
            Я принимаю условия{" "}
            <a href="#" className="text-rock-gold underline underline-offset-2 hover:opacity-80 transition-opacity">
              Публичной оферты
            </a>
            .
          </span>
        </label>

        <label className="flex items-start gap-3 cursor-pointer group">
          <button
            type="button"
            onClick={() => setPersonal(!personal)}
            className="flex-shrink-0 mt-0.5 w-5 h-5 border flex items-center justify-center transition-all"
            style={{
              borderColor: personal ? "rgba(201,162,39,0.8)" : "rgba(255,255,255,0.2)",
              background: personal ? "rgba(201,162,39,0.15)" : "transparent",
            }}
          >
            {personal && <Icon name="Check" size={12} className="text-rock-gold" />}
          </button>
          <span className="font-cormorant text-rock-ash leading-snug" style={{ fontSize: "13px" }}>
            Я даю согласие на обработку персональных данных и подтверждаю, что ознакомлен(а) с{" "}
            <a href="#" className="text-rock-gold underline underline-offset-2 hover:opacity-80 transition-opacity">
              Политикой обработки персональных данных
            </a>
            .
          </span>
        </label>
      </div>

      <button
        onClick={onBuy}
        disabled={!ready}
        className={`btn-gold flex items-center gap-3 text-lg px-10 py-4 transition-opacity ${buttonClassName}`}
        style={{ opacity: ready ? 1 : 0.4, cursor: ready ? "pointer" : "not-allowed" }}
      >
        <Icon name="ShoppingCart" size={20} />
        Купить
      </button>
    </div>
  );
}
