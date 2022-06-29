import { useReducer } from "react";

export type EditorState = InputLift[];

export const useWorkoutEditor = (): [
  EditorState,
  React.Dispatch<EditorActions>
] => {
  const [state, dispatch] = useReducer(
    (state: EditorState, action: EditorActions) => {
      switch (action.type) {
        case "SET_LIFTS":
          return action.lifts;
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

  return [state, dispatch];
};

export type EditorActions =
  | {
      type: "SET_LIFTS";
      lifts: InputLift[];
    }
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
