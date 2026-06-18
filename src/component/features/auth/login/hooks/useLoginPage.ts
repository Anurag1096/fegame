import { FormEvent, useState } from "react";
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

export function useLoginPage() {
  const router = useRouter();
  const loginMutation = useLoginMutation();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

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
    loginMutation.error instanceof ApiError
      ? loginMutation.error.message
      : loginMutation.error
        ? "Unable to log in. Please try again."
        : null;

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
