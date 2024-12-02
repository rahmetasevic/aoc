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

const sum = leftArr.reduce((acc, x, i) => acc + Math.abs(x - rightArr[i]), 0);

console.log(sum);
