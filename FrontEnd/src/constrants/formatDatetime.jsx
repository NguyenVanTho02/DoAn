export const getDayFromDateTime = (input) => {
  let dateTime = new Date(input);

  let d = dateTime.getDate();
  let m = dateTime.getMonth() + 1;
  let y = dateTime.getFullYear();

  if (d < 10) {
    d = "0" + d;
  }
  if (m < 10) {
    m = "0" + m;
  }

  return d + "-" + m + "-" + y;
};

export const getTimeFromDateTime = (input) => {
  let dateTime = new Date(input);

  let h = dateTime.getHours();
  let m = dateTime.getMinutes();

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;

  return h + ":" + m;
};
