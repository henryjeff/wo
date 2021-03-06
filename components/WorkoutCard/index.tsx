import React, { useCallback, useState } from "react";
import moment from "moment";
import { motion } from "framer-motion";
import Badge from "@/components/Badge";
import StatView from "./StatView";
import LiftView from "./LiftView";
import styles from "./WorkoutCard.module.css";
import DifficultyIndicator from "./DifficultyIndicator";
import colors from "@/styles/colors";
import { faClose, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Button";

export type WorkoutCardProps = {
  workout: Workout;
  id: string;
  expanded?: boolean;
  onClose?: () => void;
  onCopyWorkout?: (workout: Workout) => void;
};

const intensityToNumber = {
  easy: 1,
  medium: 2,
  hard: 3,
};

const difficultyToColor = {
  easy: colors.positive,
  medium: colors.warning,
  hard: colors.negative,
};

const WorkoutCard: React.FC<WorkoutCardProps> = ({
  workout,
  id,
  expanded,
  onClose,
  onCopyWorkout,
}) => {
  const [momentDate] = useState(moment(workout.date));
  const [opened, setIsOpened] = useState(true);

  const handleClick = useCallback(() => {
    setIsOpened(!opened);
  }, [opened]);

  const handleCopyWorkout = useCallback(() => {
    onCopyWorkout && onCopyWorkout(workout);
  }, [onCopyWorkout, workout]);

  const intensity =
    workout.numSets > 22 ? "hard" : workout.numSets > 14 ? "medium" : "easy";

  const headerText =
    abbreviatedMonthNames[momentDate.month()] +
    " " +
    getOrdinalNum(Number(momentDate.format("D"))) +
    ", " +
    momentDate.format("YYYY");

  return (
    <motion.div
      className={`${styles.container} ${
        !expanded ? styles.clickableContainer : ""
      }`}
      onClick={handleClick}
      layoutId={`workout-card-container-${id}`}
    >
      <div className={`${styles.detailsContainer} no-scrollbar`}>
        <div className={styles.mainDetailsContainer}>
          {!expanded ? (
            <motion.h3 className={styles.dateHeader} layoutId={`header-${id}`}>
              {headerText}
            </motion.h3>
          ) : (
            <div className={styles.expandedDateHeader}>
              <motion.div
                layoutId={`header-close-${id}`}
                className={styles.closeButton}
              >
                <FontAwesomeIcon
                  icon={faClose}
                  width={16}
                  className={styles.closeIcon}
                  onClick={onClose}
                />
              </motion.div>
              <motion.h1
                className={styles.dateHeader}
                layoutId={`header-${id}`}
              >
                {headerText}
              </motion.h1>
            </div>
          )}
          <motion.div
            className={styles.badgeListContainer}
            layoutId={`workout-card-badges-${id}`}
          >
            <Badge text={`${isoWeekdayToWeekday[momentDate.isoWeekday()]}`} />
            <Badge text={workout.type} />
            <Badge
              text={intensity}
              textColor={difficultyToColor[intensity]}
              EndItem={() => (
                <DifficultyIndicator
                  difficulty={intensityToNumber[intensity]}
                />
              )}
            />
          </motion.div>
        </div>
        <div className={`${styles.statsListContainer} no-scrollbar`}>
          <StatView
            number={workout.datedStats.overload}
            label="Overload"
            neutral={100}
            range={10}
            id={id}
          />
        </div>
      </div>
      {expanded && (
        <>
          <div className={styles.summaryContainer}>
            <div className={`${styles.liftListContainer} no-scrollbar`}>
              {workout.lifts &&
                workout.lifts.map((lift: Lift, i: number) => {
                  return (
                    <LiftView key={`lift-${lift.name}-${i}`} lift={lift} />
                  );
                })}
            </div>
          </div>
        </>
      )}
      {expanded && (
        <div>
          <Button
            icon={faCopy}
            onClick={handleCopyWorkout}
            text="Copy Workout to Editor"
          />
        </div>
      )}
    </motion.div>
  );
};

const abbreviatedMonthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const isoWeekdayToWeekday = [
  "_",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function getOrdinalNum(n: number) {
  return (
    n +
    (n > 0
      ? ["th", "st", "nd", "rd"][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10]
      : "")
  );
}

export default WorkoutCard;
