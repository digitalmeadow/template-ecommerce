import { StructureResolver } from "sanity/structure";
import { collections } from "./collections";
import { home } from "./home";
import { library } from "./library";
import { pages } from "./pages";
import { products } from "./products";
import { settings } from "./settings";

export const structure: StructureResolver = (S) => {
  return S.list()
    .title("Content")
    .items([
      settings(S),
      S.divider(),
      home(S),
      pages(S),
      library(S),
      S.divider(),
      products(S),
      collections(S),
    ]);
};
