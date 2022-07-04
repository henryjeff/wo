import { keyName, nameKey } from "@/util/workout/key";

export function inputLiftToBasicLift(inputLift: InputLift): BasicLift {
  const key = keyName(inputLift.name);
  return {
    key: key,
    name: nameKey(key),
    sets: inputLift.sets.map((inputLift) => {
      return {
        weight: parseInt(inputLift.weight),
        numReps: parseInt(inputLift.numReps),
        numSets: parseInt(inputLift.numSets),
        weightUnit: inputLift.weightUnit,
      };
    }),
  };
}

export function inputLiftsToBasicLifts(
  inputLiftList: InputLift[]
): BasicLift[] {
  return inputLiftList.map((inputLift) => {
    return inputLiftToBasicLift(inputLift);
  });
}

export function basicLiftToInputLift(basicLift: BasicLift): InputLift {
  return {
    name: basicLift.name,
    key: basicLift.key,
    sets: basicLift.sets.map((set) => {
      return {
        weight: set.weight.toString(),
        numReps: set.numReps.toString(),
        numSets: set.numSets.toString(),
        weightUnit: set.weightUnit,
      };
    }),
  };
}

export function basicLiftsToInputLifts(basicLifts: BasicLift[]): InputLift[] {
  return basicLifts.map((basicLift) => {
    return basicLiftToInputLift(basicLift);
  });
}
