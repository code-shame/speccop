import { LinearClient } from "@linear/sdk";

export function getLinearClient(accessToken: string) {
  return new LinearClient({ accessToken });
}

export async function getLinearIssue(accessToken: string, issueId: string) {
  const client = getLinearClient(accessToken);
  const issue = await client.issue(issueId);
  return {
    id: issue.id,
    title: issue.title,
    description: issue.description ?? "",
    url: issue.url,
    state: (await issue.state)?.name ?? "Unknown",
  };
}

export async function searchLinearIssue(
  accessToken: string,
  query: string
) {
  const client = getLinearClient(accessToken);
  const issues = await client.issueSearch({ query, first: 5 });
  return issues.nodes.slice(0, 5).map((issue) => ({
    id: issue.id,
    title: issue.title,
    url: issue.url,
    identifier: issue.identifier,
  }));
}

export async function getLinearWorkspaceInfo(accessToken: string) {
  const client = getLinearClient(accessToken);
  const org = await client.organization;
  return {
    id: org.id,
    name: org.name,
    urlKey: org.urlKey,
  };
}
