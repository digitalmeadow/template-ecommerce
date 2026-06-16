import type {
  MetaFragment,
  MetaSettingsFragment,
} from "sanity-nextjs/generated/graphql";

const WEBSITE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL || "";

interface Props {
  metaData?: MetaFragment | null;
  metaSettingsData?: MetaSettingsFragment | null;
  pathname?: string;
}

export default function Meta({ metaData, metaSettingsData, pathname }: Props) {
  const title = metaData?.title || metaSettingsData?.meta?.title || "";
  const description =
    metaData?.description || metaSettingsData?.meta?.description || "";
  const image = metaData?.image || metaSettingsData?.meta?.image;
  const canonicalUrl = pathname
    ? new URL(pathname, WEBSITE_URL).href
    : undefined;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image?.asset?.url && (
        <meta property="og:image" content={image.asset.url} />
      )}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
    </>
  );
}
