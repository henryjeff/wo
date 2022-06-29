import { analyzeWorkouts } from "../../hooks/useAnalyzeWorkouts";

const makeMockWorkout = ({
  month,
  day,
  year,
  intensityScale,
  weightScale,
  index,
}: {
  month: number;
  day: number;
  year: number;
  intensityScale: number;
  weightScale: number;
  index?: number;
}): ParsedWorkout => {
  const date = new Date(year, month - 1, day).toISOString();
  const mockWorkouts: ParsedWorkout[] = [
    {
      date,
      lifts: [
        {
          key: "bench_",
          name: "bench",
          sets: [
            {
              numSets: 4 * intensityScale,
              numReps: 8,
              weight: 135 * weightScale,
              weightUnit: "lbs",
            },
          ],
        },
        {
          key: "overhead_press_",
          name: "overhead press",
          sets: [
            {
              numSets: 4 * intensityScale,
              numReps: 8,
              weight: 75 * weightScale,
              weightUnit: "lbs",
            },
          ],
        },
        {
          key: "tricep_pushdown_",
          name: "tricep pushdown",
          sets: [
            {
              numSets: 4 * intensityScale,
              numReps: 8,
              weight: 45 * weightScale,
              weightUnit: "lbs",
            },
          ],
        },
      ],
    },
    {
      date,
      lifts: [
        {
          key: "lat_pulldown_",
          name: "lat pulldown",
          sets: [
            {
              numSets: 4 * intensityScale,
              numReps: 8,
              weight: 135 * weightScale,
              weightUnit: "lbs",
            },
          ],
        },
        {
          key: "preacher_curls_",
          name: "preacher curls",
          sets: [
            {
              numSets: 4 * intensityScale,
              numReps: 8,
              weight: 65 * weightScale,
              weightUnit: "lbs",
            },
          ],
        },
        {
          key: "hammer_curls_",
          name: "hammer curls",
          sets: [
            {
              numSets: 4 * intensityScale,
              numReps: 8,
              weight: 20 * weightScale,
              weightUnit: "lbs",
            },
          ],
        },
      ],
    },
    {
      date,
      lifts: [
        {
          key: "squat_",
          name: "squat",
          sets: [
            {
              numSets: 4 * intensityScale,
              numReps: 8,
              weight: 135 * weightScale,
              weightUnit: "lbs",
            },
          ],
        },
        {
          key: "leg_press_",
          name: "leg press",
          sets: [
            {
              numSets: 4 * intensityScale,
              numReps: 8,
              weight: 135 * weightScale,
              weightUnit: "lbs",
            },
          ],
        },
        {
          key: "weighted_calf_raises_",
          name: "weighted calf raises",
          sets: [
            {
              numSets: 4 * intensityScale,
              numReps: 8,
              weight: 135 * weightScale,
              weightUnit: "lbs",
            },
          ],
        },
      ],
    },
  ];
  const randomWorkout = Math.floor(Math.random() * mockWorkouts.length);
  return mockWorkouts[index === undefined ? randomWorkout : index];
};

export const makeParsedWorkouts = (
  numberOfWorkouts: number
): ParsedWorkout[] => {
  const workouts: ParsedWorkout[] = [];
  const date = new Date();
  for (let i = 0; i < numberOfWorkouts; i++) {
    date.setDate(date.getDate() + 1);
    workouts.push(
      makeMockWorkout({
        month: date.getMonth() + 1,
        day: date.getDate(),
        year: date.getFullYear(),
        intensityScale: Math.floor(Math.random() * 3) + 1,
        weightScale: 1 + i / 30,
        index: i % 3,
      })
    );
  }
  return workouts;
};

export const makeWorkouts = (numberOfWorkouts: number): Workout[] => {
  return analyzeWorkouts(makeParsedWorkouts(numberOfWorkouts));
};

const exportObject = {
  parsedWorkouts: makeParsedWorkouts,
  workouts: makeWorkouts,
};

export default exportObject;
