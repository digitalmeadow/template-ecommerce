import PortableText from "@/fields/PortableText";
import Accordion from "@/layouts/Accordion";
import { lorem, paragraph } from "../fixtures/content";

const items = [
  { summary: "Shipping", text: "Orders ship within two working days from our warehouse." },
  { summary: "Returns", text: "Unridden boards can be returned within 30 days." },
  { summary: "Warranty", text: lorem.long },
];

// One group, the first open: opening another closes it.
export default function DemoAccordions() {
  return (
    <div className="g-container-sm">
      {items.map((item, index) => (
        <Accordion
          key={item.summary}
          summary={item.summary}
          group="style-guide"
          isInitiallyOpen={index === 0}
          content={<PortableText value={paragraph(item.text)} />}
        />
      ))}
    </div>
  );
}
