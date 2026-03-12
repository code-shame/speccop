import { Octokit } from "@octokit/rest";

export function getOctokit(accessToken: string) {
  return new Octokit({ auth: accessToken });
}

export async function getPullRequest(
  octokit: Octokit,
  owner: string,
  repo: string,
  pullNumber: number
) {
  const { data } = await octokit.pulls.get({ owner, repo, pull_number: pullNumber });
  return data;
}

export async function getPullRequestDiff(
  octokit: Octokit,
  owner: string,
  repo: string,
  pullNumber: number
): Promise<string> {
  const response = await octokit.request(
    "GET /repos/{owner}/{repo}/pulls/{pull_number}",
    {
      owner,
      repo,
      pull_number: pullNumber,
      headers: { accept: "application/vnd.github.v3.diff" },
    }
  );
  return response.data as unknown as string;
}

export async function postPRComment(
  octokit: Octokit,
  owner: string,
  repo: string,
  pullNumber: number,
  body: string
): Promise<number> {
  const { data } = await octokit.issues.createComment({
    owner,
    repo,
    issue_number: pullNumber,
    body,
  });
  return data.id;
}

export async function updatePRComment(
  octokit: Octokit,
  owner: string,
  repo: string,
  commentId: number,
  body: string
) {
  await octokit.issues.updateComment({
    owner,
    repo,
    comment_id: commentId,
    body,
  });
}

export async function createCommitStatus(
  octokit: Octokit,
  owner: string,
  repo: string,
  sha: string,
  state: "error" | "failure" | "pending" | "success",
  description: string
) {
  await octokit.repos.createCommitStatus({
    owner,
    repo,
    sha,
    state,
    description: description.slice(0, 140),
    context: "spec.cop / compliance",
  });
}

export async function getUserRepos(octokit: Octokit) {
  const { data } = await octokit.repos.listForAuthenticatedUser({
    sort: "updated",
    per_page: 50,
  });
  return data;
}
