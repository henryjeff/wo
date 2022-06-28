import { useState } from "react";
import Analyzer from "../util/analysis/Analyzer";

const useFetchWorkouts = () => {
  const [workouts, setWorkouts] = useState<MetaWorkout[]>([]);
  const [progressions, setProgressions] = useState<LiftProgressions>({});

  const fetchWorkouts = () => {
    fetch("/api/workouts").then((res) =>
      res.json().then((data) => {
        const analyzer = new Analyzer();
        const analyzedWorkouts = analyzer.analyzeWorkouts(data.workouts);
        setProgressions(analyzer.getLiftProgressions(analyzedWorkouts));
        setWorkouts(analyzedWorkouts);
      })
    );
  };

  return {
    workouts,
    progressions,
    fetchWorkouts,
  };
};

export default useFetchWorkouts;
