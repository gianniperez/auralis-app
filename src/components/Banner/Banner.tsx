import { useBEM } from "@/utils/component/useBEM";
import Image from "@/components/Image/Image";
import "./Banner.scss";

/**
 * A promotional banner component that displays a full-width image.
 * @param {string} srcImg - The URL source for the banner image.
 * @param {string} altImg - Descriptive text for the image, important for accessibility.
 */
type BannerProps = {
  srcImg: string;
  altImg: string;
};

export default function Banner({ srcImg, altImg }: BannerProps) {
  const b = useBEM("banner");

  return (
    <div className={b()}>
      <Image classname={b("top-lis")} src="/images/lis.png" alt="lis" />
      <Image classname={b("img")} src={srcImg} alt={altImg} borderRadius="md" />
      <Image classname={b("bottom-lis")} src="/images/lis.png" alt="lis" />
    </div>
  );
}
