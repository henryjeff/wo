type LiftSet = {
  numSets: number;
  numReps: number;
  weight: number;
  weightUnit: WeightUnit;
};

type WeightUnit = "lbs" | "seconds";

type Lift = {
  key: string;
  name: string;
  sets: LiftSet[];
};

type Workout = {
  date: string;
  lifts: Lift[];
};

type MetaLift = {
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

type MetaWorkout = {
  date: string;
  lifts: MetaLift[];
  type: WorkoutType;
  numSets: number;
  key: string;
  totalWeight: number;
  weightToSetsRatio: number;
  datedStats: {
    overload: number;
  };
};

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
