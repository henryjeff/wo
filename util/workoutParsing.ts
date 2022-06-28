const TOKENS = {
  superSet: "ss",
  setRepDelimiter: "x",
  weightDelimiter: "@",
  openComment: "(",
  closeComment: ")",
};

const preProcessWorkout = (workout: string) => {
  workout = workout.toLowerCase();
  for (let i = 0; i < workout.length; i++) {
    // if char is a comment
    if (workout[i] === TOKENS.openComment) {
      // find the end of the comment
      let j = i + 1;
      while (workout[j] !== TOKENS.closeComment) {
        j++;
      }
      // remove the comment
      workout = workout.slice(0, i) + workout.slice(j + 1);
    }
    if (workout[i] === TOKENS.closeComment) {
      throw "Unmatched parentheses";
    }
  }
  return workout;
};

const keyName = (name: string) => {
  let key = name.toLowerCase().trim().replace(/\s/g, "_") + "_";
  Object.keys(AMALGAMATE_MAP).forEach((amalgamate) => {
    const trailingAmalgamate = amalgamate + "_";
    if (key.includes(trailingAmalgamate)) {
      // @ts-ignore
      key = key.replace(trailingAmalgamate, AMALGAMATE_MAP[amalgamate] + "_");
      console.log(`${key} contains ${trailingAmalgamate}`);
      // const splitKey = key.split(trailingAmalgamate);
      // let newKey = "";
      // splitKey.forEach((part) => {
      //   if (part === "") {
      //     // @ts-ignore
      //     newKey += AMALGAMATE_MAP[amalgamate] + "_";
      //   } else {
      //     newKey += part;
      //   }
      // });
      // key = newKey;
      // // newKey += AMALGAMATE_MAP[amalgamate] + part;
      // // console.log(key.split(trailingAmalgamate));
      // // key = AMALGAMATE_MAP[amalgamate] + "_" + key.split(trailingAmalgamate);
      console.log("newkey : ", name, " -> ", key);
    }
  });
  if (name.includes("leg")) {
  }

  return key;
};

const nameKey = (key: string) => {
  // replace _ with " " and remove trailing " "
  return key.replace(/_/g, " ").trim();
};

export const parseWorkout = (workout: string): Lift[] => {
  const preProcessedWorkout = preProcessWorkout(workout);

  const lines = preProcessedWorkout.split("\n");
  // delete any lines that are empty
  lines.forEach((line, index) => {
    if (line.trim() === "") {
      lines.splice(index, 1);
    }
  });

  const workouts: Lift[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // check if the first char is a letter
    if (!line[0]) continue;
    if (line[0].match(/[a-z]/i)) {
      if (line.toLowerCase() === TOKENS.superSet) {
        continue;
      }

      workouts.push({
        key: keyName(line),
        name: nameKey(keyName(line)),
        sets: [],
      });
      // if the first char is a number its a set
    } else {
      const _set = line.split(TOKENS.weightDelimiter);
      const _weight = _set[1];
      const set = _set[0].split(TOKENS.setRepDelimiter);

      let weightUnit: WeightUnit = "lbs";
      let weight = Number(_weight);

      const setObj: LiftSet = {
        numSets: Number(set[0]),
        numReps: Number(set[1]),
        weight: Number(weight),
        weightUnit: weightUnit,
      };

      workouts[workouts.length - 1].sets.push(setObj);
    }
  }
  return workouts;
};

import fs from "fs";
import path from "path";
import { AMALGAMATE_MAP } from "./analysis/constants";

export const convertFileToWorkoutString = (fileName: string) => {
  const file = fs.readFileSync(path.join(process.cwd(), fileName)).toString();
  return JSON.parse(file).textContent;
};
