function keysObj(arr) {
  let keywords = [];
  let sortedKeys = [];
  arr.forEach((item) => {
    keywords.push(item.keyword);
  });
  let uniqueKeys = new Set(keywords);
  uniqueKeys.forEach((key) => {
    sortedKeys.push({
      keyword: key,
      frequency: keywords.lastIndexOf(key) - keywords.indexOf(key) + 1,
    });
  });
  return sortedKeys;
}

function byField(field) {
  return function (a, b) {
    return a[field] > b[field] ? -1 : 1;
  };
}

export { keysObj, byField };
