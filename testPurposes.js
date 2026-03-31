const getTimePosted = (time) => {
  let remainingTime = time / 60;
  timeRest = remainingTime % 60;
  return `${remainingTime} and ${timeRest}`;
};
console.log(getTimePosted(3600));
