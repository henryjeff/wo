import React, { useEffect, useState } from "react";
import styles from "./WorkoutCardList.module.css";
import WorkoutCard from "../../components/WorkoutCard";
import { useCallback } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import pagination from "../../util/pagination";

type WorkoutCardListProps = {
  workouts: Workout[];
  onCardClick: (id: string) => void;
  pageSize: number;
};

const WorkoutCardList: React.FC<WorkoutCardListProps> = ({
  workouts,
  onCardClick,
  pageSize,
}) => {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const handleNextPage = useCallback(() => {
    if (page + 1 >= totalPages) return;
    setPage((prevPage) => prevPage + 1);
  }, [page, totalPages]);

  const handleBackPage = useCallback(() => {
    if (page === 0) return;
    setPage((prevPage) => prevPage - 1);
  }, [page]);

  // @FIX_USE_EFFECT
  useEffect(() => {
    setPage(0);
    setTotalPages(Math.ceil(workouts.length / pageSize));
  }, [workouts, pageSize]);

  return (
    <div className={styles.listContainer}>
      <div className={styles.pageContainer}>
        <div
          className={`${styles.pageBackButton} ${styles.pageButton}`}
          onClick={handleBackPage}
        >
          <FontAwesomeIcon icon={faArrowLeft} width={12} />
          <p>Back</p>
        </div>
        <div className={styles.pageNumbers}>
          {pagination(page, totalPages).map((element, index) =>
            element === "..." ? (
              <p key={`${element}-${index}`}>...</p>
            ) : (
              <div
                className={`${styles.pageNumber} ${
                  element - 1 === page ? styles.selected : ""
                }`}
                onClick={() => setPage(element - 1)}
                key={`${element}-${index}`}
              >
                <p>{element}</p>
              </div>
            )
          )}
        </div>
        <div
          className={`${styles.pageNextButton} ${styles.pageButton}`}
          onClick={handleNextPage}
        >
          <p>Next</p>
          <FontAwesomeIcon icon={faArrowRight} width={12} />
        </div>
      </div>
      {workouts
        .slice(page * pageSize, (page + 1) * pageSize)
        .map((workout, i) => {
          return (
            <MemoWorkoutCardRow
              onClick={onCardClick}
              key={`workout-card-${workout.key}`}
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
  workout: Workout;
  onClick: (id: string) => void;
};

const WorkoutCardRow: React.FC<WorkoutCardRowProps> = ({
  index,
  workout,
  onClick,
}) => {
  const clickHandler = useCallback(() => {
    onClick(workout.key);
  }, [workout, onClick]);

  return (
    <motion.div
      key={`workout-card-${workout.key}`}
      layoutId={`workout-card-${workout.key}`}
      onClick={clickHandler}
      style={{ display: "block" }}
    >
      <motion.div {...mountAnimationProps(index)}>
        <WorkoutCard workout={workout} id={`${workout.key}`} />
      </motion.div>
    </motion.div>
  );
};

const mountAnimationProps = (index: number) => ({
  initial: {
    opacity: 0,
    x: -16,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  transition: {
    delay: 0.03 * index,
    type: "spring",
    stiffness: 400,
    damping: 25,
  },
});

const MemoWorkoutCardRow = React.memo(WorkoutCardRow);

export default WorkoutCardList;
