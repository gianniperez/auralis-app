import { IllustrationType } from "@/types/IllustrationType";

/**
 * Gets the previous illustration in a circular list.
 */
export const getPrevIllustration = (
  current: IllustrationType,
  list: IllustrationType[]
): IllustrationType => {
  const currentIndex = list.findIndex((img) => img._id === current._id);
  const prevIndex = (currentIndex - 1 + list.length) % list.length;
  return list[prevIndex];
};

/**
 * Gets the next illustration in a circular list.
 */
export const getNextIllustration = (
  current: IllustrationType,
  list: IllustrationType[]
): IllustrationType => {
  const currentIndex = list.findIndex((img) => img._id === current._id);
  const nextIndex = (currentIndex + 1) % list.length;
  return list[nextIndex];
};
