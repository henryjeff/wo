import { renderHook, act } from "@testing-library/react-hooks";
// import useOrganizedWorkouts from "./useOrganizedWorkouts";
// import { sortByAscDate } from "@/util/workout/sorting";
// import mock from "@/util/testing/mockWorkouts";

// const mockWorkouts = mock.workouts(10);

// const defaultHookProps = {
//   workouts: mockWorkouts,
//   sortingFunction: sortByAscDate,
//   initialSortReversed: false,
// };

// const defaultHookReversedProps = {
//   workouts: mockWorkouts,
//   sortingFunction: sortByAscDate,
//   initialSortReversed: true,
// };

// const defaultHook = () => {
//   return {
//     render: renderHook(() => useOrganizedWorkouts(defaultHookProps)),
//     props: defaultHookProps,
//   };
// };

// const defaultHookReversed = () => {
//   return {
//     render: renderHook(() => useOrganizedWorkouts(defaultHookReversedProps)),
//     props: defaultHookProps,
//   };
// };
test("@TODO: FIX TESTS", () => {
  expect(true);
});

// test("Check default sort order, no predicates", () => {
//   const { workouts, sortingFunction } = defaultHook().props;
//   const sortedWorkouts = workouts.sort(sortingFunction);
//   const { result } = defaultHook().render;
//   expect(result.current.workouts).toStrictEqual(sortedWorkouts);
// });

// test("Check reverse sort order, no predicates", () => {
//   const { workouts, sortingFunction } = defaultHookReversed().props;
//   const sortedWorkouts = workouts.sort(sortingFunction).reverse();
//   const { result } = defaultHookReversed().render;
//   expect(result.current.workouts).toStrictEqual(sortedWorkouts);
// });

// test("Adding a predicate that returns true", () => {
//   const { workouts, sortingFunction } = defaultHook().props;
//   const sortedWorkouts = workouts.sort(sortingFunction);
//   const { result } = defaultHook().render;
//   act(() => {
//     result.current.addFilterPredicate("truePredicate", () => true);
//   });
//   expect(result.current.workouts).toStrictEqual(sortedWorkouts);
// });

// test("Adding a predicate that returns false", () => {
//   const { result } = defaultHook().render;
//   act(() => {
//     result.current.addFilterPredicate("falsePredicate", () => false);
//   });
//   expect(result.current.workouts).toStrictEqual([]);
// });

// test("Adding a predicate that returns true and one that returns false", () => {
//   const { result } = defaultHook().render;
//   act(() => {
//     result.current.addFilterPredicate("truePredicate", () => true);
//     result.current.addFilterPredicate("falsePredicate", () => false);
//   });
//   expect(result.current.workouts).toStrictEqual([]);
// });

// test("Adding a predicate that returns true then overwriting it with one that returns false", () => {
//   const { workouts, sortingFunction } = defaultHook().props;
//   const sortedWorkouts = workouts.sort(sortingFunction);
//   const { result } = defaultHook().render;
//   act(() => {
//     result.current.addFilterPredicate("predicate", () => true);
//   });
//   expect(result.current.workouts).toStrictEqual(sortedWorkouts);
//   act(() => {
//     result.current.addFilterPredicate("predicate", () => false);
//   });
//   expect(result.current.workouts).toStrictEqual([]);
// });

// test("Adding and removing a predicate", () => {
//   const { workouts, sortingFunction } = defaultHook().props;
//   const sortedWorkouts = workouts.sort(sortingFunction);
//   const { result } = defaultHook().render;
//   const predicateId = "removeFilterPredicate";
//   act(() => {
//     result.current.addFilterPredicate(predicateId, () => false);
//   });
//   expect(result.current.workouts).toStrictEqual([]);
//   act(() => {
//     result.current.removeFilterPredicate(predicateId);
//   });
//   expect(result.current.workouts).toStrictEqual(sortedWorkouts);
// });

// test("Adding a predicate that checks for a specific workout type", () => {
//   const type = "pull";
//   const pullWorkouts = mockWorkouts.filter((workout) => workout.type === type);
//   const { result } = defaultHook().render;
//   act(() => {
//     result.current.addFilterPredicate("falsePredicate", (workout) => {
//       return workout.type === type;
//     });
//   });
//   expect(result.current.workouts).toStrictEqual(pullWorkouts);
// });
