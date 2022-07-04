import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { faAdd, faCopy } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
// Components
import Button from "@/components/Button";
import { Layout, DefaultHeadMetaTags } from "@/components/Page";
import LiftViewEditor from "@/components/Editor/LiftViewEditor";
import LoadingIndicator from "@/components/LoadingIndicator";
// Hooks
import { useWorkoutEditor } from "@/hooks/useWorkoutEditor";
// Util
import {
  basicLiftsToInputLifts,
  inputLiftsToBasicLifts,
} from "@/util/parsing/editorInputParsing";
// Styles
import { defaultMountAnimation } from "@/styles/animation";
import styles from "./Editor.module.css";

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

const Editor: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [state, dispatch] = useWorkoutEditor();
  const [lastId, setLastId] = useState(0);
  // const [copiedWorkout] = useLocalStorage("copiedWorkout", {});

  const handleAddLift = () => {
    setLastId(lastId + 1);
    dispatch({
      type: "ADD_LIFT",
      lift: {
        name: "",
        key: `lift_${lastId}`,
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

  // useEffect(() => {
  //   console.log(copiedWorkout);
  // }, [copiedWorkout]);

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
        <DefaultHeadMetaTags
          title="WO editor"
          description="Create and modify workouts with this simple editor"
        />
      </Head>
      <Layout className={styles.layout}>
        {/* <div className={styles.layout}> */}
        <header className={styles.editorHeader}>
          <h1>Editor</h1>
          {isLoading && (
            <motion.div
              {...defaultMountAnimation}
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
            <motion.div key={`${lift.key}`} {...defaultMountAnimation}>
              <LiftViewEditor
                lift={lift}
                editorDispatch={dispatch}
                index={index}
              />
            </motion.div>
          ))}
          <motion.footer
            className={styles.editorFooter}
            {...defaultMountAnimation}
            layoutId="workout-editor-footer"
          >
            <Button onClick={handleAddLift} text="Add Exercise" icon={faAdd} />
            <Button
              onClick={loadMockWorkout}
              text="Load Mock Workout"
              icon={faCopy}
            />
            {/* <Button
                
                onClick={resetEditor}
                text="Reset"
                icon={faPowerOff}
              /> */}
          </motion.footer>
        </motion.section>
        {/* </div> */}
      </Layout>
    </>
  );
};

export default Editor;
