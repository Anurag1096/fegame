export const GOOGLE_OAUTH_PATH = "/api/auth/google";
export const GITHUB_OAUTH_PATH = "/api/auth/github";

export function getGoogleOAuthUrl(): string {
  return GOOGLE_OAUTH_PATH;
}

export function getGithubOAuthUrl(): string {
  return GITHUB_OAUTH_PATH;
}
