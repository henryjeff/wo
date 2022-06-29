import { useEffect, useState } from "react";

export type useOrganizedWorkoutsParams = {
  workouts: Workout[];
  initialSortReversed?: boolean;
  sortingFunction: (a: Workout, b: Workout) => number;
};

type WorkoutFilterPredicate = (workout: Workout) => boolean;

export type useOrganizedWorkoutsReturn = {
  workouts: Workout[];
  sorting: {
    isReversed: boolean;
    setIsReversed: React.Dispatch<React.SetStateAction<boolean>>;
  };
  addFilterPredicate: (id: string, predicate: WorkoutFilterPredicate) => void;
  removeFilterPredicate: (id: string) => void;
};

const useOrganizedWorkouts = ({
  workouts,
  sortingFunction,
  initialSortReversed,
}: useOrganizedWorkoutsParams): useOrganizedWorkoutsReturn => {
  const [organizedWorkouts, setOrganizedWorkouts] = useState<Workout[]>([]);

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

  const removeFilterPredicate = (id: string) => {
    const newFilterPredicates = { ...filterPredicates };
    delete newFilterPredicates[id];
    setFilterPredicates(newFilterPredicates);
  };

  return {
    workouts: organizedWorkouts,
    sorting: {
      isReversed: sortReversed,
      setIsReversed: setSortReversed,
    },
    addFilterPredicate,
    removeFilterPredicate,
  };
};

export default useOrganizedWorkouts;
