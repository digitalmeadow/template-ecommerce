import { graphql } from "../generated";

export const localizationQuery = graphql(`
  query LocalizationQuery {
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
