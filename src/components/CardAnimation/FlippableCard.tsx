// components/CardAnimation/FlippableCard.tsx
import React from "react";
import { CardDeckConfig } from "../../config/CardDeckConfig";

interface FlippableCardProps {
  card: any;
  isRevealed: boolean;
  scale?: number;
}

// components/CardAnimation/FlippableCard.tsx

const FlippableCard: React.FC<FlippableCardProps> = ({
  card,
  isRevealed,
  scale = 0.5,
}) => {
  const width = CardDeckConfig.originalWidth * scale;
  const height = CardDeckConfig.originalHeight * scale;

  return (
    <div className="relative" style={{ width, height, perspective: "1000px" }}>
      <div
        className="relative w-full h-full transition-transform duration-700 preserve-3d"
        style={{ transform: isRevealed ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* BACK */}
        <div className="absolute inset-0 backface-hidden z-10">
          <img
            src="/assets/Cards-png/CardBacks.png"
            className="w-full h-full rounded-md shadow-xl"
            alt="Back"
          />
        </div>

        {/* FRONT */}
        <div
          className="absolute inset-0 backface-hidden rotate-y-180 bg-white rounded-md shadow-2xl overflow-hidden"
          style={{ transform: "rotateY(180deg)" }}
        >
          <img
            src={card.image}
            alt={card.name}
            className="w-full h-full object-cover transition-transform duration-500"
            // Apply the upside-down rotation here
            style={{
              transform: card.isReversed ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />

          {/* Optional Label for Reversed cards */}
          {card.isReversed && (
            <div className="absolute bottom-2 left-0 w-full text-center bg-black/60 text-white text-[10px] py-1">
              REVERSED
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlippableCard;
