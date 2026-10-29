import artworksRaw from "@/data/artworks.json";
import servicesRaw from "@/data/services.json";
import stepsRaw from "@/data/steps.json";
import { Artwork, ArtworkTag, Service, Step } from "@/types";

export const artworks: Artwork[] = artworksRaw as Artwork[];
export const services: Service[] = servicesRaw as Service[];
export const steps: Step[] = stepsRaw as Step[];

export function getArtworksByTag(tag: ArtworkTag | string): Artwork[] {
  if (!tag || tag === "All") return artworks;
  return artworks.filter((art) => art.tags.includes(tag as ArtworkTag));
}

export function getArtworkById(id: number): Artwork | undefined {
  return artworks.find((art) => art._id === id);
}
