export type LocalizedText = {
  es: string;
  en: string;
};

export type ArtworkTag =
  | "All"
  | "Character Design"
  | "Portraits"
  | "RPG & Video Game Art"
  | "Book Cover Illustration"
  | "Landscapes";

export type Artwork = {
  _id: number;
  title: LocalizedText;
  description: LocalizedText;
  imageUrl: string;
  tags: ArtworkTag[];
};

export type Service = {
  _id: number;
  title: LocalizedText;
  description: LocalizedText;
  cost: LocalizedText;
  duration: LocalizedText;
  imageUrl: string;
  tags: string[];
};

export type Step = {
  _id: number;
  title: LocalizedText;
  description: LocalizedText;
  imageUrl: string;
};
