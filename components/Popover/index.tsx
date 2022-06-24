import styles from "./Popover.module.css";
import { motion } from "framer-motion";
import { useState } from "react";
import Badge from "../Badge";

export type PopoverProps = {
  text: string;
  children: any;
};

const Popover: React.FC<PopoverProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div onClick={() => setIsOpen(!isOpen)}>
        <button>{props.text}</button>
      </div>
      <motion.div
        animate={isOpen ? "open" : "closed"}
        variants={popOverVars}
        className={styles.popOver}
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
