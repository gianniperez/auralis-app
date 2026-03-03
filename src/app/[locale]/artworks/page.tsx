"use client";
import FilterBar from "@/components/FilterBar/FilterBar";
import Gallery from "@/components/Gallery/Gallery";
import Heading from "@/components/Heading/Heading";
import Modal from "@/components/Modal/Modal";
import Card from "@/components/Card/Card";
import { IllustrationType } from "@/types/IllustrationType";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { getFilters } from "@/data/filters";
import { TagType } from "@/types/TagType";
import { getPrevIllustration, getNextIllustration } from "@/utils/pagination";
import { useIsMobile } from "@/utils/isMobile";
import { useBEM } from "@/utils/component/useBEM";
import "./page.scss";

export default function ArtworksPage() {
  const b = useBEM("artworks-page");

  const tArtworks = useTranslations("Artworks");
  const tServices = useTranslations("Services");

  const filters = getFilters(tServices);
  const isMobile = useIsMobile();

  const [illustrations, setIllustrations] = useState<IllustrationType[]>([]);
  const [openIllustrationCard, setOpenIllustrationCard] = useState(false);
  const [selectedIllustration, setSelectedIllustration] =
    useState<IllustrationType | null>(null);
  const [selectedTag, setSelectedTag] = useState<TagType>(
    filters[0].key as TagType,
  );

  /**
   * Filters the illustrations array based on the active category tag.
   * Returns all items if "All" is selected, otherwise matches by tag key.
   */
  const filteredIllustrations = illustrations.filter(
    (illustration) =>
      selectedTag === "All" ||
      illustration.tags.some((tag) => tag === selectedTag),
  );

  /**
   * Navigates to the previous illustration in the filtered list.
   */
  const onPreviousPage = () => {
    if (selectedIllustration && filteredIllustrations.length > 0) {
      const prev = getPrevIllustration(
        selectedIllustration,
        filteredIllustrations,
      );
      setSelectedIllustration(prev);
    }
  };

  /**
   * Navigates to the next illustration in the filtered list.
   */
  const onNextPage = () => {
    if (selectedIllustration && filteredIllustrations.length > 0) {
      const next = getNextIllustration(
        selectedIllustration,
        filteredIllustrations,
      );
      setSelectedIllustration(next);
    }
  };

  /**
   * Opens the detail modal for a specific illustration.
   * @param {IllustrationType} illustration - The artwork selected from the gallery.
   */
  const handleSelectIllustration = (illustration: IllustrationType) => {
    setSelectedIllustration(illustration);
    setOpenIllustrationCard(true);
  };

  /**
   * Initial data fetch to populate the gallery with illustrations from the API.
   */
  useEffect(() => {
    fetch("/api/illustrations")
      .then((res) => res.json())
      .then((data) => setIllustrations(data));
  }, []);

  return (
    <div>
      <Modal
        open={openIllustrationCard}
        onClose={() => setOpenIllustrationCard(false)}
        onPreviousPage={onPreviousPage}
        onNextPage={onNextPage}
      >
        {selectedIllustration && <Card card={selectedIllustration} />}
      </Modal>
      <main className={b()}>
        <Heading
          classname={b("heading")}
          heading={tArtworks("heading")}
          copy={tArtworks("copy")}
          icon={isMobile}
        />
        <FilterBar
          type={isMobile ? "select" : "tabs"}
          filters={filters}
          onSelectTag={(e) => setSelectedTag(e)}
        />
        <Gallery
          illustrations={filteredIllustrations}
          onSelectIllustration={handleSelectIllustration}
        />
      </main>
    </div>
  );
}
