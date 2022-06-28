import { useState } from "react";
import Analyzer from "../util/analysis/Analyzer";

const useFetchWorkouts = () => {
  const [workouts, setWorkouts] = useState<MetaWorkout[]>([]);

  const fetchWorkouts = () => {
    fetch("/api/workouts").then((res) =>
      res.json().then((data) => {
        const analyzer = new Analyzer();
        const analyzedWorkouts = analyzer.analyzeWorkouts(data.workouts);
        setWorkouts(analyzedWorkouts);
      })
    );
  };

  return {
    workouts,
    fetchWorkouts,
  };
};

export default useFetchWorkouts;
