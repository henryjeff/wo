type ParsedWorkout = {
  date: string;
  lifts: ParsedLift[];
};

type ParsedLift = {
  key: string;
  name: string;
  sets: LiftSet[];
};

type LiftSet = {
  numSets: number;
  numReps: number;
  weight: number;
  weightUnit: WeightUnit;
};

type WeightUnit = "lbs" | "seconds";

type Workout = {
  date: string;
  lifts: Lift[];
  type: WorkoutType;
  numSets: number;
  key: string;
  totalWeight: number;
  weightToSetsRatio: number;
  datedStats: {
    overload: number;
  };
};

type Lift = {
  name: string;
  key: string;
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
  | "push"
  | "pull"
  | "legs"
  | "upper"
  | "full-body"
  | "misc"
  | "none";

type LiftProgressions = {
  [key in string]: {
    name: string;
    key: string;
    group: MuscleGroup;
    progression: LiftProgression[];
  };
};

type LiftProgression = {
  date: string;
  averageReps: number;
  averageWeightForSet: number;
  averageWeightPerSet: number;
};
