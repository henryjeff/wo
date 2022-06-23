import styles from "./Badge.module.css";
import { useId } from "react";

export type BadgeProps = {
  text: string;
  color?: string;
  textColor?: string;
  EndItem?: React.ComponentType;
};

const Badge: React.FC<BadgeProps> = ({ text, textColor, color, EndItem }) => {
  return (
    <div className={styles.badgeWrapper}>
      <div
        className={styles.badgeContainer}
        style={{ backgroundColor: color, color: textColor }}
      >
        <>
          <p className={styles.badgeText}>{text}</p>
          {EndItem && <EndItem />}
        </>
      </div>
    </div>
  );
};

export default Badge;
