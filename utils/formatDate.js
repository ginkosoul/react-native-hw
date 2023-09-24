const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function formatDate(number) {
  const date = new Date(number);
  return `${date.getDate()} ${
    month[date.getMonth()]
  }, ${date.getFullYear()} | ${date.getHours()}:${date.getMinutes()}`;
}
