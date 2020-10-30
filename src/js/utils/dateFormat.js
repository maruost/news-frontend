function findPrevDate(date, days) {
  const dateCopy = new Date(date);
  dateCopy.setDate(date.getDate() - days);
  return dateCopy;
}

function dateFormat(rowDate) {
  const date = new Date(Date.parse(rowDate));
  const formatedDate = String(date.toISOString().match(/\d{4}\-\d{2}\-\d{2}/));
  return formatedDate;
}

function dateWithMontsName(date) {
  const localFormatedDate = new Date(date).toLocaleString("ru", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const splited = localFormatedDate.split(" ");
  const result = splited[0] + " " + splited[1] + ", " + splited[2];

  return result;
}

export { findPrevDate, dateFormat, dateWithMontsName };
