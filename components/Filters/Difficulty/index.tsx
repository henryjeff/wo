import styles from "./DifficultyFilter.module.css";
import { useState } from "react";
import colors from "../../../styles/colors";
import DifficultyIndicator from "../../WorkoutCard/DifficultyIndicator";

export type DifficultyFilterProps = {
  onPredicateChange: (predicate: (workout: MetaWorkout) => boolean) => void;
};

const DIFFICULTY_TYPES = [
  {
    name: "Easy",
    intensity: 1,
    color: colors.positive,
  },
  {
    name: "Medium",
    intensity: 2,
    color: colors.warning,
  },
  {
    name: "Hard",
    intensity: 3,
    color: colors.negative,
  },
];

const DifficultyFilter: React.FC<DifficultyFilterProps> = ({
  onPredicateChange,
}) => {
  const [selectedDifficulties, setSelectedDifficulties] = useState<number[]>(
    []
  );

  const handleClick = (difficulty: number) => {
    if (difficulty === 0) {
      setSelectedDifficulties([]);
      onPredicateChange(() => true);
      return;
    }
    let newSelectedDifficulties: number[] = [];
    if (selectedDifficulties.includes(difficulty)) {
      newSelectedDifficulties = selectedDifficulties.filter(
        (t) => t !== difficulty
      );
      if (newSelectedDifficulties.length === 0) {
        onPredicateChange(() => true);
        setSelectedDifficulties([]);
        return;
      }
    } else newSelectedDifficulties = [...selectedDifficulties, difficulty];

    const byTypePredicate = (workout: MetaWorkout) => {
      const intensity = workout.numSets > 22 ? 3 : workout.numSets > 14 ? 2 : 1;
      return newSelectedDifficulties.includes(intensity);
    };
    onPredicateChange(byTypePredicate);
    setSelectedDifficulties(newSelectedDifficulties);
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.difficultyButton} ${
          selectedDifficulties.length === 0 && styles.selected
        }`}
        onClick={() => handleClick(0)}
      >
        <p>Any</p>
      </div>
      {DIFFICULTY_TYPES.map((difficulty) => {
        return (
          <div
            key={`${difficulty.name}`}
            className={`${styles.difficultyButton} ${
              selectedDifficulties.includes(difficulty.intensity) &&
              styles.selected
            }`}
            onClick={() => handleClick(difficulty.intensity)}
          >
            <p style={{ color: difficulty.color }}>{difficulty.name}</p>
            <div className={styles.indicatorContainer}>
              <DifficultyIndicator difficulty={difficulty.intensity} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DifficultyFilter;
