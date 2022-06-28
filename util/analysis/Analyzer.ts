import moment from "moment";
import {
  MUSCLE_GROUP_TOKENS,
  PULL_GROUPS,
  PUSH_GROUPS,
  WORKOUT_TYPES,
} from "./constants";
import { sortByAscDate, sortByDescDate } from "./sorting";

class Analyzer {
  liftToGroupMap: { [key: string]: MuscleGroup };

  constructor() {
    this.liftToGroupMap = {};
  }

  keyLiftName = (liftName: string): string => {
    return liftName.toLowerCase().replace(/\s/g, "");
  };

  analyzeWorkouts(workout: Workout[]): MetaWorkout[] {
    const metaWorkouts: MetaWorkout[] = workout.map((workout) => {
      let numSets = 0;
      const metaLifts: MetaLift[] = workout.lifts.map((lift) => {
        let volume = 0;
        let totalReps = 0;
        let totalSets = 0;
        let matchedGroup: MuscleGroup = "none";

        let group: keyof typeof MUSCLE_GROUP_TOKENS;

        const liftKey = this.keyLiftName(lift.name);

        if (this.liftToGroupMap[liftKey]) {
          matchedGroup = this.liftToGroupMap[liftKey];
        } else {
          let highestMatchedToken = 0;

          for (group in MUSCLE_GROUP_TOKENS) {
            let numMatches = 0;
            const tokens = MUSCLE_GROUP_TOKENS[group];
            tokens.forEach((token) => {
              if (lift.name.toLowerCase().includes(token)) {
                numMatches += 1;
              }
            });
            if (numMatches > highestMatchedToken) {
              highestMatchedToken = numMatches;
              matchedGroup = group as MuscleGroup;
            }
          }
          this.liftToGroupMap[liftKey] = matchedGroup;
        }
        for (const set of lift.sets) {
          numSets += set.numSets;
          totalSets += set.numSets;
          totalReps += set.numReps * set.numSets;
          volume += set.numSets * set.weight * set.numReps;
        }

        return {
          name: lift.name,
          totalWeight: volume,
          totalSets: totalSets,
          averageReps: totalReps / totalSets,
          group: matchedGroup,
          sets: lift.sets,
        };
      });
      const groupsHit: MuscleGroup[] = [];

      metaLifts.forEach((lift) => {
        if (groupsHit.indexOf(lift.group) === -1) {
          groupsHit.push(lift.group);
        }
      });

      const workoutType = this.defineWorkoutType(groupsHit);

      // console.log(liftToGroupMap);

      // calculate total weight
      let totalWeight = 0;
      metaLifts.forEach((lift) => {
        totalWeight += lift.totalWeight;
      });

      return {
        date: workout.date,
        lifts: metaLifts,
        type: workoutType,
        numSets: numSets,
        totalWeight: totalWeight,
        key: `wo${moment(workout.date).format("YYYY-MM-DD")}`,
        datedStats: {
          overload: 0,
        },
      };
    });

    // sort the workouts by date
    const sortedWorkouts = metaWorkouts.sort(sortByAscDate);

    // split workouts into their respective muscle groups
    const groupedWorkouts: { [key in WorkoutType]: MetaWorkout[] } = {} as any;
    for (const workout of sortedWorkouts) {
      if (!groupedWorkouts[workout.type]) {
        groupedWorkouts[workout.type] = [];
      }
      groupedWorkouts[workout.type].push(workout);
    }

    // for each group calculate the overload in total weight from workout to workout
    for (const group in groupedWorkouts) {
      const currentGroupWorkouts: MetaWorkout[] =
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
    // console.log(groupedWorkouts);

    return metaWorkouts;
  }

  defineWorkoutType = (groupsHit: MuscleGroup[]): WorkoutType => {
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
    // We didn't hit legs, so if we hit at least 4 groups of upper body, its an upper day

    // Finally check if we hit push or pull
    if (groupsHit.sort().join(",") === PULL_GROUPS.sort().join(","))
      return "pull";
    if (groupsHit.some((group) => PUSH_GROUPS.includes(group))) return "push";

    if (groupsHit.length > 3) return "upper";
    return "misc";
  };
}

export default Analyzer;
