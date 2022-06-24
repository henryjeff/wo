import React, { useRef } from "react";
import styles from "./WorkoutCardList.module.css";
import WorkoutCard from "../../components/WorkoutCard";
import { useCallback } from "react";
import { motion } from "framer-motion";

type WorkoutCardListProps = {
  workouts: MetaWorkout[];
  onCardClick: (index: number) => void;
};

const WorkoutCardList: React.FC<WorkoutCardListProps> = ({
  workouts,
  onCardClick,
}) => {
  return (
    <div className={styles.listContainer}>
      {workouts.map((workout, i) => {
        return (
          <MemoWorkoutCardRow
            onClick={onCardClick}
            key={`workout-card-${i}`}
            workout={workout}
            index={i}
          />
        );
      })}
    </div>
  );
};

type WorkoutCardRowProps = {
  index: number;
  workout: MetaWorkout;
  onClick: (index: number) => void;
};

const WorkoutCardRow: React.FC<WorkoutCardRowProps> = ({
  index,
  workout,
  onClick,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const clickHandler = useCallback(() => {
    onClick(index);
    // wrapperRef.current?.scrollIntoView({
    //   behavior: "smooth",
    //   block: "center",
    // });
  }, [index, onClick]);

  return (
    <motion.div
      key={`workout-card-${index}`}
      layoutId={`workout-card-${index}`}
      onClick={clickHandler}
      ref={wrapperRef}
      style={{ display: "block" }}
    >
      <WorkoutCard workout={workout} id={`${index}`} />
    </motion.div>
  );
};

const MemoWorkoutCardRow = React.memo(WorkoutCardRow);

export default React.memo(WorkoutCardList);
