import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Layout, DefaultHeadMetaTags } from "../../components";
import LiftViewEditor from "../../components/Editor/LiftViewEditor";
import { mountAnimationProps } from "../../styles/animation";
import styles from "./Editor.module.css";
import { motion } from "framer-motion";
import {
  faAdd,
  faCopy,
  faCopyright,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";
import { useWorkoutEditor } from "../../hooks/useWorkoutEditor";
import LoadingIndicator from "../../components/LoadingIndicator";
import colors from "../../styles/colors";
import {
  basicLiftsToInputLifts,
  inputLiftsToBasicLifts,
} from "../../util/parsing/editorInputParsing";

const copyData: BasicLift[] = [
  {
    key: "bench_",
    name: "bench",
    sets: [{ numSets: 4, numReps: 8, weight: 135, weightUnit: "lbs" }],
  },
  {
    key: "tricep_pushdown_",
    name: "tricep pushdown",
    sets: [
      { numSets: 3, numReps: 9, weight: 40, weightUnit: "lbs" },
      { numSets: 1, numReps: 8, weight: 42.5, weightUnit: "lbs" },
    ],
  },
  {
    key: "incline_bench_",
    name: "incline bench",
    sets: [
      { numSets: 1, numReps: 8, weight: 145, weightUnit: "lbs" },
      { numSets: 2, numReps: 8, weight: 135, weightUnit: "lbs" },
    ],
  },
  {
    key: "skull_crushers_",
    name: "skull crushers",
    sets: [
      { numSets: 1, numReps: 12, weight: 35, weightUnit: "lbs" },
      { numSets: 3, numReps: 8, weight: 40, weightUnit: "lbs" },
    ],
  },
  {
    key: "dumbbell_overhead_press_",
    name: "dumbbell overhead press",
    sets: [
      { numSets: 3, numReps: 8, weight: 40, weightUnit: "lbs" },
      { numSets: 1, numReps: 8, weight: 45, weightUnit: "lbs" },
    ],
  },
  {
    key: "lat_raises_",
    name: "lat raises",
    sets: [{ numSets: 4, numReps: 10, weight: 15, weightUnit: "lbs" }],
  },
];

const Home: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [state, dispatch] = useWorkoutEditor();

  const handleAddLift = () => {
    dispatch({
      type: "ADD_LIFT",
      lift: {
        name: "",
        sets: [],
      },
    });
  };

  useEffect(() => {
    setIsLoading(true);
    const basicLifts = inputLiftsToBasicLifts(state);
    setTimeout(() => {
      setIsLoading(false);
    }, Math.random() * 5 * 200);
  }, [state]);

  const loadMockWorkout = () => {
    const inputLifts = basicLiftsToInputLifts(copyData);
    dispatch({
      type: "SET_LIFTS",
      lifts: inputLifts,
    });
  };

  const resetEditor = () => {
    dispatch({
      type: "SET_LIFTS",
      lifts: [],
    });
  };

  return (
    <>
      <Head>
        <DefaultHeadMetaTags />
      </Head>
      <Layout>
        <div className={styles.layout}>
          <header className={styles.editorHeader}>
            <h1>Editor</h1>
            {isLoading && (
              <motion.div
                {...mountAnimationProps}
                className={styles.savingInfo}
              >
                <LoadingIndicator size={8} />
                <p>Saving...</p>
              </motion.div>
            )}
          </header>
          <br />
          <motion.section className={styles.liftEditorViews}>
            {state.map((lift, index) => (
              <motion.div
                key={`lift-${index}`}
                {...mountAnimationProps}
                exit={{
                  opacity: 0,
                  y: -100,
                  transition: { duration: 0.2 },
                }}
              >
                <LiftViewEditor
                  lift={lift}
                  editorDispatch={dispatch}
                  index={index}
                />
              </motion.div>
            ))}
            <motion.footer
              className={styles.editorFooter}
              layoutId="workout-editor-footer"
            >
              <Button
                outlined
                onClick={handleAddLift}
                text="Add Exercise"
                icon={faAdd}
              />
              <Button
                outlined
                onClick={loadMockWorkout}
                text="Load Mock Workout"
                icon={faCopy}
              />
              <Button
                outlined
                onClick={resetEditor}
                text="Reset"
                icon={faPowerOff}
              />
            </motion.footer>
          </motion.section>
        </div>
      </Layout>
    </>
  );
};

export default Home;
