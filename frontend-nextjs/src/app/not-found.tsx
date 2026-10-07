import type { Metadata } from "next";
import { buildMetadata } from "@/meta/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({ metaData: { title: "404 - Page Not Found" } });
}

export default function NotFound() {
  return (
    <div className="u-container">
      <h1>404 - Page Not Found</h1>
    </div>
  );
}
