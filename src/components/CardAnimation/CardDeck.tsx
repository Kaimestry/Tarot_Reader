import React, { useState, useRef, useEffect } from "react";
import { CardDeckConfig } from "../../config/CardDeckConfig";

interface CardDeckProps {
  cardCount?: number;
}

const CardDeck: React.FC<CardDeckProps> = ({ cardCount = 5 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current)
        setContainerWidth(containerRef.current.offsetWidth);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const scale = containerWidth
    ? containerWidth / CardDeckConfig.originalWidth
    : 1;
  const cardWidth = CardDeckConfig.originalWidth * scale;
  const cardHeight = CardDeckConfig.originalHeight * scale;
  const floatPx = Math.max(20, CardDeckConfig.hoverFloat * scale); // hover float

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 800);
  };

  const stackOffset = 6 * scale; // small px offset for visibility

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center cursor-pointer w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      style={{
        height: cardHeight + stackOffset, // container includes black stack offset
        transform: "translateY(-10px)", // <-- move whole deck up by __px up
      }}
    >
      {/* 3. Fake stack at bottom */}
      <div
        className="absolute left-0 -bottom-2 bg-black rounded-md"
        style={{
          width: cardWidth,
          height: stackOffset * (cardCount + 15), // stack thickness
          zIndex: 0,
        }}
      />

      {/* 2. Second top card (static) */}
      {cardCount > 1 && (
        <img
          src="/assets/Cards-png/CardBacks.png"
          alt="Second card"
          className="absolute z-10"
          style={{
            width: cardWidth,
            height: cardHeight,
            bottom: stackOffset, // leave space for black stack
            borderRadius: CardDeckConfig.borderRadius,
          }}
        />
      )}

      {/* 1. Top card (floating) */}
      <img
        src="/assets/Cards-png/CardBacks.png"
        alt="Top card"
        className="absolute z-20 transition-transform duration-300"
        style={{
          width: cardWidth,
          height: cardHeight,
          bottom: 0,
          borderRadius: CardDeckConfig.borderRadius,
          transform:
            isHovered || isClicked
              ? `translateY(-${floatPx}px)`
              : "translateY(0)",
        }}
      />
    </div>
  );
};

export default CardDeck;
