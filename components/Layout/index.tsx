import Navbar from "./Navbar";
import styles from "./Layout.module.css";

type LayoutProps = {
  flex?: boolean;
  center?: boolean;
  vh?: string;
  children?: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ flex, center, children, vh }) => {
  return (
    <>
      <Navbar />
      <main
        className={`${styles.main} ${flex && styles.flex} ${
          center && styles.center
        }`}
        style={vh ? { height: vh } : {}}
      >
        {children && children}
      </main>
    </>
  );
};

export default Layout;
