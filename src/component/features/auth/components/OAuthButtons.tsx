import { getGithubOAuthUrl, getGoogleOAuthUrl } from "@/lib/api/oauth";
import styles from "../AuthForm.module.css";

const OAUTH_PROVIDERS = [
  {
    id: "google",
    label: "Continue with Google",
    href: getGoogleOAuthUrl(),
    iconSrc: "/oauth/google.svg",
  },
  {
    id: "github",
    label: "Continue with GitHub",
    href: getGithubOAuthUrl(),
    iconSrc: "/oauth/github.svg",
  },
] as const;

export default function OAuthButtons() {
  return (
    <div className={styles.oauthSection}>
      <div className={styles.oauthDivider}>
        <span>or continue with</span>
      </div>

      <div className={styles.oauthButtons}>
        {OAUTH_PROVIDERS.map((provider) => (
          <a
            key={provider.id}
            className={styles.oauthImageButton}
            href={provider.href}
            aria-label={provider.label}
            title={provider.label}
          >
            <img
              className={
                provider.id === "github"
                  ? `${styles.oauthImage} ${styles.oauthImageGithub}`
                  : styles.oauthImage
              }
              src={provider.iconSrc}
              alt=""
              width={24}
              height={24}
            />
          </a>
        ))}
      </div>
    </div>
  );
}
