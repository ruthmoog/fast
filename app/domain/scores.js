export const MISS = "M";
export const validScores = [1, 3, 5, 7, 9, MISS];
export const scoresPerEnd = 6;
export const endsPerRound = 2;

export function calculateTotal(scores) {
  const hits = scores.filter((score) => score !== MISS)
  return hits.reduce((totalScore, score) => totalScore + score)
}

export function calculateHitsCount(scores) {
  return scores.reduce((total, score) => {
    if (score === MISS) {
      return total;
    }
    return total + 1;
  }, 0);
}

export function calculateGoldCount(scores) {
  return scores.reduce((total, score) => {
    if (score === 9) {
      return total + 1;
    }
    return total;
  }, 0);
}

function calculateEnds(scores) {
  return scores.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / scoresPerEnd);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // start a new chunk
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, []);
}

export function calculateRounds(scores) {
  let makeRounds = calculateEnds(scores).reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / endsPerRound);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // start a new chunk
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, []);

  // makeRounds is an array of "rounds" (which are just arrays)
  // therefore we need to return an array of objects instead

  console.log(makeRounds);

  let rt = 0;

  return makeRounds.map((e) => {
    // figure out subtotals
    const flatted = e.flat();
    let roundScore = calculateTotal(flatted);
    const subTotals = {
      hits: calculateHitsCount(flatted),
      golds: calculateGoldCount(flatted),
      score: roundScore,
      runningTotal: rt + roundScore
    };
    rt = subTotals.runningTotal;

    return { firstEnd: e[0] ?? [], secondEnd: e[1] ?? [], subTotals };
  });
}