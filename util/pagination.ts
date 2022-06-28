function pagination(c: number, m: number): (number | Dots)[] {
  var current = c,
    last = m,
    delta = 2,
    left = current - delta + 1,
    right = current + delta + 2,
    range = [],
    rangeWithDots: (number | Dots)[] = [],
    l;

  for (let i = 1; i <= last; i++) {
    if (i == 1 || i == last || (i >= left && i < right)) {
      range.push(i);
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push("..." as Dots);
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
}

type Dots = "...";

export default pagination;
