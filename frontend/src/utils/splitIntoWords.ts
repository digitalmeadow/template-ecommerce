// Wraps each word in <span class="word">, splitting text nodes only so existing elements survive.
export function splitIntoWords(container: HTMLElement): HTMLElement[] {
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];
  let node: Node | null;
  while ((node = walker.nextNode())) {
    if (node.textContent?.trim()) textNodes.push(node as Text);
  }

  const words: HTMLElement[] = [];
  for (const textNode of textNodes) {
    const fragment = document.createDocumentFragment();
    const parts = textNode.textContent!.split(/(\s+)/).filter(Boolean);
    for (const part of parts) {
      if (/^\s+$/.test(part)) {
        fragment.append(part);
        continue;
      }
      const span = document.createElement("span");
      span.className = "word";
      span.textContent = part;
      fragment.append(span);
      words.push(span);
    }
    textNode.replaceWith(fragment);
  }
  return words;
}
