import { calculateTotal, validScores } from "./scores";

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