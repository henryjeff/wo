import { signIn } from "next-auth/react";
import { useState } from "react";
import { z } from "zod";
import Router from "next/router";

export default function useSignIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const verifySignIn = () => {
    if (!z.string().email().safeParse(email).success) {
      setError("Email must be valid");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const signInHandler = async () => {
    if (!verifySignIn()) {
      return;
    }
    setLoading(true);
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    response?.error && setError(response.error);
    if (response?.ok) {
      Router.push("/workouts");
    }
    setLoading(false);
  };

  return {
    setEmail,
    email,
    setPassword,
    password,
    signIn: signInHandler,
    loading,
    error,
  };
}
