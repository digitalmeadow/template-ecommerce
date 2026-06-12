interface SanityImageLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

export function sanityImageLoader({
  src,
  width,
  quality,
}: SanityImageLoaderProps): string {
  const baseUrl = src.split("?")[0];
  return `${baseUrl}?w=${width}&fit=max&auto=format&q=${quality}`;
}

export function getSizesAttr(
  sizes: [number, number, number] = [100, 100, 100],
): string {
  const [desktop, tablet, mobile] = sizes;
  return `(min-width: 800px) ${desktop}vw, (min-width: 500px) ${tablet}vw, ${mobile}vw`;
}
