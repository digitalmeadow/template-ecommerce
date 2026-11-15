import { graphql } from "../generated";

// Every form's definition, for the server-side validation the form endpoint runs.
export const formsQuery = graphql(`
  query FormsQuery {
    allForm {
      ...Form
    }
  }
`);
