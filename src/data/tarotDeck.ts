// 1. Define the exact fields a user can read for.
// This makes sure you never accidentally type "career" on one card and "work" on another.
export type ReadingField = "general" | "relations" | "work" | "spiritual";

// 2. Define the blueprint for what a Card MUST have.
export interface TarotCardData {
  id: string;
  name: string;
  frontImg?: string;
  backImg?: string;
  meanings: Record<ReadingField, string>;
}

// 3. Build the actual Database (Array of Card Objects)
export const tarotDeck: TarotCardData[] = [
  {
    id: "00-TheFool",
    name: "The Fool",
    frontImg: "/cards/the-fool.png",
    meanings: {
      general: "New beginnings, innocence, spontaneity, a free spirit.",
      relations: "A sudden romance, diving in headfirst without thinking.",
      work: "Starting a new job or business venture, taking a leap of faith.",
      spiritual:
        "Trusting the universe and embarking on a new spiritual journey.",
    },
  },
  {
    id: "four-of-cups",
    name: "Four of Cups",
    meanings: {
      general: "Apathy, feeling unfulfilled, ignoring new offers.",
      relations:
        "Boredom in a relationship, missing out on a good connection because you are distracted.",
      work: "Feeling uninspired at your job, rejecting a new opportunity.",
      spiritual:
        "Disconnecting from the world to look inward, needing to meditate.",
    },
  },
  // You will add the rest of your cards here later!
];
