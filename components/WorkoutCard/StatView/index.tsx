import { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleUp,
  faAngleDown,
  faGripLines,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./StatView.module.css";

export type StatViewProps = {
  label: string;
  number: number;
};

const StatView: React.FC<StatViewProps> = ({ label, number }) => {
  const icon = useMemo(
    () => (number > 1 ? faAngleUp : number < -1 ? faAngleDown : faGripLines),
    [number]
  );

  const color = useMemo(
    () => (number > 1 ? styles.positive : number < -1 ? styles.negative : ""),
    [number]
  );

  return (
    <div className={styles.container}>
      <p className={styles.label}>{label}</p>
      <div className={`${styles.statCircle} ${color}`}>
        <FontAwesomeIcon
          className={`${styles.icon} ${color}`}
          icon={icon}
          width={10}
        />
      </div>
      <p className={`${styles.statNumber} ${color}`}>{number}%</p>
    </div>
  );
};

export default StatView;
