import { getGithubOAuthUrl, getGoogleOAuthUrl } from "@/lib/api/oauth";
import styles from "../AuthForm.module.css";

export default function OAuthButtons() {
  return (
    <div className={styles.oauthSection}>
      <div className={styles.oauthDivider}>
        <span>or continue with</span>
      </div>

      <div className={styles.oauthButtons}>
        <a className={styles.oauthButton} href={getGoogleOAuthUrl()}>
          Continue with Google
        </a>
        <a className={styles.oauthButton} href={getGithubOAuthUrl()}>
          Continue with GitHub
        </a>
      </div>
    </div>
  );
}
