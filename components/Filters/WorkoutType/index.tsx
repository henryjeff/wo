import styles from "./WorkoutTypeFilter.module.css";
import { useState } from "react";
import { WORKOUT_TYPES } from "@/util/workout/constants";

export type WorkoutTypeFilterProps = {
  onPredicateChange: (predicate: (workout: Workout) => boolean) => void;
};

const WorkoutTypeFilter: React.FC<WorkoutTypeFilterProps> = ({
  onPredicateChange,
}) => {
  const [selectedTypes, setSelectedTypes] = useState<WorkoutType[]>([]);

  const handleClick = (type: WorkoutType) => {
    let newSelectedTypes: WorkoutType[] = [];
    if (selectedTypes.includes(type))
      newSelectedTypes = selectedTypes.filter((t) => t !== type);
    else newSelectedTypes = [...selectedTypes, type];

    console.log(newSelectedTypes);

    const byTypePredicate = (workout: Workout) => {
      if (newSelectedTypes.length === 0) return true;
      if (newSelectedTypes.includes(workout.type)) return true;
      return false;
    };

    onPredicateChange(byTypePredicate);
    setSelectedTypes(newSelectedTypes);
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
