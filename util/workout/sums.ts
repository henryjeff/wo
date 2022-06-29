export const totalNumWorkouts = (workouts: Workout[]) => {
  return workouts.length;
};

export const totalNumLifts = (workouts: Workout[]) => {
  return workouts
    .map((workout) => {
      return workout.lifts.length;
    })
    .reduce((a, b) => a + b, 0);
};

export const totalNumSets = (workouts: Workout[]) => {
  return workouts
    .map((workout) => {
      return workout.lifts
        .map((lift) => lift.sets.length)
        .reduce((a, b) => a + b, 0);
    })
    .reduce((a, b) => a + b, 0);
};

export const totalNumReps = (workouts: Workout[]) => {
  return workouts
    .map((workout) => {
      return workout.lifts
        .map((lift) =>
          lift.sets.map((set) => set.numReps).reduce((a, b) => a + b, 0)
        )
        .reduce((a, b) => a + b, 0);
    })
    .reduce((a, b) => a + b, 0);
};
