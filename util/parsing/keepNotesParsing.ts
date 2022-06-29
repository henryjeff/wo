import fs from "fs";
import path from "path";
import { keyName, nameKey } from "../workout/key";

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
 * Parses a workout string and returns an array of Lift objects
 * @param workout workout string to parse
 * @returns an array of Lift[] objects
 */
export const parseWorkout = (workout: string): BasicLift[] => {
  const preProcessedWorkout = preProcessWorkout(workout);

  const lines = preProcessedWorkout.split("\n");
  // delete any lines that are empty
  lines.forEach((line, index) => {
    if (line.trim() === "") {
      lines.splice(index, 1);
    }
  });

  const workouts: BasicLift[] = [];

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

export const convertFileToWorkoutString = (fileName: string) => {
  const file = fs.readFileSync(path.join(process.cwd(), fileName)).toString();
  return JSON.parse(file).textContent;
};
