import { StructureResolver } from "sanity/structure";
import { home } from "./home";
import { components } from "./components";
import { pages } from "./pages";
import { collections } from "./collections";
import { products } from "./products";

export const structure: StructureResolver = (S) => {
  // prettier-ignore
  return S.list()
		.title('Content')
		.items([
			components(S),
			S.divider(),
			home(S),
			pages(S),
			S.divider(),
			collections(S),
			products(S),
		])
};
