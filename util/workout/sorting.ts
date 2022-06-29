const sortByAscDate = (a: Workout, b: Workout) => {
  const aDate = new Date(a.date);
  const bDate = new Date(b.date);
  return bDate.getTime() - aDate.getTime();
};

const sortByDescDate = (a: Workout, b: Workout) => {
  const aDate = new Date(a.date);
  const bDate = new Date(b.date);
  return aDate.getTime() - bDate.getTime();
};

export { sortByAscDate, sortByDescDate };
