import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { ApiError } from "@/lib/auth/types";
import { useAuthStore } from "@/stores/authStore";
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
  const login = useAuthStore((state) => state.login);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await login({ userName, password });
      await router.push("/dashboard");
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : "Unable to log in. Please try again.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    userName,
    password,
    setUserName,
    setPassword,
    isSubmitting,
    error,
    handleSubmit,
    copy: COPY,
  };
}
