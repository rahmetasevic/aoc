const fs = require("fs");

const input = fs.readFileSync("./input.txt", "utf-8");

const [leftArr, rightArr] = input
  .trim()
  .split("\n")
  .map((line) => line.split(" ").map(Number))
  .reduce(
    ([left, right], [x, y]) => {
      left.push(x);
      right.push(y);
      return [left, right];
    },
    [[], []],
  );

leftArr.sort((a, b) => a - b);
rightArr.sort((a, b) => a - b);

function calcDistance(l, r) {
  return l.reduce((acc, x, i) => acc + Math.abs(x - r[i]), 0);
}

function calcSimilar(l, r) {
  let similarSum = 0;
  l.map((x) => {
    let count = 0;
    r.map((y, i) => {
      if (x === r[i]) {
        count++;
      }
    });
    similarSum += x * count;
  });

  return similarSum;
}

console.log(calcDistance(leftArr, rightArr));
console.log(calcSimilar(leftArr, rightArr));
