import styles from "./Badge.module.css";

export type BadgeProps = {
  text: string;
  color?: string;
};

const Badge: React.FC<BadgeProps> = ({ text, color }) => {
  return (
    <div className={styles.badgeWrapper}>
      <div className={styles.badgeContainer} style={{ backgroundColor: color }}>
        <p className={styles.badgeText}>{text}</p>
      </div>
    </div>
  );
};

export default Badge;
