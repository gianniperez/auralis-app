import { BEM } from "./BEM";

/**
 * Creates a scoped BEM class generator for a specific block.
 * * This hook is essential for maintaining the mystical aesthetic of Auralis,
 * allowing for easy state management (e.g., toggling glowing modifiers
 * on mobile navigation elements).
 * * @param {string} blockName - The name of the main block (e.g., "nav-bar-mobile").
 * @returns {(element?: string | null, modifiers?: string | string[]) => string}
 * A function that generates the final class string.
 */
export function useBEM(blockName: string) {
  return (element?: string | null, modifiers?: string | string[]) =>
    BEM(blockName, element, modifiers);
}
