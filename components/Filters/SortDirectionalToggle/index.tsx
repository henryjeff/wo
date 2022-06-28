import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import styles from "./SortDirectionalToggle.module.css";

export type SortDirectionalToggleProps = {
  up: boolean;
  setUp: React.Dispatch<React.SetStateAction<boolean>>;
  text?: string;
};

const SortDirectionalToggle: React.FC<SortDirectionalToggleProps> = ({
  up,
  setUp,
  text,
}) => {
  return (
    <button onClick={() => setUp(!up)} className={styles.container}>
      <p className={styles.sortText}>{text ? text : "Sort"}</p>
      <motion.div variants={arrowVars} animate={up ? "up" : "down"}>
        <FontAwesomeIcon
          icon={faArrowDown}
          width={10}
          className={styles.icon}
        />
      </motion.div>
    </button>
  );
};

const arrowVars = {
  up: {
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
  down: {
    rotate: 180,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
};

export default SortDirectionalToggle;
