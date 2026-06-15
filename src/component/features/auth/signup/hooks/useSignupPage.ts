import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { ApiError } from "@/lib/auth/types";
import { useAuthStore } from "@/stores/authStore";
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
  const signup = useAuthStore((state) => state.signup);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await signup({ username, email, password });
      await router.push("/dashboard");
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : "Unable to sign up. Please try again.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    username,
    email,
    password,
    setUsername,
    setEmail,
    setPassword,
    isSubmitting,
    error,
    handleSubmit,
    copy: COPY,
  };
}
