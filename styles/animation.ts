type mountAnimationProps = {
  delay?: number;
  easing?: AnimationEasing | "linear" | "spring";
  duration?: number;
  direction?: "x" | "y";
  mountScale?: number;
};

export const mountAnimation = ({
  delay,
  easing,
  duration,
  direction,
  mountScale,
}: mountAnimationProps) => {
  const easeData = !easing
    ? { ease: Easing["expOut"] }
    : easing === "spring"
    ? springTransition
    : easing === "linear"
    ? {}
    : { ease: Easing[easing] };

  let dir = direction || "y";
  const x = 16 * (mountScale || 1);
  const y = 16 * (mountScale || 1);

  return {
    initial: {
      opacity: 0,
      x: dir === "x" ? x : 0,
      y: dir === "y" ? y : 0,
    },
    animate: {
      opacity: 1,
      y: 0,
      x: 0,
    },
    transition: {
      ...easeData,
      delay: delay || 0,
      duration: duration || 0.4,
    },
  };
};

const springTransition = { type: "spring", stiffness: 400, damping: 25 };

export type AnimationEasing = "expIn" | "expOut" | "expInOut";

export const Easing: { [key in AnimationEasing]: number[] } = {
  expIn: [0.9, 0.05, 1, 0.3],
  expOut: [0.3, 0.1, 0.1, 1],
  expInOut: [0.9, 0.05, 0.1, 1],
};

export const defaultMountAnimation = mountAnimation({});
