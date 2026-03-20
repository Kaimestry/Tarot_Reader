import React, { useEffect, useState, useRef } from "react";
import { Card } from "../../screens/reading/ReadingScreen";
import { CardDeckConfig } from "../../config/CardDeckConfig";

// --- ANIMATION CONFIGURATION ---
const SpreadConfig = {
  staggerDelay: 150, // ms between each card leaving the deck
  discardStagger: 50, // ms between each card returning to the deck
  travelDuration: 800, // ms for long flight (deck <-> table)
  selectDuration: 150, // ms for quick selection "pop"
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
}) => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 640 : false,
  );
  const [animationStage, setAnimationStage] = useState<
    "calculating" | "atDeck" | "spreading"
  >("calculating");
  const [offsets, setOffsets] = useState<{ x: number; y: number }[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const targetScale = isMobile
    ? SpreadConfig.mobileScale
    : SpreadConfig.desktopScale;
  const startScale = deckWidth
    ? deckWidth / CardDeckConfig.originalWidth
    : targetScale;

  // Initial Calculation: Map slots to Deck position
  useEffect(() => {
    if (deckX && deckY && animationStage === "calculating") {
      const newOffsets = deck.slice(0, 12).map((_, i) => {
        const el = cardRefs.current[i];
        if (el) {
          const rect = el.getBoundingClientRect();
          return {
            x: deckX - rect.left,
            y: deckY - 10 - rect.top, // Adjust for deck's translateY(-10px)
          };
        }
        return { x: 0, y: 0 };
      });
      setOffsets(newOffsets);
      setAnimationStage("atDeck");
    }
  }, [deckX, deckY, deck, animationStage]);

  // Trigger spreading after being "atDeck"
  useEffect(() => {
    if (animationStage === "atDeck") {
      const timer = setTimeout(
        () => setAnimationStage("spreading"),
        SpreadConfig.entranceDelay,
      );
      return () => clearTimeout(timer);
    }
  }, [animationStage]);

  // Handle Discard Completion
  useEffect(() => {
    if (isDismissing) {
      const totalWait =
        12 * SpreadConfig.discardStagger + SpreadConfig.travelDuration + 200;
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
        const isSpreading = animationStage === "spreading";
        const isReturning = isDismissing && !isSelected;

        // Use fast speed for selection/return, slow speed for initial spread
        const currentDuration =
          isSpreading && !isSelected && !isDismissing
            ? SpreadConfig.travelDuration
            : SpreadConfig.selectDuration;

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
              onClick={() => isSpreading && !isDismissing && onCardClick(card)}
              style={{
                width: "100%",
                height: "100%",
                transition: isSpreading
                  ? `transform ${isReturning ? SpreadConfig.travelDuration : currentDuration}ms cubic-bezier(0.2, 1, 0.3, 1), opacity 500ms ease-out`
                  : "none",

                // Stagger logic: forwards for spread, reverse-ish for discard
                transitionDelay:
                  isDismissing && !isSelected
                    ? `${(12 - index) * SpreadConfig.discardStagger}ms`
                    : isSpreading && !isSelected
                      ? `${index * SpreadConfig.staggerDelay}ms`
                      : "0ms",

                transform:
                  animationStage !== "spreading" || isReturning
                    ? `translate(${offset.x}px, ${offset.y}px) scale(${startScale / targetScale})`
                    : isSelected
                      ? `translateY(${SpreadConfig.selectedPopY}px) scale(${SpreadConfig.selectedScale})`
                      : "translate(0, 0) scale(1)",

                opacity:
                  animationStage === "calculating" || isReturning ? 0 : 1,
                transformOrigin: "top left",
                cursor: isSpreading && !isDismissing ? "pointer" : "default",
              }}
            >
              <div
                className="absolute left-0 bg-black rounded-md opacity-30"
                style={{ width: cardWidth, height: stackOffset * 2, bottom: 0 }}
              />
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
