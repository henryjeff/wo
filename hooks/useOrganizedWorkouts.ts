import { useEffect, useState } from "react";

export type useOrganizedWorkoutsParams = {
  workouts: MetaWorkout[];
  initialSortReversed?: boolean;
  sortingFunction: (a: MetaWorkout, b: MetaWorkout) => number;
};

type WorkoutFilterPredicate = (workout: MetaWorkout) => boolean;

export type useOrganizedWorkoutsReturn = {
  workouts: MetaWorkout[];
  sorting: {
    isReversed: boolean;
    setIsReversed: React.Dispatch<React.SetStateAction<boolean>>;
  };
  addFilterPredicate: (id: string, predicate: WorkoutFilterPredicate) => void;
};

const useOrganizedWorkouts = ({
  workouts,
  sortingFunction,
  initialSortReversed,
}: useOrganizedWorkoutsParams): useOrganizedWorkoutsReturn => {
  const [organizedWorkouts, setOrganizedWorkouts] = useState<MetaWorkout[]>([]);

  const [filterPredicates, setFilterPredicates] = useState<{
    [key in string]: WorkoutFilterPredicate;
  }>({});

  const [sortReversed, setSortReversed] = useState<boolean>(
    initialSortReversed || false
  );

  // @FIX_USE_EFFECT
  useEffect(() => {
    let _workouts = [...workouts];

    const allPredicates = Object.keys(filterPredicates).map((key) => {
      return filterPredicates[key];
    });

    _workouts = _workouts.filter((workout) =>
      allPredicates.every((pred) => pred(workout))
    );

    // sort the _workouts
    _workouts = _workouts.sort(sortingFunction);
    if (sortReversed) {
      _workouts = _workouts.reverse();
    }
    setOrganizedWorkouts(_workouts);
  }, [workouts, sortReversed, sortingFunction, filterPredicates]);

  const addFilterPredicate = (
    id: string,
    predicate: WorkoutFilterPredicate
  ) => {
    setFilterPredicates({ ...filterPredicates, [id]: predicate });
  };

  return {
    workouts: organizedWorkouts,
    sorting: {
      isReversed: sortReversed,
      setIsReversed: setSortReversed,
    },
    addFilterPredicate,
  };
};

export default useOrganizedWorkouts;
