import styles from "./LoadingIndicator.module.css";

type LoadingIndicatorProps = {
  size: number;
};

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ size }) => {
  return <div className={styles.loader} style={{ fontSize: size }} />;
};

export default LoadingIndicator;
