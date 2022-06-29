import type { NextPage } from "next";
import Head from "next/head";
import { useReducer, useState } from "react";
import { Layout, DefaultHeadMetaTags } from "../../components";
import Badge from "../../components/Badge";
import LiftViewEditor from "../../components/Editor/LiftViewEditor";
import { mountAnimationProps } from "../../styles/animation";
import styles from "./Editor.module.css";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";
import { useWorkoutEditor } from "../../hooks/useWorkoutEditor";

const Home: NextPage = () => {
  const [layoutIdCount, setLayoutIdCount] = useState(0);
  const [state, dispatch] = useWorkoutEditor();

  const handleAddLift = () => {
    dispatch({
      type: "ADD_LIFT",
      lift: {
        name: "",
        key: `lift-view-layout-${layoutIdCount}`,
        sets: [],
      },
    });
    setLayoutIdCount(layoutIdCount + 1);
  };

  return (
    <>
      <Head>
        <DefaultHeadMetaTags />
      </Head>
      <Layout>
        <div className={styles.layout}>
          <h1>Editor</h1>
          <br />
          <motion.div className={styles.liftEditorViews}>
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
                <br />
              </motion.div>
            ))}
            <motion.div layoutId="workout-editor-footer">
              <Button
                outlined
                onClick={handleAddLift}
                text="Add Exercise"
                icon={faAdd}
              />
            </motion.div>
          </motion.div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
