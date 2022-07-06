import { useState } from "react";
import { z } from "zod";
import useSignIn from "./useSignIn";

export default function useSignUp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const signIn = useSignIn();

  const verifySignUp = () => {
    if (!z.string().email().safeParse(email).success) {
      setError("Email must be valid");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const signUp = async () => {
    if (!verifySignUp()) {
      return;
    }
    setLoading(true);
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();
    if (response.status === 201) {
      signIn.setEmail(email);
      signIn.setPassword(password);
      await signIn.signIn();
    } else {
      setError(data.message);
    }
    setLoading(false);
  };

  return {
    setEmail,
    email,
    setPassword,
    password,
    setConfirmPassword,
    confirmPassword,
    signUp,
    loading,
    error,
  };
}
