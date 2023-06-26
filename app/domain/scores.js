export const MISS = 'M'
export const validScores = [1, 3, 5, 7, 9, MISS]
export const scoresPerEnd = 6
export const endsPerRound = 2


export function calculateTotal(scores) {
    return scores.reduce((totalScore, score) => {
        if (score === MISS) {
            return totalScore
        }
        return totalScore + score
    }, 0)
}