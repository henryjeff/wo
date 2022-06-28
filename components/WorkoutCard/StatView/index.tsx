import { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleUp,
  faAngleDown,
  faGripLines,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import styles from "./StatView.module.css";

export type StatViewProps = {
  label: string;
  number: number;
  neutral?: number;
  range?: number;
  id: string;
};

const StatView: React.FC<StatViewProps> = ({
  label,
  number,
  range,
  neutral,
  id,
}) => {
  const neutralNumber = useMemo(() => {
    if (!neutral) return 0;
    return neutral;
  }, [neutral]);

  const rangeNumber = useMemo(() => {
    if (!range) return 1;
    return range;
  }, [range]);

  const icon = useMemo(
    () =>
      number > neutralNumber + rangeNumber
        ? faAngleUp
        : number < neutralNumber - rangeNumber
        ? faAngleDown
        : faGripLines,
    [number, neutralNumber, rangeNumber]
  );

  const color = useMemo(
    () =>
      number > neutralNumber + rangeNumber
        ? styles.positive
        : number < neutralNumber - rangeNumber
        ? number < neutralNumber - rangeNumber * 2
          ? styles.negative
          : styles.warning
        : "",
    [number, neutralNumber, rangeNumber]
  );

  return (
    <motion.div
      className={styles.container}
      layoutId={`stat-view-${id}-${label}`}
    >
      <p className={styles.label}>{label}</p>
      <div className={`${styles.statCircle} ${color}`}>
        <FontAwesomeIcon
          className={`${styles.icon} ${color}`}
          icon={icon}
          width={10}
        />
      </div>
      <p className={`${styles.statNumber} ${color}`}>{number}%</p>
    </motion.div>
  );
};

export default StatView;
