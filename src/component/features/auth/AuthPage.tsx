import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { Squircle } from "@squircle-js/react";
import { Geist } from "next/font/google";
import styles from "./AuthForm.module.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

type LoginPageProps = {
  mode: "login" | "signup";
};

function AuthPage({ mode }: LoginPageProps) {
  const router = useRouter();
  const isLogin = mode === "login";
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/dashboard");
  }

  return (
    <>
      <Head>
        <title>{isLogin ? "Log in" : "Sign up"} | FeGame</title>
        <meta
          name="description"
          content={
            isLogin
              ? "Log in to access your FeGame dashboard."
              : "Create a FeGame account and start playing."
          }
        />
      </Head>
      <div className={`${styles.page} ${geistSans.variable}`}>
        <Squircle cornerRadius={24} cornerSmoothing={0.75} className={styles.card}>
          <Link href="/" className={styles.backLink}>
            Back to home
          </Link>
          <h1 className={styles.title}>{isLogin ? "Welcome back" : "Create account"}</h1>
          <p className={styles.subtitle}>
            {isLogin
              ? "Log in to open your dashboard and join a match."
              : "Sign up to access the dashboard and play online."}
          </p>

          <form className={styles.form} onSubmit={handleSubmit}>
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

            {!isLogin && (
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
            )}

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
                autoComplete={isLogin ? "current-password" : "new-password"}
                minLength={isLogin ? undefined : 6}
                required
              />
            </div>

            <Squircle
              asChild
              cornerRadius={14}
              cornerSmoothing={0.8}
            >
              <button type="submit" className={styles.submit}>
                {isLogin ? "Log in" : "Sign up"}
              </button>
            </Squircle>
          </form>

          <p className={styles.footerText}>
            {isLogin ? "New here?" : "Already have an account?"}{" "}
            <Link
              href={isLogin ? "/signup" : "/login"}
              className={styles.footerLink}
            >
              {isLogin ? "Create an account" : "Log in"}
            </Link>
          </p>
        </Squircle>
      </div>
    </>
  );
}

export function LoginPage() {
  return <AuthPage mode="login" />;
}

export function SignupPage() {
  return <AuthPage mode="signup" />;
}
