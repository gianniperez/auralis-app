import { TagType } from "./TagType";
import { LocalizedString } from "./LocalizedString";

export type IllustrationType = {
  _id: number;
  title: LocalizedString;
  description: LocalizedString;
  imageUrl: string;
  tags: TagType[];
};
