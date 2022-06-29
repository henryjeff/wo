import { AMALGAMATE_MAP } from "./constants";

/**
 * Key name will convert a workout name to a valid key
 * @param name workout name to convert to key
 * @returns amalgamated key name
 */
export const keyName = (name: string) => {
  // replace " " with _ and remove leading/trailing " " and add a trailing "_"
  // ex) overhead dumbbell press -> overhead_dumbbell_press_
  let key = name.toLowerCase().trim().replace(/\s/g, "_") + "_";

  // Get keys of amalgamations
  const amalgamateKeys = Object.keys(AMALGAMATE_MAP) as Array<
    keyof typeof AMALGAMATE_MAP
  >;

  // For each key, check if the exercise name includes an amalgamation
  amalgamateKeys.forEach((amalgamate) => {
    const trailingAmalgamate = amalgamate + "_";
    // If the exercise name includes the amalgamation key, replace the key with respective value
    if (key.includes(trailingAmalgamate)) {
      key = key.replace(trailingAmalgamate, AMALGAMATE_MAP[amalgamate] + "_");
    }
  });

  // Return the key
  return key;
};

/**
 * Returns a readable workout name from a workout key
 * @param key key to convert to workout name
 * @returns workout name with _ replaced with " " and removed trailing "_"
 */
export const nameKey = (key: string) => {
  // replace _ with " " and remove trailing " "
  return key.replace(/_/g, " ").trim();
};
