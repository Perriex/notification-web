export function getNextDate(list) {
  const today = new Date();
  let after = [];
  let max = list.length;
  for (let i = 0; i < max; i++) {
    let arrDate = new Date(list[i].date);
    let diff = (arrDate - today) / (3600 * 24 * 1000);
    if (diff > 0) {
      after.push(list[i]);
    }
  }
  after.sort(function (a, b) {
    if (a.diff > b.diff) {
      return -1;
    }
    if (a.diff < b.diff) {
      return 1;
    }
    return 0;
  });
  return after[0];
}
