import { LocalizedString } from "./LocalizedString";
import { TagType } from "./TagType";

export type ServiceType = {
  _id: number;
  title: LocalizedString;
  description: LocalizedString;
  cost: LocalizedString;
  duration: LocalizedString;
  imageUrl: string;
  tags: TagType[];
};
