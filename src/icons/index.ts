import Isologo from "./logo/isologo.svg";
import Logotype from "./logo/logotype.svg";
import Imagotype from "./logo/imagotype.svg";
import Arrow from "./arrow.svg";
import Back from "./back.svg";
import Menu from "./menu.svg";
import Close from "./close.svg";
import ArtStation from "./social/art-station.svg";
import X from "./social/x.svg";
import Instagram from "./social/instagram.svg";
import Fiverr from "./social/fiverr.svg";
import Behance from "./social/behance.svg";
import TikTok from "./social/tik-tok.svg";
import Home from "./nav/home.svg";
import About from "./nav/about.svg";
import Artworks from "./nav/artworks.svg";
import Faqs from "./nav/faqs.svg";
import Contact from "./nav/contact.svg";
import Services from "./nav/services.svg";
import Phone from "./phone.svg";
import Email from "./email.svg";
import Lis from "./lis.svg";
import GradLis from "./grad-lis.svg";
import CelestialChevron from "./celestial-chevron.svg";
import Next from "./next.svg";
import Add from "./add.svg";
import Sub from "./sub.svg";
import Previous from "./previous.svg";
import Star from "./star.svg";
import Sheet from "./sheet.svg";
import Fullscreen from "./fullscreen.svg";
import FullscreenExit from "./fullscreen-exit.svg";
import ActiveBar from "./active-bar.svg";
import ActiveBar2 from "./active-bar-2.svg";
import ArcaneCrest from "./arcane-crest.svg";
import Success from "./success.svg";
import Upload from "./upload.svg";
import Pillar1 from "./pillars/1.svg";
import Pillar2 from "./pillars/2.svg";
import Pillar3 from "./pillars/3.svg";
import Faq1 from "./faqs/1.svg";
import Faq2 from "./faqs/2.svg";
import Faq3 from "./faqs/3.svg";
import Faq4 from "./faqs/4.svg";
import Faq5 from "./faqs/5.svg";

export const icons = {
  faq1: Faq1,
  faq2: Faq2,
  faq3: Faq3,
  faq4: Faq4,
  faq5: Faq5,
  pillar1: Pillar1,
  pillar2: Pillar2,
  pillar3: Pillar3,
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
  faqs: Faqs,
  contact: Contact,
  services: Services,
  about: About,
  phone: Phone,
  email: Email,
  lis: Lis,
  gradLis: GradLis,
  next: Next,
  add: Add,
  sub: Sub,
  previous: Previous,
  star: Star,
  sheet: Sheet,
  fullscreen: Fullscreen,
  fullscreenExit: FullscreenExit,
  activeBar: ActiveBar,
  activeBar2: ActiveBar2,
  arcaneCrest: ArcaneCrest,
  celestialChevron: CelestialChevron,
  success: Success,
  upload: Upload,
} as const;

export type IconName = keyof typeof icons;

export {
  Isologo as IconIsologo,
  Logotype as IconLogotype,
  Imagotype as IconImagotype,
  Lis as IconLis,
  GradLis as IconGradLis,
  ActiveBar as IconActiveBar,
  Star as IconStar,
  Arrow as IconArrow,
  Back as IconBack,
  Menu as IconMenu,
  Close as IconClose,
  ArcaneCrest as IconArcaneCrest,
};
