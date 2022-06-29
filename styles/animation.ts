export const mountAnimationProps = {
  initial: {
    opacity: 0,
    x: -16,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  transition: {
    type: "spring",
    stiffness: 400,
    damping: 25,
  },
};
