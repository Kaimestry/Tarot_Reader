import React from "react";

const baseCards = [
  "/assets/Cards-png/00-TheFool.png",
  "/assets/Cards-png/01-TheMagician.png",
  "/assets/Cards-png/02-TheHighPriestess.png",
  "/assets/Cards-png/03-TheEmpress.png",
  "/assets/Cards-png/04-TheEmperor.png",
  "/assets/Cards-png/05-TheHierophant.png",
  "/assets/Cards-png/06-TheLovers.png",
  "/assets/Cards-png/07-TheChariot.png",
];

export default function CardWheel() {
  const radius = 150;
  const cardWidth = 80; // matches Tailwind w-20
  const circumference = 2 * Math.PI * radius;

  const cardCount = Math.floor(circumference / cardWidth);

  // repeat cards until we have enough
  const cards = Array.from(
    { length: cardCount },
    (_, i) => baseCards[i % baseCards.length],
  );

  const step = 360 / cards.length;

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative w-[400px] h-[400px] animate-spin-slow">
        {cards.map((src, i) => {
          const angle = i * step;

          return (
            <img
              key={i}
              src={src}
              className="absolute w-20"
              style={{
                left: "50%",
                top: "50%",
                transform: `
                  translate(-50%, -50%)
                  rotate(${angle}deg)
                  translateY(-${radius}px)
                `,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
