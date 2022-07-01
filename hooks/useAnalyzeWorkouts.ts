import moment from "moment";
import { useEffect, useState } from "react";
import {
  MUSCLE_GROUP_TOKENS,
  PULL_GROUPS,
  PUSH_GROUPS,
} from "@/util/workout/constants";
import { sortByAscDate } from "@/util/workout/sorting";

type LiftToGroupMap = { [key: string]: MuscleGroup };

type useAnalyzeWorkoutsProps = {
  BasicWorkouts: BasicWorkout[];
};

type useAnalyzeWorkoutsReturn = {
  workouts: Workout[];
  liftProgressions: LiftProgressions;
};

const useAnalyzeWorkouts = ({
  BasicWorkouts,
}: useAnalyzeWorkoutsProps): useAnalyzeWorkoutsReturn => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [liftProgressions, setLiftProgressions] = useState<LiftProgressions>(
    {}
  );

  useEffect(() => {
    setWorkouts(analyzeWorkouts(BasicWorkouts));
  }, [BasicWorkouts]);

  useEffect(() => {
    setLiftProgressions(getLiftProgressions(workouts));
  }, [workouts]);

  return {
    workouts: workouts,
    liftProgressions: liftProgressions,
  };
};

export const getLiftProgressions = (workouts: Workout[]): LiftProgressions => {
  const progressions: LiftProgressions = {};

  workouts.forEach((workout) => {
    workout.lifts.forEach((lift) => {
      if (!progressions[lift.key]) {
        progressions[lift.key] = {
          name: lift.name,
          key: lift.key,
          group: lift.group,
          progression: [],
        };
      }
      progressions[lift.key].progression.push({
        date: workout.date,
        averageReps: lift.averageReps,
        averageWeightForSet:
          lift.totalWeight / lift.totalSets / lift.averageReps,
        averageWeightPerSet: lift.totalWeight / lift.totalSets,
      });
    });
  });
  // remove all progressions that have <= 2 progressions
  for (const progression in progressions) {
    if (progressions[progression].progression.length < 3)
      delete progressions[progression];
  }
  return progressions;
};

export const defineWorkoutType = (groupsHit: MuscleGroup[]): WorkoutType => {
  // If we didn't hit any groups return none
  if (groupsHit.length === 0) return "none";

  // If we hit legs...
  if (groupsHit.indexOf("leg") !== -1) {
    // check if we hit at least 3 other groups
    if (groupsHit.indexOf("abs") !== -1) return "legs";
    if (groupsHit.length > 3) return "full-body";
    if (groupsHit.length > 2) return "misc";
    // otherwise we just hit legs
    else return "legs";
  }
  if (groupsHit.length === 1) return "misc";
  // We didn't hit legs, so if we hit at least 4 groups of upper body, its an upper day

  // Finally check if we hit push or pull
  if (groupsHit.sort().join(",") === PULL_GROUPS.sort().join(","))
    return "pull";
  if (groupsHit.some((group) => PUSH_GROUPS.includes(group))) return "push";

  if (groupsHit.length > 3) return "upper";
  return "misc";
};

export const analyzeWorkouts = (BasicWorkouts: BasicWorkout[]): Workout[] => {
  const liftToGroupMap: LiftToGroupMap = {};
  const Workouts: Workout[] = BasicWorkouts.map((workout) => {
    let numSets = 0;
    const Lifts: Lift[] = workout.lifts.map((lift) => {
      let volume = 0;
      let totalReps = 0;
      let totalSets = 0;
      let matchedGroup: MuscleGroup = "none";

      let group: keyof typeof MUSCLE_GROUP_TOKENS;

      if (liftToGroupMap[lift.key]) {
        matchedGroup = liftToGroupMap[lift.key];
      } else {
        let highestMatchedToken = 0;

        for (group in MUSCLE_GROUP_TOKENS) {
          let numMatches = 0;
          const tokens = MUSCLE_GROUP_TOKENS[group];
          tokens.forEach((token) => {
            if (lift.key.includes(token)) {
              numMatches += 1;
            }
          });
          if (numMatches > highestMatchedToken) {
            highestMatchedToken = numMatches;
            matchedGroup = group as MuscleGroup;
          }
        }
        liftToGroupMap[lift.key] = matchedGroup;
      }
      for (const set of lift.sets) {
        numSets += set.numSets;
        totalSets += set.numSets;
        totalReps += set.numReps * set.numSets;
        volume += set.numSets * set.weight * set.numReps;
      }

      return {
        name: lift.name,
        key: lift.key,
        totalWeight: volume,
        totalSets: totalSets,
        averageReps: totalReps / totalSets,
        group: matchedGroup,
        sets: lift.sets,
      };
    });
    const groupsHit: MuscleGroup[] = [];

    Lifts.forEach((lift) => {
      if (groupsHit.indexOf(lift.group) === -1) {
        groupsHit.push(lift.group);
      }
    });

    const workoutType = defineWorkoutType(groupsHit);

    // calculate total weight
    let totalWeight = 0;
    Lifts.forEach((lift) => {
      totalWeight += lift.totalWeight;
    });

    return {
      date: workout.date,
      lifts: Lifts,
      type: workoutType,
      numSets: numSets,
      totalWeight: totalWeight,
      weightToSetsRatio: totalWeight / numSets,
      key: `wo${moment(workout.date).format("YYYY-MM-DD")}`,
      datedStats: {
        overload: 0,
      },
    };
  });

  // sort the workouts by date
  const sortedWorkouts = Workouts.sort(sortByAscDate);

  // split workouts into their respective muscle groups
  const groupedWorkouts: { [key in WorkoutType]: Workout[] } = {} as any;
  for (const workout of sortedWorkouts) {
    if (!groupedWorkouts[workout.type]) {
      groupedWorkouts[workout.type] = [];
    }
    groupedWorkouts[workout.type].push(workout);
  }

  // for each group calculate the overload in total weight from workout to workout
  for (const group in groupedWorkouts) {
    const currentGroupWorkouts: Workout[] =
      groupedWorkouts[group as WorkoutType];
    for (let i = 0; i < currentGroupWorkouts.length; i++) {
      const workout = currentGroupWorkouts[i];
      const lastWorkout = currentGroupWorkouts[i + 1];

      if (lastWorkout) {
        workout.datedStats.overload = Number(
          ((workout.totalWeight / lastWorkout.totalWeight) * 100).toFixed(2)
        );
      }
    }
  }
  return Workouts;
};

export default useAnalyzeWorkouts;
