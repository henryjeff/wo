import type { NextPage } from "next";
import Head from "next/head";
import { useReducer } from "react";
import { Layout, DefaultHeadMetaTags } from "../../components";
import Badge from "../../components/Badge";
import LiftViewEditor, {
  InputLiftSet,
} from "../../components/Editor/LiftViewEditor";
import styles from "./Editor.module.css";

export type EditorState = InputLift[];

type InputLift = {
  name: string;
  sets: InputLiftSet[];
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
        sets: [],
      },
    });
  };

  return (
    <>
      <Head>
        <DefaultHeadMetaTags />
      </Head>
      <Layout>
        <div className={styles.layout}>
          {/* <h1>Editor</h1> */}
          {/* <LiftViewEditor
            editorState={state}
            editorDispatch={dispatch}
            index={0}
          /> */}
          <div style={{ flexDirection: "column", flex: 1 }}>
            {state.map((_, index) => (
              <LiftViewEditor
                key={`lift-${index}`}
                editorState={state}
                editorDispatch={dispatch}
                index={index}
              />
            ))}
            <span>
              <button onClick={handleAddLift}>Create Lift</button>
            </span>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
