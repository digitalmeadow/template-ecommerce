export const prerender = false;

import type { APIRoute } from "astro";
import { Octokit } from "octokit";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "sanity";
import { GIT_API_TOKEN, SANITY_WEBHOOK_SECRET } from "astro:env/server";
import { GIT_BRANCH, DEPLOY_ENVIRONMENT } from "astro:env/client";
import { GIT_OWNER, GIT_REPO, GIT_WORKFLOW_ID_DEPLOY } from "@config";

const GITHUB_API_VERSION = "2026-03-10";

// A run this young hasn't fetched content yet, so it already carries this publish.
const DEBOUNCE_MS = 30_000;

// Dispatch inputs can't be read back, so match on branch + event; only this worker dispatches.
async function findPendingRun(octokit: Octokit) {
  const { data } = await octokit.request(
    `GET /repos/${GIT_OWNER}/${GIT_REPO}/actions/workflows/${GIT_WORKFLOW_ID_DEPLOY}/runs`,
    {
      branch: GIT_BRANCH,
      event: "workflow_dispatch",
      per_page: 10,
      headers: { "X-GitHub-Api-Version": GITHUB_API_VERSION },
    },
  );

  return data.workflow_runs.find(
    (run: { status: string | null; created_at: string; html_url: string }) =>
      (run.status === "queued" || run.status === "in_progress") &&
      Date.now() - new Date(run.created_at).getTime() < DEBOUNCE_MS,
  );
}

export const POST: APIRoute = async ({ request }) => {
  const signature = request.headers.get(SIGNATURE_HEADER_NAME);
  if (!signature) {
    return new Response("Missing signature", { status: 401 });
  }

  const body = await request.text();
  const validSignature = await isValidSignature(body, signature, SANITY_WEBHOOK_SECRET!);

  if (!validSignature) {
    return new Response("Invalid signature", { status: 401 });
  }

  const octokit = new Octokit({
    auth: GIT_API_TOKEN,
  });

  const pending = await findPendingRun(octokit);
  if (pending) {
    return new Response(JSON.stringify({ coalesced: true, run_url: pending.html_url }), {
      status: 202,
      headers: { "content-type": "application/json" },
    });
  }

  const result = await octokit.request(
    `POST /repos/${GIT_OWNER}/${GIT_REPO}/actions/workflows/${GIT_WORKFLOW_ID_DEPLOY}/dispatches`,
    {
      ref: GIT_BRANCH,
      inputs: { environment: DEPLOY_ENVIRONMENT },
      headers: { "X-GitHub-Api-Version": GITHUB_API_VERSION },
    },
  );

  // This API version returns 200 + run details rather than 204.
  return new Response(JSON.stringify(result.data), {
    status: result.status,
    headers: { "content-type": "application/json" },
  });
};
