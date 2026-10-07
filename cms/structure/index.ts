import { StructureResolver } from "sanity/structure";
import { home } from "./home";
import { settings } from "./settings";
import { pages } from "./pages";
import { collections } from "./collections";
import { products } from "./products";
import { forms } from "./forms";

export const structure: StructureResolver = (S) => {
  // prettier-ignore
  return S.list()
		.title('Content')
		.items([
			settings(S),
			S.divider(),
			home(S),
			pages(S),
			forms(S),
			S.divider(),
			products(S),
			collections(S),
		])
};
