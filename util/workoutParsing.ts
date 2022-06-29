const TOKENS = {
  superSet: "ss",
  setRepDelimiter: "x",
  weightDelimiter: "@",
  openComment: "(",
  closeComment: ")",
};

/**
 * Removes comments and converts the workout string to lowercase
 * @param workout workout as a string to parse
 * @returns workout string without comments and lowercase
 */
const preProcessWorkout = (workout: string) => {
  workout = workout.toLowerCase();
  for (let i = 0; i < workout.length; i++) {
    // If char is a comment
    if (workout[i] === TOKENS.openComment) {
      // Find the end of the comment
      let j = i + 1;
      while (workout[j] !== TOKENS.closeComment) {
        j++;
        // Potential inf. loop if there is no closing comment
      }
      // Remove the comment
      workout = workout.slice(0, i) + workout.slice(j + 1);
    }
    if (workout[i] === TOKENS.closeComment) {
      throw "Unmatched parentheses";
    }
  }
  return workout;
};

/**
 * Key name will convert a workout name to a valid key
 * @param name workout name to convert to key
 * @returns amalgamated key name
 */
const keyName = (name: string) => {
  // replace " " with _ and remove leading/trailing " " and add a trailing "_"
  // ex) overhead dumbbell press -> overhead_dumbbell_press_
  let key = name.toLowerCase().trim().replace(/\s/g, "_") + "_";

  // Get keys of amalgamations
  const amalgamateKeys = Object.keys(AMALGAMATE_MAP) as Array<
    keyof typeof AMALGAMATE_MAP
  >;

  // For each key, check if the exercise name includes an amalgamation
  amalgamateKeys.forEach((amalgamate) => {
    const trailingAmalgamate = amalgamate + "_";
    // If the exercise name includes the amalgamation key, replace the key with respective value
    if (key.includes(trailingAmalgamate)) {
      key = key.replace(trailingAmalgamate, AMALGAMATE_MAP[amalgamate] + "_");
    }
  });

  // Return the key
  return key;
};

/**
 * Returns a readable workout name from a workout key
 * @param key key to convert to workout name
 * @returns workout name with _ replaced with " " and removed trailing "_"
 */
const nameKey = (key: string) => {
  // replace _ with " " and remove trailing " "
  return key.replace(/_/g, " ").trim();
};

/**
 * Parses a workout string and returns an array of Lift objects
 * @param workout workout string to parse
 * @returns an array of Lift[] objects
 */
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
import { unknown } from "zod";
import { AMALGAMATE_MAP } from "./analysis/constants";

export const convertFileToWorkoutString = (fileName: string) => {
  const file = fs.readFileSync(path.join(process.cwd(), fileName)).toString();
  return JSON.parse(file).textContent;
};
