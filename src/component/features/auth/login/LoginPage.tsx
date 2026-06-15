import { Squircle } from "@squircle-js/react";
import AuthLayout from "../components/AuthLayout";
import styles from "../AuthForm.module.css";
import { useLoginPage } from "./hooks/useLoginPage";

export default function LoginPage() {
  const {
    userName,
    password,
    setUserName,
    setPassword,
    isSubmitting,
    error,
    handleSubmit,
    copy,
  } = useLoginPage();

  return (
    <AuthLayout
      pageTitle={copy.pageTitle}
      metaDescription={copy.metaDescription}
      title={copy.title}
      subtitle={copy.subtitle}
      footerText={copy.footerText}
      footerLinkLabel={copy.footerLinkLabel}
      footerHref={copy.footerHref}
    >
      <form className={styles.form} onSubmit={handleSubmit}>
        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.field}>
          <label className={styles.label} htmlFor="userName">
            Username
          </label>
          <input
            id="userName"
            className={styles.input}
            type="text"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
            autoComplete="username"
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <input
            id="password"
            className={styles.input}
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
          />
        </div>

        <Squircle asChild cornerRadius={14} cornerSmoothing={0.8}>
          <button type="submit" className={styles.submit} disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : copy.submitLabel}
          </button>
        </Squircle>
      </form>
    </AuthLayout>
  );
}
