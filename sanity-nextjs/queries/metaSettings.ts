import { graphql } from "../generated";

export const metaSettingsQuery = graphql(`
  query MetaSettingsQuery {
    allMetaSettings {
      ...MetaSettings
    }
  }
`);
