import { useCallback } from "react";
import Badge from "@/components/Badge";
import styles from "./LiftView.module.css";

export type LiftProps = {
  lift: Lift;
};

const LiftView: React.FC<LiftProps> = ({ lift }) => {
  const nullFallback = useCallback((number: any) => {
    return number ? number : "?";
  }, []);

  return (
    <div className={styles.container}>
      <div className="">
        <Badge text={lift.name} />
      </div>
      <table className={styles.setTable}>
        <tbody>
          {lift.sets.map((set, i) => {
            return (
              <tr key={i} className={styles.row}>
                <td className={styles.col}>
                  <p className={styles.bold}>{nullFallback(set.numSets)}</p>
                </td>
                <td className={styles.col}>
                  <p>x</p>
                </td>
                <td className={styles.col}>
                  <p className={styles.bold}>{nullFallback(set.numReps)}</p>
                </td>
                <td className={styles.col}>
                  <p>at</p>
                </td>
                <td className={styles.col}>
                  <p className={styles.bold}>{nullFallback(set.weight)}</p>
                </td>
                <td className={styles.col}>
                  <p>lbs</p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={styles.spacer}></div>
      <table className={styles.summaryTable}>
        <tbody>
          <SummaryTableRow label="Total Weight" stat={`${lift.totalWeight}`} />
          <SummaryTableRow
            label="Avg # Reps"
            stat={Math.round(lift.averageReps)}
          />
          <SummaryTableRow label="Group Targeted" stat={lift.group} />
          <SummaryTableRow label="Total Sets" stat={lift.totalSets} />
        </tbody>
      </table>
    </div>
  );
};

const SummaryTableRow: React.FC<{ label: string; stat: any }> = ({
  label,
  stat,
}) => {
  return (
    <tr className={styles.row}>
      <td>
        <p>{label}</p>
      </td>
      <td>
        <p className={styles.bold}>{`${stat}`}</p>
      </td>
    </tr>
  );
};
export default LiftView;
