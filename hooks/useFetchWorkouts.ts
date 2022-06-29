import { useState } from "react";
import useAnalyzeWorkouts from "./useAnalyzeWorkouts";

const useFetchWorkouts = () => {
  const [BasicWorkouts, setBasicWorkouts] = useState<BasicWorkout[]>([]);
  const { workouts, liftProgressions } = useAnalyzeWorkouts({ BasicWorkouts });

  const fetchWorkouts = () => {
    fetch("/api/dep/workouts").then((res) =>
      res.json().then((data) => {
        setBasicWorkouts(data.workouts);
      })
    );
  };

  return {
    workouts,
    liftProgressions,
    fetchWorkouts,
  };
};

export default useFetchWorkouts;
