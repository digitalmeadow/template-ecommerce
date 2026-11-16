// Optional JSON body an endpoint can return; `errors` is keyed by field name.
export interface FormSubmissionResponse {
  ok?: boolean;
  message?: string;
  errors?: Record<string, string>;
}
