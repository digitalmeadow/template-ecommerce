import SectionsRenderer from "@/sections/SectionsRenderer";
import { sanityClient } from "sanity-nextjs";
import { homeQuery } from "sanity-nextjs/queries/home";

export default async function HomePage() {
  const pageQuery = await sanityClient.request(homeQuery);
  const pageData = pageQuery.allHome[0];

  return <SectionsRenderer sections={pageData.sections} />;
}
