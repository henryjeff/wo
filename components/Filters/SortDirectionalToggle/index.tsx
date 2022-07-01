import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useMemo } from "react";
import Button from "@/components/Button";
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
    <Button
      onClick={() => setUp(!up)}
      text={text ? text : "Sort"}
      EndItem={
        <motion.div variants={arrowVars} animate={up ? "up" : "down"}>
          <FontAwesomeIcon
            icon={faArrowDown}
            width={10}
            className={styles.icon}
          />
        </motion.div>
      }
    />
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
