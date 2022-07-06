import type { NextPage } from "next";
import Head from "next/head";
import { Layout, DefaultHeadMetaTags } from "@/components/Page";
import TextInput from "@/components/TextInput";
import styles from "./SignIn.module.css";
import Button from "@/components/Button";
import { faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useSession } from "next-auth/react";
import useSignIn from "@/hooks/auth/useSignIn";
import { motion } from "framer-motion";
import { defaultMountAnimation } from "@/styles/animation";

const SignIn: NextPage = () => {
  const form = useSignIn();

  return (
    <>
      <Head>
        <DefaultHeadMetaTags />
      </Head>
      <Layout className={styles.layout}>
        <h1>Sign In</h1>
        <div className={styles.form}>
          <label htmlFor="email">
            <TextInput
              icon={faUser}
              name="email"
              placeholder="Email Address"
              onChange={form.setEmail}
            />
          </label>

          <label htmlFor="password">
            <TextInput
              icon={faKey}
              name="password"
              placeholder="Password"
              onChange={form.setPassword}
              type="password"
            />
          </label>
          <div className={styles.formFooter}>
            <Button
              text="Sign In"
              onClick={form.signIn}
              loading={form.loading}
            />
            <Link href="/signup">
              <a>Or click here to Sign Up</a>
            </Link>
            <br />
            {form.error && (
              <motion.p className={styles.errorText} {...defaultMountAnimation}>
                {form.error}
              </motion.p>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default SignIn;
