const getTimePosted = (time) => {
  let hour = parseInt(time / 3600);
  let timeRest = time % 3600;
  let minutes = parseInt(timeRest / 60);

  let secondsRemaining = timeRest % 60;

  return `${hour} hour and ${minutes} minutes and ${secondsRemaining} seconds`;
};
console.log(getTimePosted(3606));
console.log(video.others.posted_date?.length);
