import type { NextPage } from "next";
import Head from "next/head";
import { Layout, DefaultHeadMetaTags } from "../components";
import styles from "./Home.module.css";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <DefaultHeadMetaTags />
      </Head>
      <Layout></Layout>
    </>
  );
};

export default Home;
