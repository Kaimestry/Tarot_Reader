import React, { useEffect, useState, useRef } from "react";
import { Card } from "../../screens/reading/ReadingScreen";
import { CardDeckConfig } from "../../config/CardDeckConfig";

// --- ANIMATION CONFIGURATION ---
const SpreadConfig = {
  staggerDelay: 150, // ms between each card leaving the deck
  discardStagger: 80, // Slower gathering (increased from 50)
  travelDuration: 800, // ms for spread flight
  returnDuration: 1200, // Slower, heavier return (new)
  selectDuration: 200, // ms for quick selection "pop"
  entranceDelay: 300, // ms to wait at the deck before spreading
  selectedPopY: -20, // px for selection float
  selectedScale: 1.05, // scale for selection
  mobileScale: 0.18, // scale for mobile
  desktopScale: 0.35, // scale for desktop
};

interface CardSpreadProps {
  deck: Card[];
  selectedCards: Card[];
  onCardClick: (card: Card) => void;
  deckX?: number;
  deckY?: number;
  deckWidth?: number;
  isDismissing?: boolean;
  onDismissComplete?: () => void;
  forceSpread?: boolean;
}

const CardSpread: React.FC<CardSpreadProps> = ({
  deck,
  selectedCards,
  onCardClick,
  deckX,
  deckY,
  deckWidth,
  isDismissing = false,
  onDismissComplete,
  forceSpread = false,
}) => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 640 : false,
  );

  const [animationStage, setAnimationStage] = useState<
    "calculating" | "atDeck" | "spreading"
  >(forceSpread ? "spreading" : "calculating");

  const [offsets, setOffsets] = useState<{ x: number; y: number }[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const targetScale = isMobile
    ? SpreadConfig.mobileScale
    : SpreadConfig.desktopScale;
  const startScale = deckWidth
    ? deckWidth / CardDeckConfig.originalWidth
    : targetScale;

  // Sync offsets when deck position is known
  useEffect(() => {
    if (deckX && deckY) {
      const newOffsets = deck.slice(0, 12).map((_, i) => {
        const el = cardRefs.current[i];
        if (el) {
          const rect = el.getBoundingClientRect();
          return {
            x: deckX - rect.left,
            y: deckY - 10 - rect.top,
          };
        }
        return { x: 0, y: 0 };
      });
      setOffsets(newOffsets);

      if (animationStage === "calculating" && !forceSpread) {
        setAnimationStage("atDeck");
      }
    }
  }, [deckX, deckY, deck, forceSpread, animationStage]);

  // Handle spreading trigger
  useEffect(() => {
    if (animationStage === "atDeck" && !forceSpread) {
      const timer = setTimeout(() => {
        setAnimationStage("spreading");
      }, SpreadConfig.entranceDelay);
      return () => clearTimeout(timer);
    }
  }, [animationStage, forceSpread]);

  // Handle dismissal cleanup
  useEffect(() => {
    if (isDismissing) {
      // Logic: Max visible cards (12) * stagger + travel time + buffer
      const totalWait =
        12 * SpreadConfig.discardStagger + SpreadConfig.returnDuration + 200;
      const timer = setTimeout(() => {
        if (onDismissComplete) onDismissComplete();
      }, totalWait);
      return () => clearTimeout(timer);
    }
  }, [isDismissing, onDismissComplete]);

  const cardWidth = CardDeckConfig.originalWidth * targetScale;
  const cardHeight = CardDeckConfig.originalHeight * targetScale;
  const stackOffset = 4 * targetScale;

  return (
    <div className="flex flex-wrap justify-center gap-x-2 gap-y-6 sm:gap-6 p-4 max-w-6xl w-full">
      {deck.slice(0, 12).map((card, index) => {
        const isSelected = !!selectedCards.find((c) => c.id === card.id);
        const offset = offsets[index] || { x: 0, y: 0 };

        const isSpreadingStage = animationStage === "spreading";
        const isInitialSpread =
          isSpreadingStage && !isDismissing && !forceSpread;
        const isReturning = isDismissing && !isSelected;

        // Dynamic transition timing
        const currentDuration = isReturning
          ? SpreadConfig.returnDuration
          : isInitialSpread
            ? SpreadConfig.travelDuration
            : SpreadConfig.selectDuration;

        const currentEasing = isReturning
          ? "ease-in-out" // Smoother deceleration for returning
          : "cubic-bezier(0.2, 1, 0.3, 1)"; // Snappy for spreading/selecting

        const currentDelay = isReturning
          ? `${index * SpreadConfig.discardStagger}ms` // Sequential return
          : isInitialSpread
            ? `${index * SpreadConfig.staggerDelay}ms`
            : "0ms";

        return (
          <div
            key={card.id}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className="relative"
            style={{
              width: cardWidth,
              height: cardHeight + stackOffset,
              zIndex: isSelected ? 50 : 100 - index,
            }}
          >
            <div
              onClick={() =>
                isSpreadingStage && !isDismissing && onCardClick(card)
              }
              style={{
                width: "100%",
                height: "100%",

                // --- TRANSITION ---
                // Removed opacity from the transition list to keep it solid during return
                transition: isSpreadingStage
                  ? `transform ${currentDuration}ms ${currentEasing}`
                  : "none",

                transitionDelay: currentDelay,

                // --- POSITION ---
                transform:
                  animationStage !== "spreading" || isReturning
                    ? `translate(${offset.x}px, ${offset.y}px) scale(${startScale / targetScale})`
                    : isSelected
                      ? `translateY(${SpreadConfig.selectedPopY}px) scale(${SpreadConfig.selectedScale})`
                      : "translate(0, 0) scale(1)",

                // Keep opacity at 1 unless we are in the very first 'calculating' frame
                opacity: animationStage === "calculating" ? 0 : 1,

                transformOrigin: "top left",
                cursor:
                  isSpreadingStage && !isDismissing ? "pointer" : "default",
              }}
            >
              {/* Card Shadow/Depth */}
              <div
                className="absolute left-0 bg-black rounded-md opacity-30"
                style={{ width: cardWidth, height: stackOffset * 2, bottom: 0 }}
              />

              {/* Card Image */}
              <img
                src="/assets/Cards-png/CardBacks.png"
                className={`absolute left-0 shadow-lg rounded-md transition-all duration-200 ${
                  isSelected ? "ring-2 ring-primary" : ""
                }`}
                style={{
                  width: cardWidth,
                  height: cardHeight,
                  bottom: stackOffset,
                }}
                alt="Tarot Card"
              />

              {/* Selection Checkmark */}
              {isSelected && (
                <div
                  className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
                  style={{ bottom: stackOffset }}
                >
                  <div className="bg-primary text-black w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold shadow-xl">
                    ✓
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CardSpread;
