import type { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import Router from "next/router";

const SignOut: NextPage = () => {
  const session = useSession();

  useEffect(() => {
    if (session.status === "authenticated") signOut();
    Router.push("/");
  }, [session.status]);

  return <></>;
};

export default SignOut;
