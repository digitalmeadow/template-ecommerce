import { graphql } from "../generated";

export const localizationsQuery = graphql(`
  query AllLocalizations {
    localization {
      availableCountries {
        isoCode
        name
        currency {
          isoCode
        }
        availableLanguages {
          isoCode
          endonymName
        }
      }
    }
  }
`);
