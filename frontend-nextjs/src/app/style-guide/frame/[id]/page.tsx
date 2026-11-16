import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { findEntry } from "@/styleGuide/entries";
import { isScheme, isStyleGuideEnabled } from "@/styleGuide/entry";
import StyleGuideFrame from "@/styleGuide/StyleGuideFrame";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ scheme?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const entry = findEntry((await params).id);
  return { title: entry ? `${entry.group}: ${entry.title}` : "Not found" };
}

export default async function StyleGuideFramePage({ params, searchParams }: Props) {
  await connection();
  const entry = findEntry((await params).id);
  if (!isStyleGuideEnabled || !entry) notFound();

  const { scheme } = await searchParams;
  return <StyleGuideFrame entry={entry} scheme={isScheme(scheme) ? scheme : "light"} />;
}
