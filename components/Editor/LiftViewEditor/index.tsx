import { faAdd, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useState } from "react";
import { EditorActions, InputLift } from "../../../pages/editor";
import styles from "./LiftViewEditor.module.css";
import { motion } from "framer-motion";
import { mountAnimationProps } from "../../../styles/animation";

type LiftViewEditorProps = {
  index: number;
  lift: InputLift;
  editorDispatch: React.Dispatch<EditorActions>;
};

const LiftViewEditor: React.FC<LiftViewEditorProps> = ({
  index,
  lift,
  editorDispatch,
}) => {
  const { name, sets } = lift;

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
          <input
            className={styles.liftNameInput}
            onChange={handleLiftNameChange}
            value={name}
            type="text"
            placeholder="Exercise name"
          />
        </div>
        <div className={styles.deleteLiftButton} onClick={handleDeleteLift}>
          <FontAwesomeIcon
            icon={faXmark}
            width={12}
            className={styles.deleteLiftButtonIcon}
          />
          <p>Delete</p>
        </div>
      </div>
      <table className={styles.liftSetTable}>
        <tbody>
          {sets.map((set, i) => {
            return (
              <motion.tr
                key={`lift-view-editor-tr-${index}-${i}`}
                {...mountAnimationProps}
                className={styles.row}
              >
                <td className={styles.col}>
                  <input
                    type="text"
                    value={set.numSets}
                    inputMode="numeric"
                    pattern="[0-9]*"
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
                    inputMode="numeric"
                    pattern="[0-9]*"
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
                    inputMode="numeric"
                    pattern="[0-9]*"
                    onChange={(e) => handleChangeWeight(e, i)}
                  />
                </td>
                <td className={styles.col}>
                  <p>lbs</p>
                </td>
                <td
                  className={styles.deleteSetColumn}
                  onClick={() => handleDeleteSet(i)}
                >
                  <FontAwesomeIcon
                    width={12}
                    icon={faXmark}
                    className={styles.deleteSetIcon}
                  />
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
      <div className={styles.liftFooter}>
        <div onClick={createNewSet} className={styles.addSetButton}>
          <FontAwesomeIcon width={12} icon={faAdd} />
          <p>Add Set</p>
        </div>
      </div>
    </div>
  );
};

export default LiftViewEditor;
