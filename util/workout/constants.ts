export const SHOULDER_TOKENS = [
  "press",
  "oh",
  "overhead",
  "over_head",
  "lat",
  "raise",
  "raises",
];

export const CHEST_TOKENS = ["press", "bench", "chest", "pec", "peck"];

export const TRICEP_TOKENS = [
  "pushdown",
  "push_down",
  "tricep",
  "extension",
  "extensions",
  "skull",
  "tri",
  "ext",
];

export const BICEP_TOKENS = ["curl", "curls", "preacher", "bar"];

export const LEG_TOKENS = [
  "squat",
  "hack",
  "leg",
  "leg",
  "press",
  "calf",
  "raise",
  "raises",
  "stair",
  "lunge",
  "hip",
];

export const BACK_TOKENS = [
  "row",
  "pull",
  "pull_up",
  "lat",
  "pulldown",
  "deadlift",
  "dead",
  "dead_lift",
  "hang",
  "dead_hang",
  "rear_delt",
  "shrug",
  "shrugs",
];

export const AB_TOKENS = [
  "plank",
  "raises",
  "leg raises",
  "hanging leg raises",
  "hanging",
  "l-sit",
  "crunches",
];

export const MUSCLE_GROUP_TOKENS: { [key in MuscleGroup]: string[] } = {
  shoulder: SHOULDER_TOKENS,
  chest: CHEST_TOKENS,
  tricep: TRICEP_TOKENS,
  bicep: BICEP_TOKENS,
  leg: LEG_TOKENS,
  back: BACK_TOKENS,
  abs: AB_TOKENS,
  none: [],
};

export const PUSH_GROUPS: MuscleGroup[] = ["shoulder", "chest", "tricep"];

export const PULL_GROUPS: MuscleGroup[] = ["back", "bicep"];

export const WORKOUT_TYPES: WorkoutType[] = [
  "full-body",
  "upper",
  "legs",
  "push",
  "pull",
  "misc",
  "none",
];

export const AMALGAMATE_MAP = {
  tri: "tricep",
  ext: "extensions",
  extension: "extensions",
  peck: "pec",
  oh: "overhead",
  curl: "curls",
  push_down: "pushdown",
  pushdowns: "pushdown",
  dumbell: "dumbbell",
  inc: "incline",
  dec: "decline",
  sm: "smith_machine",
  deadlifts: "deadlift",
};
