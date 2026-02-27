import Isologo from "@/icons/logo/isologo.svg";
import Logotype from "@/icons/logo/logotype.svg";
import Imagotype from "@/icons/logo/imagotype.svg";
import Arrow from "@/icons/arrow.svg";
import Back from "@/icons/back.svg";
import Menu from "@/icons/menu.svg";
import Close from "@/icons/close.svg";
import ArtStation from "@/icons/social/art-station.svg";
import X from "@/icons/social/x.svg";
import Instagram from "@/icons/social/instagram.svg";
import Fiverr from "@/icons/social/fiverr.svg";
import Behance from "@/icons/social/behance.svg";
import TikTok from "@/icons/social/tik-tok.svg";
import Home from "@/icons/nav/home.svg";
import About from "@/icons/nav/about.svg";
import Artworks from "@/icons/nav/artworks.svg";
import Faqs from "@/icons/nav/faqs.svg";
import Contact from "@/icons/nav/contact.svg";
import Services from "@/icons/nav/services.svg";
import Phone from "@/icons/phone.svg";
import Email from "@/icons/email.svg";
import Lis from "@/icons/lis.svg";
import GradLis from "@/icons/grad-lis.svg";
import Next from "@/icons/next.svg";
import Add from "@/icons/add.svg";
import Sub from "@/icons/sub.svg";
import Previous from "@/icons/previous.svg";
import Pillar1 from "@/icons/pillars/1.svg";
import Pillar2 from "@/icons/pillars/2.svg";
import Pillar3 from "@/icons/pillars/3.svg";
import Faq1 from "@/icons/faqs/1.svg";
import Faq2 from "@/icons/faqs/2.svg";
import Faq3 from "@/icons/faqs/3.svg";
import Faq4 from "@/icons/faqs/4.svg";
import Faq5 from "@/icons/faqs/5.svg";
import Required from "@/icons/required.svg";
import Success from "@/icons/success.svg";
import Upload from "@/icons/upload.svg";
import Star from "@/icons/star.svg";
import Sheet from "@/icons/sheet.svg";
import ActiveBar from "@/icons/active-bar.svg";
import Fullscreen from "@/icons/fullscreen.svg";
import FullscreenExit from "@/icons/fullscreen-exit.svg";

export const icons = {
  isologo: Isologo,
  logotype: Logotype,
  imagotype: Imagotype,
  arrow: Arrow,
  back: Back,
  menu: Menu,
  close: Close,
  artStation: ArtStation,
  x: X,
  instagram: Instagram,
  fiverr: Fiverr,
  behance: Behance,
  tikTok: TikTok,
  home: Home,
  artworks: Artworks,
  services: Services,
  about: About,
  faqs: Faqs,
  contact: Contact,
  phone: Phone,
  email: Email,
  lis: Lis,
  gradLis: GradLis,
  next: Next,
  star: Star,
  add: Add,
  sub: Sub,
  previous: Previous,
  pillar1: Pillar1,
  pillar2: Pillar2,
  pillar3: Pillar3,
  faq1: Faq1,
  faq2: Faq2,
  faq3: Faq3,
  faq4: Faq4,
  faq5: Faq5,
  required: Required,
  success: Success,
  upload: Upload,
  sheet: Sheet,
  activeBar: ActiveBar,
  fullscreen: Fullscreen,
  fullscreenExit: FullscreenExit,
  /* 
  imagotype: Imagotype,
  phone: Phone,
  email: Email,
  atSign: AtSign,
  user: User,
  cloud: Cloud,
  upload: Upload,
  check: Check,
  required: Required, */
} as const;

export type IconType = keyof typeof icons;
