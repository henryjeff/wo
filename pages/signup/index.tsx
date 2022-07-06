import type { NextPage } from "next";
import Head from "next/head";
import { Layout, DefaultHeadMetaTags } from "@/components/Page";
import TextInput from "@/components/TextInput";
import styles from "./SignUp.module.css";
import Button from "@/components/Button";
import { faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import useSignUp from "@/hooks/auth/useSignUp";
import { motion } from "framer-motion";
import { defaultMountAnimation } from "@/styles/animation";

const SignUp: NextPage = () => {
  const form = useSignUp();

  return (
    <>
      <Head>
        <DefaultHeadMetaTags />
      </Head>
      <Layout className={styles.layout}>
        <h1>Sign Up</h1>
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

          <label htmlFor="confirmPassword">
            <TextInput
              icon={faKey}
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={form.setConfirmPassword}
              type="password"
            />
          </label>
          <div className={styles.formFooter}>
            <Button
              text="Sign Up"
              onClick={form.signUp}
              loading={form.loading}
            />
            <Link href="/signin">
              <a>Or click here to Sign In</a>
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

export default SignUp;
