// utils/tarotDeck.ts

export type Card = {
  id: string;
  name: string;
  image: string;
  isReversed: boolean;
  slug?: string; // Add this as optional so it doesn't break generateRandomDeck
};

const MAJOR_ARCANA = [
  { name: "The Fool", file: "00-TheFool.png" },
  { name: "The Magician", file: "01-TheMagician.png" },
  { name: "The High Priestess", file: "02-TheHighPriestess.png" },
  { name: "The Empress", file: "03-TheEmpress.png" },
  { name: "The Emperor", file: "04-TheEmperor.png" },
  { name: "The Hierophant", file: "05-TheHierophant.png" },
  { name: "The Lovers", file: "06-TheLovers.png" },
  { name: "The Chariot", file: "07-TheChariot.png" },
  { name: "Strength", file: "08-Strength.png" },
  { name: "The Hermit", file: "09-TheHermit.png" },
  { name: "Wheel of Fortune", file: "10-WheelOfFortune.png" },
  { name: "Justice", file: "11-Justice.png" },
  { name: "The Hanged Man", file: "12-TheHangedMan.png" },
  { name: "Death", file: "13-Death.png" },
  { name: "Temperance", file: "14-Temperance.png" },
  { name: "The Devil", file: "15-TheDevil.png" },
  { name: "The Tower", file: "16-TheTower.png" },
  { name: "The Star", file: "17-TheStar.png" },
  { name: "The Moon", file: "18-TheMoon.png" },
  { name: "The Sun", file: "19-TheSun.png" },
  { name: "Judgement", file: "20-Judgement.png" },
  { name: "The World", file: "21-TheWorld.png" },
];

const MINOR_NAMES: Record<number, string> = {
  1: "Ace",
  11: "Page",
  12: "Knight",
  13: "Queen",
  14: "King",
};

const MINOR_ARCANA = ["Cups", "Swords", "Wands", "Pentacles"].flatMap((suit) =>
  Array.from({ length: 14 }, (_, i) => {
    const val = i + 1;
    const numStr = val.toString().padStart(2, "0");
    const cardName = MINOR_NAMES[val] || val.toString();

    return {
      name: `${cardName} of ${suit}`,
      file: `${suit}${numStr}.png`,
    };
  }),
);

export const CARD_DATA = [...MAJOR_ARCANA, ...MINOR_ARCANA];

export const generateRandomDeck = (size: number): Card[] => {
  return [...CARD_DATA]
    .sort(() => Math.random() - 0.5)
    .slice(0, size)
    .map((card, index) => ({
      id: `${card.file}-${index}-${Math.random().toString(36).substr(2, 9)}`,
      name: card.name,
      image: `/assets/Cards-png/${card.file}`,
      isReversed: Math.random() > 0.7,
    }));
};

export const FULL_STABLE_DECK: Card[] = CARD_DATA.map((card) => ({
  id: card.file, // Stable ID based on filename
  slug: card.name.toLowerCase().replace(/ /g, "-"),
  name: card.name,
  image: `/assets/Cards-png/${card.file}`,
  isReversed: false, // Library cards usually show upright by default
}));
