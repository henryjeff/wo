import styles from "./Popover.module.css";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

export type PopoverProps = {
  text: string;
  icon?: FontAwesomeIconProps["icon"];
  children: any;
};

const Popover: React.FC<PopoverProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={styles.container}
      ref={ref}
      style={isOpen ? {} : { zIndex: 1 }}
    >
      <div onClick={() => setIsOpen(!isOpen)}>
        <button>
          <div className={styles.popOverButton}>
            {props.icon && <FontAwesomeIcon icon={props.icon} width={12} />}
            {props.text}
          </div>
        </button>
      </div>
      <motion.div
        animate={isOpen ? "open" : "closed"}
        variants={popOverVars}
        className={styles.popOver}
        initial={false}
        style={isOpen ? {} : { pointerEvents: "none" }}
      >
        {props.children}
      </motion.div>
    </div>
  );
};

const popOverVars = {
  open: {
    opacity: 1,
    y: 16,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  closed: {
    opacity: 0,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

export default Popover;
