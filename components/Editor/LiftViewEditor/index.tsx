import { useState } from "react";
import styles from "./LiftViewEditor.module.css";

type LiftViewEditorProps = {};

const LiftViewEditor: React.FC<LiftViewEditorProps> = ({}) => {
  const [liftSets, setLiftSets] = useState<LiftSet[]>([]);
  const [liftName, setLiftName] = useState("Bench Press");

  const handleLiftInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: "numReps" | "numSets" | "weight",
    liftIndex: number
  ) => {
    const newLiftSets = [...liftSets];
    let newValue = Number(e.target.value);
    newLiftSets[liftIndex][key] = newValue;
    setLiftSets(newLiftSets);
  };

  const handleLiftNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLiftName(e.target.value);
  };

  const createNewSet = () => {
    setLiftSets([
      ...liftSets,
      {
        numReps: 0,
        numSets: 0,
        weight: 0,
        weightUnit: "lbs",
      },
    ]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.liftNameRow}>
        <input type="text" value={liftName} onChange={handleLiftNameChange} />
        <p>Delete Lift</p>
      </div>
      <table className={styles.liftSetTable}>
        <tbody>
          {liftSets.map((set, i) => {
            return (
              <tr key={i} className={styles.row}>
                <td className={styles.col}>
                  <input
                    type="text"
                    style={{ maxWidth: 64 }}
                    value={set.numSets === 0 ? "" : set.numSets}
                    onChange={(e) => handleLiftInput(e, "numSets", i)}
                  />
                </td>
                <td className={styles.col}>
                  <p>x</p>
                </td>
                <td className={styles.col}>
                  <input
                    type="text"
                    style={{ maxWidth: 64 }}
                    value={set.numReps === 0 ? "" : set.numReps}
                    onChange={(e) => handleLiftInput(e, "numReps", i)}
                  />
                </td>
                <td className={styles.col}>
                  <p>at</p>
                </td>
                <td className={styles.col}>
                  <input
                    type="text"
                    style={{ maxWidth: 64 }}
                    value={set.weight === 0 ? "" : set.weight}
                    onChange={(e) => handleLiftInput(e, "weight", i)}
                  />
                </td>
                <td className={styles.col}>
                  <p>lbs</p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p onClick={createNewSet}>+ Add Set</p>
    </div>
  );
};

export default LiftViewEditor;
