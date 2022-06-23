import { MUSCLE_GROUP_TOKENS, PULL_GROUPS, PUSH_GROUPS } from "./constants";

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
          // console.log("found ", liftKey, " in map, skipping");
          matchedGroup = this.liftToGroupMap[liftKey];
        } else {
          console.log(liftKey, " not found in map, searching");
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
          // console.log("found ", matchedGroup, " in map, skipping");
          this.liftToGroupMap[liftKey] = matchedGroup;
        }
        for (const set of lift.sets) {
          numSets += set.numSets;
          totalSets += set.numSets;
          totalReps += set.numReps * set.numSets;
          volume += set.numSets * set.weight * set.numReps;
        }
        // console.log(liftToGroupMap);

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

      return {
        date: workout.date,
        lifts: metaLifts,
        type: workoutType,
        numSets: numSets,
      };
    });
    return metaWorkouts;
  }

  defineWorkoutType = (groupsHit: MuscleGroup[]): WorkoutType => {
    // If we didn't hit any groups return none
    if (groupsHit.length === 0) return "none";
    // If we only hit one group we can just return that group
    if (groupsHit.length === 1) return groupsHit[0];
    // If we hit legs...
    if (groupsHit.indexOf("leg") !== -1) {
      // check if we hit at least 3 other groups
      if (groupsHit.length > 3) return "full-body";
      if (groupsHit.length > 2) return "misc";
      // otherwise we just hit legs
      else return "legs";
    }
    // We didn't hit legs, so if we hit at least 4 groups of upper body, its an upper day
    if (groupsHit.length > 3) return "upper";

    // Finally check if we hit push or pull
    if (groupsHit.sort().join(",") === PULL_GROUPS.sort().join(","))
      return "pull";
    if (groupsHit.some((group) => PUSH_GROUPS.includes(group))) return "push";

    return "misc";
  };
}

export default Analyzer;
