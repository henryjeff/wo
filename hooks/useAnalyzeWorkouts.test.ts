import { renderHook, act } from "@testing-library/react-hooks";
import useAnalyzeWorkouts, { analyzeWorkouts } from "./useAnalyzeWorkouts";
import mock from "../util/testing/mockWorkouts";

const mockParsedWorkouts = mock.parsedWorkouts(10);

const defaultHookProps = {
  parsedWorkouts: mockParsedWorkouts,
};

const defaultHook = () => {
  return {
    render: renderHook(() => useAnalyzeWorkouts(defaultHookProps)),
    props: defaultHookProps,
  };
};

test("Check analysis useEffect", () => {
  const { parsedWorkouts } = defaultHook().props;
  const ownAnalysis = analyzeWorkouts(parsedWorkouts);
  const { result } = defaultHook().render;
  expect(result.current.workouts).toStrictEqual(ownAnalysis);
});
