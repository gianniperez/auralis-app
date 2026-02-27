/**
 * Generates a BEM class from a block, an element, and modifiers.
 *
 * @param block - The main block (e.g., "button").
 * @param element - The element within the block (e.g., "icon").
 * @param modifiers - Optional modifiers (e.g., "large", ["primary", "rounded"]).
 * @returns Class in BEM format.
 */
export function BEM(
  block: string,
  element?: string | null,
  modifiers?: string | string[]
): string {
  const base = element ? `${block}__${element}` : block;
  if (!modifiers) return base;

  const mods = Array.isArray(modifiers) ? modifiers : [modifiers];
  return [base, ...mods.map((mod) => `${base}--${mod}`)].join(" ");
}
