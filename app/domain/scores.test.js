import { validScores } from "./scores";

test('it knows the valid scores of imperial archery', () => {
    expect(validScores).toEqual([1, 3, 5, 7, 9, 'M'])
} )