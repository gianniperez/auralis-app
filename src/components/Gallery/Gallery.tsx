import { useBEM } from "@/utils/component/useBEM";
import { IllustrationType } from "@/types/IllustrationType";
import Image from "@/components/Image/Image";
import { useLocale } from "@/utils/useLocale";
import "./Gallery.scss";

/**
 * This component renders a grid of illustrations filtered by a selected tag.
 * @param {IllustrationType[]} illustrations - The collection of artwork data to be displayed.
 * @param {(illustration: IllustrationType) => void} onSelectIllustration - Callback triggered when an artwork is clicked.
 */
type GalleryProps = {
  illustrations: IllustrationType[];
  onSelectIllustration: (illustration: IllustrationType) => void;
};

export default function Gallery({
  illustrations,
  onSelectIllustration,
}: GalleryProps) {
  const b = useBEM("gallery");

  const locale = useLocale();

  return (
    <div className={b()}>
      {illustrations.map((illustration) => (
        <div key={illustration._id}>
          <div
            className={b("img-container")}
            onClick={() => onSelectIllustration(illustration)}
          >
            <Image
              classname={b("img")}
              src={illustration.imageUrl}
              alt={
                locale == "en" ? illustration.title.en : illustration.title.es
              }
              borderRadius="sm"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
