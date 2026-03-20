// utils/tarotDeck.ts

export type Card = {
  id: string;
  name: string;
  image: string;
  isReversed: boolean; // We'll set this during randomization
};

const CARD_DATA = [
  // Major Arcana
  { name: "The Fool", file: "00-TheFool.png" },
  { name: "The Magician", file: "01-TheMagician.png" },
  // ... add all 22 Major Arcana
  { name: "The World", file: "21-TheWorld.png" },

  // Minor Arcana (Example of how to loop or list)
  ...["Cups", "Swords", "Wands", "Pentacles"].flatMap((suit) =>
    Array.from({ length: 14 }, (_, i) => {
      const num = (i + 1).toString().padStart(2, "0");
      return {
        name: `${num} of ${suit}`,
        file: `${suit}${num}.png`,
      };
    }),
  ),
];

export const generateRandomDeck = (size: number): Card[] => {
  return [...CARD_DATA]
    .sort(() => Math.random() - 0.5) // Shuffle
    .slice(0, size)
    .map((card, index) => ({
      id: `${card.file}-${index}`,
      name: card.name,
      image: `/assets/Cards-png/${card.file}`,
      isReversed: Math.random() > 0.7, // 30% chance to be upside down
    }));
};
