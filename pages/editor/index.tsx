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

export type EditorState = InputLift[];

export type InputLift = {
  name: string;
  key: string;
  sets: InputLiftSet[];
};

export type InputLiftSet = {
  numSets: string;
  numReps: string;
  weight: string;
  weightUnit: WeightUnit;
};

export type EditorActions =
  | {
      type: "ADD_LIFT";
      lift: InputLift;
    }
  | {
      type: "DELETE_LIFT";
      liftIndex: number;
    }
  | {
      type: "UPDATE_LIFT_NAME";
      liftName: string;
      liftIndex: number;
    }
  | {
      type: "ADD_LIFT_SET";
      liftIndex: number;
    }
  | {
      type: "DELETE_LIFT_SET";
      liftIndex: number;
      setIndex: number;
    }
  | {
      type: "UPDATE_LIFT_SET_NUM_REPS";
      liftIndex: number;
      setIndex: number;
      numReps: string;
    }
  | {
      type: "UPDATE_LIFT_SET_NUM_SETS";
      liftIndex: number;
      setIndex: number;
      numSets: string;
    }
  | {
      type: "UPDATE_LIFT_SET_WEIGHT";
      liftIndex: number;
      setIndex: number;
      weight: string;
    }
  | {
      type: "UPDATE_LIFT_SET_WEIGHT_UNIT";
      liftIndex: number;
      setIndex: number;
      weightUnit: WeightUnit;
    };

const Home: NextPage = () => {
  const [layoutIdCount, setLayoutIdCount] = useState(0);

  const [state, dispatch] = useReducer(
    (state: EditorState, action: EditorActions) => {
      switch (action.type) {
        case "ADD_LIFT":
          return [...state, action.lift];
        case "DELETE_LIFT":
          return state.filter((_, index) => index !== action.liftIndex);
        case "ADD_LIFT_SET":
          return state.map((lift, index) => {
            if (index === action.liftIndex) {
              const initLift = {
                numReps: "",
                numSets: "",
                weight: "",
                weightUnit: "lbs" as WeightUnit,
              };
              return {
                ...lift,
                sets: [...lift.sets, initLift],
              };
            }
            return lift;
          });
        case "DELETE_LIFT_SET":
          return state.map((lift, index) => {
            if (index === action.liftIndex) {
              return {
                ...lift,
                sets: lift.sets.filter(
                  (_, setIndex) => setIndex !== action.setIndex
                ),
              };
            }
            return lift;
          });

        case "UPDATE_LIFT_NAME":
          return state.map((lift, index) => {
            if (index === action.liftIndex) {
              return {
                ...lift,
                name: action.liftName,
              };
            }
            return lift;
          });
        case "UPDATE_LIFT_SET_NUM_REPS":
          return state.map((lift, liftIndex) => {
            if (liftIndex === action.liftIndex) {
              return {
                ...lift,
                sets: lift.sets.map((set, setIndex) => {
                  if (setIndex === action.setIndex) {
                    return {
                      ...set,
                      numReps: action.numReps,
                    };
                  }
                  return set;
                }),
              };
            }
            return lift;
          });
        case "UPDATE_LIFT_SET_NUM_SETS":
          return state.map((lift, liftIndex) => {
            if (liftIndex === action.liftIndex) {
              return {
                ...lift,
                sets: lift.sets.map((set, setIndex) => {
                  if (setIndex === action.setIndex) {
                    return {
                      ...set,
                      numSets: action.numSets,
                    };
                  }
                  return set;
                }),
              };
            }
            return lift;
          });
        case "UPDATE_LIFT_SET_WEIGHT":
          return state.map((lift, liftIndex) => {
            if (liftIndex === action.liftIndex) {
              return {
                ...lift,
                sets: lift.sets.map((set, setIndex) => {
                  if (setIndex === action.setIndex) {
                    return {
                      ...set,
                      weight: action.weight,
                    };
                  }
                  return set;
                }),
              };
            }
            return lift;
          });
        case "UPDATE_LIFT_SET_WEIGHT_UNIT":
          return state.map((lift, liftIndex) => {
            if (liftIndex === action.liftIndex) {
              return {
                ...lift,
                sets: lift.sets.map((set, setIndex) => {
                  if (setIndex === action.setIndex) {
                    return {
                      ...set,
                      weightUnit: action.weightUnit,
                    };
                  }
                  return set;
                }),
              };
            }
            return lift;
          });

        default:
          return state;
      }
    },
    []
  );

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
