import styles from "./Navbar.module.css";
import logo from "../../../public/vercel.svg";
import Image from "next/image";

export type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = ({}) => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image src={logo} color="#fff" width={64} height={24} alt="logo" />
        <h4>by henry heffernan</h4>
      </div>
    </div>
  );
};

export default Navbar;
