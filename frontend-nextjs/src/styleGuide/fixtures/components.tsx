import ButtonSubmit from "@/blocks/ButtonSubmit";
import LocaleSelector from "@/blocks/LocaleSelector";
import PriceDisplay from "@/blocks/PriceDisplay";
import QuantitySelector from "@/blocks/QuantitySelector";
import SearchForm from "@/blocks/SearchForm";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import FormTerm from "@/fields/FormTerm";
import PortableText from "@/fields/PortableText";
import ProductThumbnailsGrid from "@/sections/product/ProductThumbnailsGrid";
import DemoAccordions from "../demos/DemoAccordions";
import DemoCart from "../demos/DemoCart";
import DemoCookies from "../demos/DemoCookies";
import DemoFormFields from "../demos/DemoFormFields";
import DemoLocationNotice from "../demos/DemoLocationNotice";
import DemoProductThumbnails from "../demos/DemoProductThumbnails";
import { componentEntry, type Entry } from "../entry";
import { formTerms, products } from "./content";
import { announcementBanner, footer, header } from "./settings";

const FULL_WIDTH = { padded: false };
// Fixed bars and overlays sit on the viewport, so their frames get a height to sit in.
const VIEWPORT = { padded: false, height: 480 };

export const componentEntries: Entry[] = [
  componentEntry(
    "Site",
    "Announcement Banner",
    AnnouncementBanner,
    { announcementBanner },
    FULL_WIDTH,
  ),
  // Fixed height: the header's bar is fixed and its links stick while the page scrolls.
  componentEntry("Site", "Header", Header, { header }, { padded: false, height: 360 }),
  componentEntry("Site", "Footer", Footer, { footer }, FULL_WIDTH),
  componentEntry("Site", "Cookie Banner", DemoCookies, {}, VIEWPORT),
  componentEntry("Site", "Location Notice", DemoLocationNotice, {}, VIEWPORT),
  componentEntry("Site", "Cart", DemoCart, {}, { padded: false, height: 720 }),

  componentEntry("Shop", "Product Thumbnail", DemoProductThumbnails, {}),
  componentEntry("Shop", "Product Thumbnails Grid", ProductThumbnailsGrid, {
    products,
  }),
  componentEntry("Shop", "Price", PriceDisplay, { amount: "699.95", currency: "AUD" }),
  componentEntry("Shop", "Price, compare-at", PriceDisplay, {
    kind: "compare-at",
    amount: "785.00",
    currency: "AUD",
  }),
  componentEntry("Shop", "Price, prefixed", PriceDisplay, {
    amount: "9.95",
    currency: "AUD",
    prefix: "From",
  }),
  componentEntry("Shop", "Quantity Selector", QuantitySelector, {}),
  // Fixed height: predictive results open below the field.
  componentEntry("Shop", "Search Form", SearchForm, {}, { height: 480 }),
  componentEntry("Shop", "Locale Selector", LocaleSelector, {}),

  componentEntry("Forms", "Form Fields", DemoFormFields, {}),
  componentEntry("Forms", "Form Term, required", FormTerm, {
    term: formTerms.privacy,
    statement: <PortableText value={formTerms.privacy.statementRaw} />,
    prefix: "sg-term",
  }),
  componentEntry("Forms", "Form Term, optional", FormTerm, {
    term: formTerms.newsletter,
    statement: <PortableText value={formTerms.newsletter.statementRaw} />,
    prefix: "sg-term",
  }),
  componentEntry("Forms", "Button Submit", ButtonSubmit, { label: "Send" }),
  componentEntry("Forms", "Button Submit, muted until ready", ButtonSubmit, {
    label: "Send",
    mutedUntilReady: true,
  }),

  componentEntry("Layouts", "Accordion", DemoAccordions, {}),
];
