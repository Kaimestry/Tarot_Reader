import React from "react";
import { Card } from "../../screens/reading/ReadingScreen";
import { CardDeckConfig } from "../../config/CardDeckConfig";

interface CardSpreadProps {
  deck: Card[];
  selectedCards: Card[];
  onCardClick: (card: Card) => void;
}

const CardSpread: React.FC<CardSpreadProps> = ({
  deck,
  selectedCards,
  onCardClick,
}) => {
  // We calculate a smaller scale for the spread so 22+ cards fit on screen
  // 0.35 to 0.4 usually hits the sweet spot for a spread grid
  const spreadScale = 0.35;
  const cardWidth = CardDeckConfig.originalWidth * spreadScale;
  const cardHeight = CardDeckConfig.originalHeight * spreadScale;
  const stackOffset = 4 * spreadScale; // The "depth" look

  return (
    <div className="flex flex-wrap justify-center gap-6 p-8 max-w-6xl">
      {deck.map((card) => {
        const isSelected = selectedCards.find((c) => c.id === card.id);

        return (
          <div
            key={card.id}
            onClick={() => onCardClick(card)}
            className="relative cursor-pointer transition-all duration-300 ease-out"
            style={{
              width: cardWidth,
              height: cardHeight + stackOffset,
              transform: isSelected
                ? "translateY(-15px) scale(1.05)"
                : "translateY(0)",
            }}
          >
            {/* 1. The Black Depth (Matches your CardDeck exactly) */}
            <div
              className="absolute left-0 bg-black rounded-md opacity-30"
              style={{
                width: cardWidth,
                height: stackOffset * 2,
                bottom: 0,
                zIndex: 0,
              }}
            />

            {/* 2. The Card Back Image */}
            <img
              src="/assets/Cards-png/CardBacks.png"
              alt="Tarot Card Back"
              className={`absolute left-0 shadow-lg transition-colors duration-300 ${
                isSelected
                  ? "ring-2 ring-primary"
                  : "hover:ring-1 hover:ring-primary/50"
              }`}
              style={{
                width: cardWidth,
                height: cardHeight,
                bottom: stackOffset, // Lifted up to show the black depth below
                borderRadius: CardDeckConfig.borderRadius,
                zIndex: 10,
              }}
            />

            {/* 3. Selection Indicator */}
            {isSelected && (
              <div
                className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
                style={{ bottom: stackOffset }}
              >
                <div className="bg-primary text-black w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]">
                  ✓
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CardSpread;
