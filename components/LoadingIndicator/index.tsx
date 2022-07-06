import styles from "./LoadingIndicator.module.css";

type LoadingIndicatorProps = {
  size?: number;
};

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ size }) => {
  return (
    <div className={styles.loader} style={{ fontSize: size || "0.8em" }} />
  );
};

export default LoadingIndicator;
