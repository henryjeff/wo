import styles from "./DifficultyFilter.module.css";
import { useEffect, useState } from "react";
// import { WORKOUT_TYPES } from "../../../util/analysis/constants";
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
  const [selectedDifficulty, setSelectedDifficulty] = useState<number>(0);

  const handleClick = (difficulty: number) => {
    setSelectedDifficulty(difficulty);
    const byTypePredicate = (workout: MetaWorkout) => {
      if (difficulty === 0) return true;
      const intensity = workout.numSets > 22 ? 3 : workout.numSets > 14 ? 2 : 1;
      return intensity === difficulty;
    };
    onPredicateChange(byTypePredicate);
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.difficultyButton} ${
          selectedDifficulty === 0 && styles.selected
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
              selectedDifficulty === difficulty.intensity && styles.selected
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
