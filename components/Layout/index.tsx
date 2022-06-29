import Navbar from "./Navbar";
import styles from "./Layout.module.css";

type LayoutProps = {
  flex?: boolean;
  center?: boolean;
  children?: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ flex, center, children }) => {
  return (
    <>
      <Navbar />
      <main
        className={`${styles.main} ${flex && styles.flex} ${
          center && styles.center
        }`}
      >
        {children && children}
      </main>
    </>
  );
};

export default Layout;
