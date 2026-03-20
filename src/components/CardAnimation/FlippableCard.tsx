// components/CardAnimation/FlippableCard.tsx
import React from "react";
import { CardDeckConfig } from "../../config/CardDeckConfig";

interface FlippableCardProps {
  card: any;
  isRevealed: boolean;
  scale?: number;
}

const FlippableCard: React.FC<FlippableCardProps> = ({
  card,
  isRevealed,
  scale = 0.5,
}) => {
  const width = CardDeckConfig.originalWidth * scale;
  const height = CardDeckConfig.originalHeight * scale;

  return (
    <div
      className="relative"
      style={{
        width,
        height,
        perspective: "1000px",
      }}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 ease-in-out`}
        style={{
          transformStyle: "preserve-3d",
          transform: isRevealed ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* CARD BACK */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{ backfaceVisibility: "hidden", zIndex: 2 }}
        >
          <img
            src="/assets/Cards-png/CardBacks.png"
            className="w-full h-full rounded-md shadow-xl border border-primary/20"
            alt="Card Back"
          />
        </div>

        {/* CARD FRONT */}
        <div
          className="absolute inset-0 w-full h-full bg-white rounded-md shadow-2xl flex flex-col items-center justify-center border-2 border-primary"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            zIndex: 1,
          }}
        >
          {/* Card Image or Content */}
          <div className="p-4 text-center">
            <h3 className="text-black font-bold text-sm sm:text-lg">
              {card.name}
            </h3>
            <div className="w-full h-[1px] bg-primary/20 my-2" />
            <p className="text-[10px] sm:text-xs text-muted">
              Arcana Key {card.id}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlippableCard;
