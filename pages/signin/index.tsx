import type { NextPage } from "next";
import Head from "next/head";
import { Layout, DefaultHeadMetaTags } from "@/components/Page";
import TextInput from "@/components/TextInput";
import styles from "./SignIn.module.css";
import Button from "@/components/Button";
import { faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const SignIn: NextPage = () => {
  return (
    <>
      <Head>
        <DefaultHeadMetaTags />
      </Head>
      <Layout className={styles.layout}>
        <h1>Sign In</h1>
        <form className={styles.form}>
          <label htmlFor="email">
            <TextInput
              icon={faUser}
              name="email"
              placeholder="Email Address"
              onChange={() => {}}
            />
          </label>

          <label htmlFor="password">
            <TextInput
              icon={faKey}
              name="password"
              placeholder="Password"
              onChange={() => {}}
            />
          </label>
          <div className={styles.formFooter}>
            <Button text="Sign Up" />
            <Link href="/signup">
              <a>Or click here to Sign Up</a>
            </Link>
          </div>
        </form>
      </Layout>
    </>
  );
};

export default SignIn;
