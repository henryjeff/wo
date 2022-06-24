import styles from "./WorkoutTypeFilter.module.css";
import { motion } from "framer-motion";
import { useState } from "react";

export type WorkoutTypeFilterProps = {};
const WORKOUT_TYPES: WorkoutType[] = [
  "full-body",
  "upper",
  "legs",
  "push",
  "pull",
];

const WorkoutTypeFilter: React.FC<WorkoutTypeFilterProps> = ({}) => {
  const [selectedTypes, setSelectedTypes] = useState<WorkoutType[]>([]);

  const handleClick = (type: WorkoutType) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  return (
    <div className={styles.container}>
      {WORKOUT_TYPES.map((type, i) => {
        return (
          <div
            className={`${
              selectedTypes.includes(type) ? styles.selected : ""
            } ${styles.item}`}
            onClick={() => handleClick(type)}
            key={`${i}`}
          >
            {type}
          </div>
        );
      })}
    </div>
  );
};

export default WorkoutTypeFilter;
