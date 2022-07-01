import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { useMemo } from "react";
import styles from "./AnimatedCanvasWrapper.module.css";

type AnimatedCanvasWrapperProps = {
  delay?: number;
  duration?: number;
  acceptPointerEvents?: boolean;
  children?: React.ReactNode;
};

const AnimatedCanvasWrapper: React.FC<AnimatedCanvasWrapperProps> = ({
  delay,
  duration,
  acceptPointerEvents,
  children,
}) => {
  const defaultMountProps = useMemo(() => {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: duration || 0.4, delay: delay || 0 },
    };
  }, [delay, duration]);

  return (
    <motion.div
      className={`${styles.canvasWrapper} ${
        acceptPointerEvents && styles.allowEvents
      }`}
      {...defaultMountProps}
    >
      <Canvas>{children}</Canvas>
    </motion.div>
  );
};

export default AnimatedCanvasWrapper;
