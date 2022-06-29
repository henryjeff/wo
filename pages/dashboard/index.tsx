import React, { useState } from "react";
import Head from "next/head";
import type { NextPage } from "next";
import { motion, AnimatePresence } from "framer-motion";
import { Layout, DefaultHeadMetaTags } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileZipper, faFilter } from "@fortawesome/free-solid-svg-icons";
// Components
import Graph from "../../components/Graph";
import Badge from "../../components/Badge";
import Popover from "../../components/Popover";
import WorkoutCard from "../../components/WorkoutCard";
import WorkoutCardList from "../../components/WorkoutCardList";
import SortByTimeToggle from "../../components/Filters/SortDirectionalToggle";
import { WorkoutTypeFilter, DifficultyFilter } from "../../components/Filters";
// Util
import workoutSums from "../../util/workout/sums";
import { sortByAscDate } from "../../util/workout/sorting";
// Hooks
import useOrganizedWorkouts from "../../hooks/useOrganizedWorkouts";
import useFetchWorkouts from "../../hooks/useFetchWorkouts";

import styles from "./Dashboard.module.css";
import Button from "../../components/Button";

const Dashboard: NextPage = () => {
  const fetchWorkouts = useFetchWorkouts();
  const { workouts, sorting, addFilterPredicate } = useOrganizedWorkouts({
    workouts: fetchWorkouts.workouts,
    sortingFunction: sortByAscDate,
  });
  const [selectedId, setSelectedId] = useState("");

  const ExpandedWorkoutInfo = ({ id }: { id: string }) => {
    const workout = workouts.find((w) => w.key === id);
    if (!workout) return null;

    return (
      <motion.div
        className={`${styles.selectedWorkoutInfo} ${styles.itemOverlay}`}
        key={`workout-card-${workout.key}`}
        layoutId={`workout-card-${workout.key}`}
      >
        <WorkoutCard
          workout={workout}
          id={`${workout.key}`}
          expanded={true}
          onClose={() => setSelectedId("")}
        />
      </motion.div>
    );
  };

  return (
    <>
      <Head>
        <DefaultHeadMetaTags />
      </Head>
      <Layout>
        <motion.div
          className={styles.overlay}
          animate={selectedId !== "" ? "open" : "closed"}
          variants={overlayVars}
        />
        <div className={styles.layout}>
          <div className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
              <h1>Dashboard</h1>
              <div className={styles.searchContainer}>
                <div className={styles.filters}>
                  <Popover text="By Type" icon={faFilter}>
                    <h3>Type</h3>
                    <h4>Filter by workout type, {"(eg. Push, Pull)"}</h4>
                    <br></br>
                    <WorkoutTypeFilter
                      onPredicateChange={(predicate) =>
                        addFilterPredicate("type", predicate)
                      }
                    />
                  </Popover>
                  <Popover text="Difficulty" icon={faFilter}>
                    <h3>Difficulty</h3>
                    <h4>
                      Filter by workout difficulty, which is determined by total
                      set volume.
                    </h4>
                    <br></br>
                    <DifficultyFilter
                      onPredicateChange={(predicate) =>
                        addFilterPredicate("diff", predicate)
                      }
                    />
                  </Popover>
                  <p className={styles.resultsLengthText}>
                    {workouts.length} filtered results
                  </p>
                </div>
                <SortByTimeToggle
                  text={"By Date"}
                  up={sorting.isReversed}
                  setUp={sorting.setIsReversed}
                />
              </div>
            </div>
            <WorkoutCardList
              workouts={workouts}
              onCardClick={setSelectedId}
              pageSize={10}
            />
          </div>

          <div className={styles.content}>
            {!workouts.length && (
              // <div className={styles.fileUpload}>
              //   <div>
              //     <FontAwesomeIcon icon={faFileZipper} width={32} />
              //     <div className={styles.fileUploadInformation}>
              //       {/* <h3>Upload takeout.zip File</h3>
              //       <h4>
              //         Download takeout.zip from here and upload it here to parse
              //       </h4> */}
              //       <Button
              //         onClick={fetchWorkouts.fetchWorkouts}
              //         text="Get Workouts"
              //       />
              //     </div>
              //   </div>
              // </div>
              <div>
                <Button
                  onClick={fetchWorkouts.fetchWorkouts}
                  text="Get Workouts"
                />
              </div>
            )}
            {!!workouts.length && (
              <div className={styles.statisticsContent}>
                <div className={styles.contentHeader}>
                  <h1>Statistics</h1>
                  <div className={styles.contentHeaderBadges}>
                    <Badge
                      text={`${workoutSums.totalNumWorkouts(
                        workouts
                      )} workouts`}
                    />
                    <Badge
                      text={`${workoutSums.totalNumLifts(workouts)} lifts`}
                    />
                    <Badge
                      text={`${workoutSums.totalNumSets(workouts)} sets`}
                    />
                    <Badge
                      text={`${workoutSums.totalNumReps(workouts)} reps`}
                    />
                  </div>
                </div>
                <br />
                <Graph data={workouts} dataKeys={["totalWeight"]} />
                <br />
              </div>
            )}
          </div>
        </div>
        <AnimatePresence>
          <div className={styles.selectedWorkout}>
            {selectedId !== "" && <ExpandedWorkoutInfo id={selectedId} />}
          </div>
        </AnimatePresence>
      </Layout>
    </>
  );
};

const overlayVars = {
  open: {
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  closed: {
    opacity: 0,
    transition: {
      duration: 0,
    },
  },
};

export default Dashboard;
