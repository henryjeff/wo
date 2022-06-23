import React, { useCallback, useState } from "react";
import moment from "moment";
import { motion } from "framer-motion";
import Badge from "../Badge";
import StatView from "./StatView";
import LiftView from "./LiftView";
import styles from "./WorkoutCard.module.css";
// import colors from "../../styles/Colors";

export type WorkoutCardProps = {
  workout: MetaWorkout;
  id: string;
  expanded?: boolean;
};

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout, id, expanded }) => {
  const [momentDate] = useState(moment(workout.date));
  const [opened, setIsOpened] = useState(true);

  const handleClick = useCallback(() => {
    setIsOpened(!opened);
  }, [opened]);

  const intensity =
    workout.numSets > 22 ? "hard" : workout.numSets > 14 ? "medium" : "easy";

  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles.detailsContainer}>
        <motion.div
          className={styles.mainDetailsContainer}
          layoutId={`main-details-${id}`}
        >
          <motion.h2 className={styles.dateHeader} layoutId={`header-${id}`}>
            {abbreviatedMonthNames[momentDate.month()] + " "}
            {getOrdinalNum(Number(momentDate.format("D"))) +
              ", " +
              momentDate.format("YYYY")}
          </motion.h2>
          <motion.div
            className={styles.badgeListContainer}
            layoutId={`badges-${id}`}
          >
            <Badge text={`${momentDate.format("MM/DD/YYYY")}`} />
            <Badge text={workout.type} />
            <Badge text={intensity} />
          </motion.div>
        </motion.div>
        <div className={styles.statsListContainer}>
          <StatView number={0} label="Overload" />
          <StatView number={0} label="Strength" />
          <StatView number={0} label="Endurance" />
        </div>
      </div>
      {/* <motion.div
        className={styles.summaryContainer}
        initial={false}
        variants={previewVars}
        animate={opened ? "open" : "closed"}
      > */}
      {/* <div className={styles.summaryContainer}>
        <div className={`${styles.liftListContainer} no-scrollbar`}>
          {workout.lifts &&
            workout.lifts.map((lift: MetaLift, i: number) => {
              return <LiftView key={`lift-${lift.name}-${i}`} lift={lift} />;
            })}
        </div>
      </div> */}
      {expanded && (
        <div className={styles.summaryContainer}>
          <div className={`${styles.liftListContainer} no-scrollbar`}>
            {workout.lifts &&
              workout.lifts.map((lift: MetaLift, i: number) => {
                return <LiftView key={`lift-${lift.name}-${i}`} lift={lift} />;
              })}
          </div>
        </div>
      )}
      {/* </motion.div> */}
    </div>
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

function getOrdinalNum(n: number) {
  return (
    n +
    (n > 0
      ? ["th", "st", "nd", "rd"][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10]
      : "")
  );
}

const previewVars = {
  open: {
    height: "100%",
    opacity: 1,
    transition: {
      ease: "easeInOut",
      duration: 0.2,
    },
  },
  closed: {
    height: "0px",
    opacity: 0,
    transition: {
      ease: "easeInOut",
      duration: 0.2,
    },
  },
};

export default WorkoutCard;
