import { StructureResolver } from "sanity/structure";
import { home } from "./home";
import { settings } from "./settings";
import { pages } from "./pages";
import { collections } from "./collections";
import { products } from "./products";
import { library } from "./library";

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
