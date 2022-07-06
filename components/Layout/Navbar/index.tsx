import styles from "./Navbar.module.css";
import logo from "@/public/logo-new.svg";
import Image from "next/image";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next/router";
import Button from "@/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Easing } from "@/styles/animation";
import { signOut, useSession } from "next-auth/react";

export type NavbarLinkProps = {
  name: string;
  href: string;
};

const NavbarLink: React.FC<NavbarLinkProps> = ({ name, href }) => {
  const router = useRouter();
  const isHere = router.pathname === href;

  return (
    <Link href={href}>
      <div className={`${styles.navLinkContainer}`}>
        <a className={`${isHere && styles.navLinkHere}`}>{name}</a>
      </div>
    </Link>
  );
};

export type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = ({}) => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarMenuButtonControls = useAnimation();
  const session = useSession();

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
          <motion.div animate={navbarMenuButtonControls}>
            <FontAwesomeIcon
              icon={navbarOpen ? faClose : faBars}
              width={navbarOpen ? "1.5em" : "1.5em"}
              height={navbarOpen ? "1.8em" : "1.5em"}
            />
          </motion.div>
        </label>
      </div>

      <div className={styles.navLinks}>
        {session.status === "unauthenticated" ? (
          <span className={styles.mobileOnlyLinks}>
            <NavbarLink name="Sign In" href="/signin" />
            <NavbarLink name="Sign Up" href="/signup" />
          </span>
        ) : (
          <>
            <NavbarLink name="Home" href="/" />
            <NavbarLink name="Workouts" href="/workouts" />
            <NavbarLink name="Editor" href="/editor" />
            <span className={styles.mobileOnlyLinks}>
              <NavbarLink name="Sign Out" href="/signout" />
            </span>
          </>
        )}
      </div>
      <div className={styles.rightContent}>
        {session.status === "unauthenticated" ? (
          <>
            <Button text="Sign In" href="/signin" />
            <Button text="Sign Up" href="/signup" />
          </>
        ) : (
          <Button text="Sign Out" onClick={signOut} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
