import { notFound } from "next/navigation";

// Every path no page claims renders the locale's not-found page, inside its layout.
export default function CatchAll() {
  notFound();
}
