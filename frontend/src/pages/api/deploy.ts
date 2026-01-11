export const prerender = false;

import type { APIRoute } from "astro";
import { Octokit } from "octokit";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "sanity";
import {
  GIT_BRANCH,
  GIT_API_TOKEN,
  GIT_WORKFLOW_ID_DEPLOY,
  SANITY_WEBHOOK_SECRET,
} from "astro:env/server";
import { GIT_OWNER, GIT_REPO } from "../../../config";

export const POST: APIRoute = async ({ request }) => {
  const signature = request.headers.get(SIGNATURE_HEADER_NAME);
  if (!signature) {
    return new Response("Missing signature", { status: 401 });
  }

  const body = await request.text();
  const validSignature = await isValidSignature(
    body,
    signature,
    SANITY_WEBHOOK_SECRET!
  );

  if (!validSignature) {
    return new Response("Invalid secret", { status: 401 });
  }

  const octokit = new Octokit({
    auth: GIT_API_TOKEN,
  });

  const result = await octokit.request(
    `POST /repos/${GIT_OWNER}/${GIT_REPO}/actions/workflows/${GIT_WORKFLOW_ID_DEPLOY}/dispatches`,
    {
      ref: GIT_BRANCH,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  // GitHub returns a 204 No Content on success
  if (result.status === 204) {
    return new Response(null, { status: 204 });
  }

  return new Response(JSON.stringify(result.data), { status: result.status });
};
