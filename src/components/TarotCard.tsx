import React from "react";
import { Card } from "../utils/tarotDeck";
import { CardDeckConfig } from "../config/CardDeckConfig";
import { useNavigate } from "react-router-dom";

interface TarotCardProps extends Card {
  scale: number;
}

const TarotCard: React.FC<TarotCardProps> = ({
  name,
  image,
  isReversed,
  scale,
}) => {
  const navigate = useNavigate();
  const width = CardDeckConfig.originalWidth * scale;
  const height = CardDeckConfig.originalHeight * scale;

  const cardSlug = name.toLowerCase().replace(/ /g, "-");

  return (
    <div
      onClick={() => navigate(`/library/${cardSlug}`)} // Navigate on click
      className="group relative cursor-pointer transition-transform duration-300 ease-out"
      style={
        {
          width: `${width}px`,
          height: `${height}px`,
          "--hover-float": `${CardDeckConfig.hoverFloat}px`,
        } as React.CSSProperties
      }
    >
      {" "}
      <div
        className="relative w-full h-full overflow-hidden border border-divider bg-surface 
                   transition-all duration-300 shadow-sm
                   group-hover:shadow-2xl group-hover:shadow-primary/40
                   group-hover:-translate-y-[var(--hover-float)]"
        style={{
          borderRadius: CardDeckConfig.borderRadius,
          // Handle the flip if the card is reversed in your data
          transform: `rotate(${isReversed ? "180deg" : "0deg"})`,
        }}
      >
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover select-none pointer-events-none"
        />

        {/* Info Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent 
                        opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3"
        >
          <p className="text-white font-bold text-lg uppercase tracking-tighter text-center leading-tight">
            {name}
          </p>
          {isReversed && (
            <span className="text-primary text-[8px] font-black uppercase text-center mt-1">
              Reversed
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TarotCard;
