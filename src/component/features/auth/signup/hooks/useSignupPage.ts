import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { ApiError } from "@/lib/auth/types";
import { useSignupMutation } from "../../hooks/useAuthSession";
import { AuthPageCopy } from "../../types";

const COPY: AuthPageCopy = {
  pageTitle: "Sign up | FeGame",
  metaDescription: "Create a FeGame account and start playing.",
  title: "Create account",
  subtitle: "Sign up to access the dashboard and play online.",
  submitLabel: "Sign up",
  footerText: "Already have an account?",
  footerLinkLabel: "Log in",
  footerHref: "/login",
};

export function useSignupPage() {
  const router = useRouter();
  const signupMutation = useSignupMutation();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await signupMutation.mutateAsync({ username, email, password });
      await router.push("/dashboard");
    } catch {
      // Error surfaced via signupMutation.error below
    }
  }

  const error =
    signupMutation.error instanceof ApiError
      ? signupMutation.error.message
      : signupMutation.error
        ? "Unable to sign up. Please try again."
        : null;

  return {
    username,
    email,
    password,
    setUsername,
    setEmail,
    setPassword,
    isSubmitting: signupMutation.isPending,
    error,
    handleSubmit,
    copy: COPY,
  };
}
