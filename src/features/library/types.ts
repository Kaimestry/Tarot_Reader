export type TarotSuite =
  | "Major Arcana"
  | "Swords"
  | "Wands"
  | "Cups"
  | "Pentacles"
  | "All";

export interface TarotCardProps {
  id: number | string;
  name: string;
  suite: TarotSuite;
  imageUrl?: string;
}
