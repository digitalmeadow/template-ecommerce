import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { truncate } from "@/lib/sanity/meta";
import { DEFAULT_LOCALE } from "@/lib/shopify/locale";
import { getRenderLocale } from "@/lib/shopify/renderLocale";
import { getShopPolicies } from "@/lib/shopify/shop";
import { buildMetadata } from "@/meta/metadata";

interface Props {
  params: Promise<{ handle: string }>;
}

// Legal pages authored in Shopify admin (Settings → Policies), at Shopify's own paths.
export async function generateStaticParams() {
  const policies = await getShopPolicies(DEFAULT_LOCALE);
  return policies.map((policy) => ({ handle: policy.handle }));
}

export const dynamicParams = false;

async function loadPolicy(handle: string) {
  const policies = await getShopPolicies(await getRenderLocale());
  return policies.find((candidate) => candidate.handle === handle) ?? null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const policy = await loadPolicy(handle);
  if (!policy) return {};

  const description = truncate(
    policy.body
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );

  return buildMetadata({
    meta: { title: policy.title, description, image: null },
    locale: await getRenderLocale(),
    pathname: `/policies/${handle}`,
  });
}

export default async function PolicyPage({ params }: Props) {
  const { handle } = await params;
  const policy = await loadPolicy(handle);
  if (!policy) notFound();

  return (
    <article className="g-page-margin pt-40">
      <div className="g-container-sm flex flex-col gap-10">
        <h1 className="g-heading-3">{policy.title}</h1>
        <div
          className="leading-body [&_*+*]:mt-4"
          dangerouslySetInnerHTML={{ __html: policy.body }}
        />
      </div>
    </article>
  );
}
