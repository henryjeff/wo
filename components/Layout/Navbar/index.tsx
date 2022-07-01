import styles from "./Navbar.module.css";
import logo from "@/public/logo-new.svg";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Button from "@/components/Button";

export type NavbarLinkProps = {
  name: string;
  href: string;
};

const NavbarLink: React.FC<NavbarLinkProps> = ({ name, href }) => {
  // check if we are currently at the href
  const router = useRouter();
  const isHere = router.pathname === href;
  // const isActive = href === window.location.pathname;

  return (
    <div className={`${styles.navLinkContainer}`}>
      <Link href={href}>
        <a className={`${isHere && styles.navLinkHere}`}>{name}</a>
      </Link>
      {/* <motion.div
        layoutId={`navbar-loc-${href}`}
        className={styles.locationIndicator}
        animate={isHere ? "here" : "away"}
        variants={navLocationIndicatorVars}
        initial="away"
      /> */}
    </div>
  );
};

const navLocationIndicatorVars = {
  away: {
    scaleX: 0,
  },
  here: {
    scaleX: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = ({}) => {
  return (
    <div className={styles.container}>
      <div className={styles.leftContent}>
        <Image src={logo} color="#fff" width={64} height={24} alt="logo" />
        {/* <h4>by henry heffernan</h4> */}
      </div>
      <nav className={styles.navLinks}>
        <NavbarLink name="Home" href="/" />
        <NavbarLink name="Dashboard" href="/dashboard" />
        <NavbarLink name="Editor" href="/editor" />
      </nav>
      <div className={styles.rightContent}>
        <Button text="Sign Up" />
      </div>
    </div>
  );
};

export default Navbar;
