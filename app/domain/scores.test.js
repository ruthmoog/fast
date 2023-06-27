import {calculateGoldCount, calculateHitsCount, calculateTotal, validScores} from "./scores";

// note to ruth: https://vitest.dev/
test("it knows the valid scores of imperial archery", () => {
  expect(validScores).toEqual([1, 3, 5, 7, 9, "M"]);
});

test.each([
  [[1, 3, 5, 7, 9, "M"], 25],
  [[1, 3, 5, 7, 9, 1], 26],
  [[1, 3, 5, 7, 9, 3], 28],
  [[1, 3, 5, 7, 9, 5], 30],
  [[1, 3, 5, 7, 9, 7], 32],
  [[1, 3, 5, 7, 9, 9], 34]
])("it can calculate totals", (scores, expectedTotal) => {
  expect(calculateTotal(scores)).toEqual(expectedTotal);
});

test.each([
  [[1,   3,   5,   7,   9,   7  ], 6],
  [[1,   3,   5,   7,   9,   "M"], 5],
  [[1,   3,   5,   7,   "M", "M"], 4],
  [[1,   3,   5,   "M", "M", "M"], 3],
  [[1,   3,   "M", "M", "M", "M"], 2],
  [[1,   "M", "M", "M", "M", "M"], 1],
  [["M", "M", "M", "M", "M", "M"], 0]
])("it can calculate hits", (scores, expectedHitCount) => {
  expect(calculateHitsCount(scores)).toEqual(expectedHitCount);
});

test.each([
  [[9, 9, 9, 9,   9, 9], 6],
  [[1, 9, 9, 9,   9, 9], 5],
  [[1, 3, 9, 9,   9, 9], 4],
  [[1, 3, 5, 9,   9, 9], 3],
  [[1, 3, 5, "M", 9, 9], 2],
  [[1, 3, 5, "M", 1, 9], 1],
  [[1, 3, 5, "M", 1, 7], 0]
])("it can calculate golds", (scores, expectedGoldsCount) => {
  expect(calculateGoldCount(scores)).toEqual(expectedGoldsCount);
});
