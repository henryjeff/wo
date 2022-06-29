import type { NextPage } from "next";
import Head from "next/head";
import { Layout, DefaultHeadMetaTags } from "../../components";
import Badge from "../../components/Badge";
import LiftViewEditor from "../../components/Editor/LiftViewEditor";
import styles from "./Editor.module.css";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <DefaultHeadMetaTags />
      </Head>
      <Layout>
        <div className={styles.layout}>
          {/* <h1>Editor</h1> */}
          <LiftViewEditor />
        </div>
      </Layout>
    </>
  );
};

export default Home;
