export const SHOULDER_TOKENS = [
  "press",
  "oh",
  "overhead",
  "over head",
  "lat",
  "raise",
  "raises",
];

export const CHEST_TOKENS = ["press", "bench", "chest", "pec", "peck"];

export const TRICEP_TOKENS = [
  "pushdown",
  "push down",
  "tricep",
  "extension",
  "extensions",
  "skull",
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
];

export const BACK_TOKENS = [
  "row",
  "pull",
  "pull up",
  "lat",
  "pulldown",
  "deadlift",
  "dead lift",
  "hang",
  "dead hang",
  "rear delt",
  "shrug",
];

export const AB_TOKENS = ["plank", "raises", "leg raises", "hanging"];

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
