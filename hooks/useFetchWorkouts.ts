import { useState } from "react";
import useAnalyzeWorkouts from "./useAnalyzeWorkouts";

const useFetchWorkouts = () => {
  const [parsedWorkouts, setParsedWorkouts] = useState<ParsedWorkout[]>([]);
  const { workouts, liftProgressions } = useAnalyzeWorkouts({ parsedWorkouts });

  const fetchWorkouts = () => {
    fetch("/api/workouts").then((res) =>
      res.json().then((data) => {
        setParsedWorkouts(data.workouts);
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
