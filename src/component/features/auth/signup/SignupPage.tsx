import { Squircle } from "@squircle-js/react";
import AuthLayout from "../components/AuthLayout";
import OAuthButtons from "../components/OAuthButtons";
import styles from "../AuthForm.module.css";
import { useSignupPage } from "./hooks/useSignupPage";

export default function SignupPage() {
  const {
    username,
    email,
    password,
    setUsername,
    setEmail,
    setPassword,
    isSubmitting,
    error,
    handleSubmit,
    copy,
  } = useSignupPage();

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
          <label className={styles.label} htmlFor="username">
            Username
          </label>
          <input
            id="username"
            className={styles.input}
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            autoComplete="username"
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            className={styles.input}
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
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
            autoComplete="new-password"
            minLength={6}
            required
          />
        </div>

        <Squircle asChild cornerRadius={14} cornerSmoothing={0.8}>
          <button type="submit" className={styles.submit} disabled={isSubmitting}>
            {isSubmitting ? "Signing up..." : copy.submitLabel}
          </button>
        </Squircle>
      </form>

      <OAuthButtons />
    </AuthLayout>
  );
}
