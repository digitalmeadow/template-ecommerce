import { graphql } from "../generated";

// Every page needs all of these. One request per build beats one per page per singleton.
export const globalsQuery = graphql(`
  query GlobalsQuery {
    allHeader {
      ...Header
    }
    allFooter {
      ...Footer
    }
    allCart {
      ...Cart
    }
    allMetaSettings {
      ...MetaSettings
    }
    allOrganisationSettings {
      ...OrganisationSettings
    }
    allAnalyticsSettings {
      ...AnalyticsSettings
    }
  }
`);
