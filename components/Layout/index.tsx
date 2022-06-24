import Navbar from "./Navbar";
import styles from "./Layout.module.css";

export default function Layout({ children }: any) {
  return (
    <>
      <Navbar />
      <main className={styles.main}>{children}</main>
    </>
  );
}
