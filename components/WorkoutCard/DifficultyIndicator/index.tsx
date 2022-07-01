import styles from "./DifficultyIndicator.module.css";
import colors from "@/styles/colors";

export type DifficultyIndicatorProps = {
  difficulty: number;
};

const difficultyColorMap = [colors.positive, colors.warning, colors.negative];

const DifficultyIndicator: React.FC<DifficultyIndicatorProps> = ({
  difficulty,
}) => {
  const activeColor = difficultyColorMap[difficulty - 1];
  const inactiveColor = `${colors.textSecondary}44`;

  const colorMap = {
    lowest: difficulty > 0 ? activeColor : inactiveColor,
    medium: difficulty > 1 ? activeColor : inactiveColor,
    highest: difficulty > 2 ? activeColor : inactiveColor,
  };

  return (
    <div className={`${styles.container} ${difficulty}-container`}>
      <div
        className={`${styles.lowest} ${styles.bar}`}
        style={{ backgroundColor: colorMap.lowest }}
      />
      <div
        className={`${styles.medium} ${styles.bar}`}
        style={{ backgroundColor: colorMap.medium }}
      />
      <div
        className={`${styles.highest} ${styles.bar}`}
        style={{ backgroundColor: colorMap.highest }}
      />
    </div>
  );
};

export default DifficultyIndicator;
