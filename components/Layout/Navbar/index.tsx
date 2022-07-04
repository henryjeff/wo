import styles from "./Navbar.module.css";
import logo from "@/public/logo-new.svg";
import Image from "next/image";
import Link from "next/link";
import { motion, useAnimation, useAnimationFrame } from "framer-motion";
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
    <Link href={href}>
      <div className={`${styles.navLinkContainer}`}>
        <a className={`${isHere && styles.navLinkHere}`}>{name}</a>
        <motion.div
          layoutId={`navbar-loc-${href}`}
          className={styles.locationIndicator}
          animate={isHere ? "here" : "away"}
          variants={navLocationIndicatorVars}
          initial="away"
        />
      </div>
    </Link>
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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import {
  defaultMountAnimation,
  Easing,
  mountAnimation,
} from "@/styles/animation";

const Navbar: React.FC<NavbarProps> = ({}) => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarMenuButtonControls = useAnimation();

  const handleNavbarMenuClick = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    await navbarMenuButtonControls.start({
      scaleY: 0,
      transition: { ease: Easing.expIn, duration: 0.1 },
    });
    setNavbarOpen(e.target.checked);
    await navbarMenuButtonControls.start({
      scaleY: 1,
      transition: { ease: Easing.expOut, duration: 0.1 },
    });
  };

  return (
    <div className={styles.nav}>
      <input
        type="checkbox"
        id={styles.navCheck}
        onChange={handleNavbarMenuClick}
      />
      <div className={styles.leftContent}>
        <Link href="/">
          <a>
            <Image src={logo} color="#fff" width={64} height={24} alt="logo" />
          </a>
        </Link>
      </div>
      <div className={styles.navBtn}>
        <label htmlFor={styles.navCheck}>
          <motion.div
            // layoutId="navigation-open-close"
            animate={navbarMenuButtonControls}
          >
            <FontAwesomeIcon
              icon={navbarOpen ? faClose : faBars}
              width={navbarOpen ? "1.5em" : "1.5em"}
              height={navbarOpen ? "1.8em" : "1.5em"}
            />
          </motion.div>
        </label>
      </div>

      <div className={styles.navLinks}>
        <NavbarLink name="Home" href="/" />
        <NavbarLink name="Workouts" href="/workouts" />
        <NavbarLink name="Editor" href="/editor" />
        <span className={styles.mobileOnlyLinks}>
          <NavbarLink name="Sign In" href="/signin" />
          <NavbarLink name="Sign Up" href="/signup" />
        </span>
      </div>
      <div className={styles.rightContent}>
        <Button text="Sign Up" href="/signup" />
      </div>
    </div>
  );
};

export default Navbar;
