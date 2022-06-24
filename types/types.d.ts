type LiftSet = {
  numSets: number;
  numReps: number;
  weight: number;
  weightUnit: WeightUnit;
};

type WeightUnit = "lbs" | "seconds";

type Lift = {
  name: string;
  sets: LiftSet[];
};

type Workout = {
  date: string;
  lifts: Lift[];
};

type MetaLift = {
  name: string;
  totalSets: number;
  averageReps: number;
  totalWeight: number;
  group: MuscleGroup;
  sets: LiftSet[];
};

type MuscleGroup =
  | "shoulder"
  | "chest"
  | "tricep"
  | "bicep"
  | "leg"
  | "back"
  | "abs"
  | "none";

type WorkoutType =
  | MuscleGroup
  | "push"
  | "pull"
  | "legs"
  | "upper"
  | "full-body"
  | "misc";

type MetaWorkout = {
  date: string;
  lifts: MetaLift[];
  type: WorkoutType;
  numSets: number;
  key: string;
};
