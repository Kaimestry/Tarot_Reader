import React, { useState, useEffect } from "react";
import { CardDeckConfig } from "../../config/CardDeckConfig";

interface Props {
  startX: number;
  startY: number;
  startWidth: number;
  onComplete: () => void;
  shuffleTimes?: number;
}

const AnimatedShuffleDeck: React.FC<Props> = ({
  startX,
  startY,
  startWidth,
  onComplete,
  shuffleTimes = 5,
}) => {
  const [status, setStatus] = useState<"in" | "shuffling" | "out">("in");
  const [count, setCount] = useState(0);

  const initialScale = startWidth / CardDeckConfig.originalWidth;
  const bigScale = 0.45;
  const currentScale = status === "shuffling" ? bigScale : initialScale;

  const cardWidth = CardDeckConfig.originalWidth * currentScale;
  const cardHeight = CardDeckConfig.originalHeight * currentScale;

  const stackOffset = 4 * currentScale;

  // FIX: Increased multiplier from 0.9 to 1.5.
  // This ensures that even with a small card, it clears the deck significantly.
  const slideDistance = cardWidth * 1.5;

  useEffect(() => {
    if (status === "in") {
      const t = setTimeout(() => setStatus("shuffling"), 700);
      return () => clearTimeout(t);
    }
    if (status === "shuffling") {
      if (count < shuffleTimes) {
        const t = setTimeout(() => setCount((c) => c + 1), 900);
        return () => clearTimeout(t);
      } else {
        setStatus("out");
      }
    }
    if (status === "out") {
      const t = setTimeout(onComplete, 700);
      return () => clearTimeout(t);
    }
  }, [status, count, shuffleTimes, onComplete]);

  const isCenter = status === "shuffling";

  return (
    <div className="fixed inset-0 z-[999] pointer-events-none">
      <style>{`
        @keyframes wide-horizontal-shuffle {
          0% { transform: translateX(0); z-index: 60; }
          /* Card slides out wide to the right */
          40% { transform: translateX(${slideDistance}px) rotate(6deg); z-index: 60; }
          /* Z-index swap happens while the card is at its furthest point */
          60% { transform: translateX(${slideDistance}px) rotate(6deg); z-index: 5; }
          100% { transform: translateX(0); z-index: 5; }
        }
        .shuffle-action {
          animation: wide-horizontal-shuffle 900ms ease-in-out infinite;
        }
        .travel-container {
          transition: all 0.7s cubic-bezier(0.25, 1, 0.5, 1);
        }
      `}</style>

      <div
        className="travel-container absolute"
        style={{
          width: cardWidth,
          height: cardHeight + stackOffset,
          left: isCenter ? "50%" : `${startX}px`,
          top: isCenter ? "50%" : `${startY}px`,
          // Center accurately
          transform: isCenter ? "translate(-50%, -50%)" : "translate(0, 0)",
          transformOrigin: "top left",
        }}
      >
        {/* Depth Stack */}
        <div
          className="absolute left-0 bg-black rounded-md opacity-40"
          style={{
            width: cardWidth,
            height: stackOffset * 10,
            bottom: -1,
            zIndex: 0,
          }}
        />

        {/* Static Base */}
        <img
          src="/assets/Cards-png/CardBacks.png"
          className="absolute z-10 shadow-md"
          style={{
            width: cardWidth,
            height: cardHeight,
            bottom: stackOffset,
            left: 0,
            borderRadius: CardDeckConfig.borderRadius,
          }}
          alt="Deck base"
        />

        {/* Shuffling Card Container */}
        <div
          className={`absolute ${isCenter ? "shuffle-action" : ""}`}
          style={{
            width: cardWidth,
            height: cardHeight,
            bottom: stackOffset,
            left: 0,
          }}
        >
          <img
            src="/assets/Cards-png/CardBacks.png"
            className="w-full h-full shadow-xl"
            style={{ borderRadius: CardDeckConfig.borderRadius }}
            alt="Top Card"
          />
        </div>
      </div>
    </div>
  );
};

export default AnimatedShuffleDeck;
