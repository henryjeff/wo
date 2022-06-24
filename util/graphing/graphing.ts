const wow = (workouts: MetaWorkout[]) => {
  // find all push workouts
  const upperWorkouts = workouts.filter((w) => w.type === "upper");
  // find all push workouts
  const pushWorkouts = workouts.filter((w) => w.type === "push");
  // find all pull workouts
  const pullWorkouts = workouts.filter((w) => w.type === "pull");
  // find all squat workouts
  const squatWorkouts = workouts.filter((w) => w.type === "leg");

  console.log(
    upperWorkouts.length,
    pushWorkouts.length,
    pullWorkouts.length,
    squatWorkouts.length
  );

  // find all the exercises in each workout and tally the total weight for each exercise
  const upperExercises: { [key in string]: number } = {};

  upperWorkouts.forEach((w) => {
    w.lifts.forEach((e) => {
      // find the max weight of e by iterating over each set and finding the max weight
      const maxWeight = Math.max(...e.sets.map((s) => s.weight));

      if (upperExercises[e.name]) {
        if (upperExercises[e.name] < maxWeight) {
          upperExercises[e.name] = maxWeight;
        }
      } else {
        upperExercises[e.name] = maxWeight;
      }
    });

    console.log(upperExercises);
  });

  console.log(upperWorkouts);

  return [];
};

export default wow;
