const views = ["5.3k", "5.6k", 600, 200];
const parseViews = (value) => {
  if (typeof value === "string" && value.includes("k")) {
    return parseFloat(value) * 1000;
  }
  return parseFloat(value);
};

views.sort((a, b) => parseViews(b) - parseViews(a));
console.log(views);
