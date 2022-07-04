import Navbar from "./Navbar";
import styles from "./Layout.module.css";

type LayoutProps = {
  flex?: boolean;
  center?: boolean;
  vh?: string;
  children?: React.ReactNode;
  className?: string;
};

const Layout: React.FC<LayoutProps> = ({
  flex,
  center,
  children,
  vh,
  className,
}) => {
  return (
    <>
      <Navbar />
      <main
        className={`${styles.main} ${flex && styles.flex} ${
          center && styles.center
        } ${className}`}
        style={vh ? { height: vh } : {}}
      >
        {children && children}
      </main>
    </>
  );
};

export default Layout;
