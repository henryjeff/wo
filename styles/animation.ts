export const mountAnimationProps = {
  initial: {
    opacity: 0,
    y: -16,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  transition: {
    type: "spring",
    stiffness: 400,
    damping: 25,
  },
};
