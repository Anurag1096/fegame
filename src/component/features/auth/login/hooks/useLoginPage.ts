import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ApiError } from "@/lib/auth/types";
import { useLoginMutation } from "../../hooks/useAuthSession";
import { AuthPageCopy } from "../../types";

const COPY: AuthPageCopy = {
  pageTitle: "Log in | FeGame",
  metaDescription: "Log in to access your FeGame dashboard.",
  title: "Welcome back",
  subtitle: "Log in to open your dashboard and join a match.",
  submitLabel: "Log in",
  footerText: "New here?",
  footerLinkLabel: "Create an account",
  footerHref: "/signup",
};

const OAUTH_ERROR_MESSAGES: Record<string, string> = {
  oauth_failed: "OAuth sign-in failed. Please try again or use your password.",
  oauth_unavailable: "OAuth is not configured on the server yet.",
};

export function useLoginPage() {
  const router = useRouter();
  const loginMutation = useLoginMutation();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [oauthError, setOauthError] = useState<string | null>(null);

  useEffect(() => {
    const errorCode = router.query.error;
    if (typeof errorCode !== "string") {
      return;
    }

    setOauthError(OAUTH_ERROR_MESSAGES[errorCode] ?? OAUTH_ERROR_MESSAGES.oauth_failed);
  }, [router.query.error]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await loginMutation.mutateAsync({ userName, password });
      await router.push("/dashboard");
    } catch {
      // Error surfaced via loginMutation.error below
    }
  }

  const error =
    oauthError ??
    (loginMutation.error instanceof ApiError
      ? loginMutation.error.message
      : loginMutation.error
        ? "Unable to log in. Please try again."
        : null);

  return {
    userName,
    password,
    setUserName,
    setPassword,
    isSubmitting: loginMutation.isPending,
    error,
    handleSubmit,
    copy: COPY,
  };
}
