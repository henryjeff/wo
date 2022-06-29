import { faAdd, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useState } from "react";
import { EditorActions, EditorState } from "../../../pages/editor";
import styles from "./LiftViewEditor.module.css";

type LiftViewEditorProps = {
  index: number;
  editorState: EditorState;
  editorDispatch: React.Dispatch<EditorActions>;
};

export type InputLiftSet = {
  numSets: string;
  numReps: string;
  weight: string;
  weightUnit: WeightUnit;
};

const LiftViewEditor: React.FC<LiftViewEditorProps> = ({
  index,
  editorState,
  editorDispatch,
}) => {
  const { name, sets } = editorState[index];

  const handleChangeNumSets = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, setIndex: number) => {
      editorDispatch({
        type: "UPDATE_LIFT_SET_NUM_SETS",
        liftIndex: index,
        setIndex,
        numSets: e.target.value,
      });
    },
    [index, editorDispatch]
  );

  const handleChangeNumReps = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, setIndex: number) => {
      editorDispatch({
        type: "UPDATE_LIFT_SET_NUM_REPS",
        liftIndex: index,
        setIndex,
        numReps: e.target.value,
      });
    },
    [index, editorDispatch]
  );

  const handleChangeWeight = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, setIndex: number) => {
      editorDispatch({
        type: "UPDATE_LIFT_SET_WEIGHT",
        liftIndex: index,
        setIndex,
        weight: e.target.value,
      });
    },
    [index, editorDispatch]
  );

  const handleLiftNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      editorDispatch({
        type: "UPDATE_LIFT_NAME",
        liftIndex: index,
        liftName: e.target.value,
      });
    },
    [index, editorDispatch]
  );

  const handleDeleteSet = useCallback(
    (setIndex: number) => {
      editorDispatch({
        type: "DELETE_LIFT_SET",
        liftIndex: index,
        setIndex,
      });
    },
    [index, editorDispatch]
  );

  const createNewSet = useCallback(() => {
    editorDispatch({
      type: "ADD_LIFT_SET",
      liftIndex: index,
    });
  }, [index, editorDispatch]);

  const handleDeleteLift = useCallback(() => {
    editorDispatch({
      type: "DELETE_LIFT",
      liftIndex: index,
    });
  }, [index, editorDispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.liftNameRow}>
        <div>
          <span
            className={styles.liftNameInput}
            role="textbox"
            onChange={handleLiftNameChange}
            contentEditable
            placeholder="Lift Name"
            suppressContentEditableWarning={true}
          >
            {name}
          </span>
        </div>
        <div className={styles.deleteLiftButton} onClick={handleDeleteLift}>
          <FontAwesomeIcon
            icon={faXmark}
            className={styles.deleteLiftButtonIcon}
          />
          <p>Delete</p>
        </div>
      </div>
      <table className={styles.liftSetTable}>
        <tbody>
          {sets.map((set, i) => {
            return (
              <tr key={i} className={styles.row}>
                <td className={styles.col}>
                  <input
                    type="text"
                    value={set.numSets}
                    onChange={(e) => handleChangeNumSets(e, i)}
                  />
                </td>
                <td className={styles.col}>
                  <p>x</p>
                </td>
                <td className={styles.col}>
                  <input
                    type="text"
                    value={set.numReps}
                    onChange={(e) => handleChangeNumReps(e, i)}
                  />
                </td>
                <td className={styles.col}>
                  <p>at</p>
                </td>
                <td className={styles.col}>
                  <input
                    type="text"
                    value={set.weight}
                    onChange={(e) => handleChangeWeight(e, i)}
                  />
                </td>
                <td className={styles.col}>
                  <p>lbs</p>
                </td>
                {/* <td className={styles.col}></td> */}
                <td
                  className={styles.col}
                  style={{ paddingLeft: "3em" }}
                  onClick={() => handleDeleteSet(i)}
                >
                  <FontAwesomeIcon
                    icon={faXmark}
                    className={styles.deleteSetIcon}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={styles.liftFooter}>
        <div onClick={createNewSet} className={styles.addSetButton}>
          <FontAwesomeIcon icon={faAdd} />
          <p>Add Set</p>
        </div>
      </div>
    </div>
  );
};

export default LiftViewEditor;
