import {useState} from "react";
import {calculateTotal, endsPerRound, MISS, scoresPerEnd, validScores} from "../domain/scores";

export const meta = () => {
    return [
        {title: "Fast!"},
        {name: "description", content: "Fast!"},
    ];
};

export default function Index() {
    const [scores, setScores] = useState([])

    return (
        <>
            <h1>Fast!</h1>

            {validScores.map((e, index) => (
                <ScoreButton key={index} setScores={setScores} value={e}/>
            ))}

            <ScoreSheet scores={scores}/>
            <RunningTotal scores={scores}/>
            <HitCounter scores={scores}/>
            <GoldCounter scores={scores}/>

        </>
    );
}


function ScoreButton({setScores, value}) {
    return (
        <button onClick={() => setScores(currentScores => [...currentScores, value])}>{value}</button>
    )
}

function ScoreSheet({scores}) {

    const ends = scores.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / scoresPerEnd)

        if (!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = [] // start a new chunk
        }

        resultArray[chunkIndex].push(item)

        return resultArray
    }, [])


    const rounds = ends.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / endsPerRound)

        if (!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = [] // start a new chunk
        }

        resultArray[chunkIndex].push(item)

        return resultArray
    }, [])

    return (
        <>
            <h1>Your Scores</h1>
            <table>
                <thead>
                <tr>
                    <th colSpan={6}>🎯 scores</th>
                    <th>E/T</th>
                    <th colSpan={6}>🎯 scores</th>
                    <th>E/T</th>
                    <th>H</th>
                    <th>S</th>
                    <th>G</th>
                </tr>
                </thead>
                <tbody>
                {rounds.map((e, index) => (
                    <tr key={index}>
                        <End endScores={e[0] ?? []}/>
                        <End endScores={e[1] ?? []}/>
                        <RoundSubTotals ends={e}/>
                    </tr>
                ))}

                </tbody>
            </table>
        </>
    )
}

function End({endScores}) {
    const endTotal = calculateTotal(endScores)
    return (
        <>
            {Array.from({length: scoresPerEnd}, (_, i) => i + 1).map((e, index) => (
                <td key={index}>{endScores[e - 1] ?? ''}</td>
            ))}
            <td>{endTotal}</td>
        </>
    );
}

function RoundSubTotals({ends}) {
    console.log("Ends: ", ends)
    const scores = ends.flat()

    const hitsCount = scores.reduce((total, score) => {
        if (score !== MISS) {
            return total + 1
        }
        return total
    }, 0)

    const roundScore = scores.reduce((total, score) => {
        if (score === MISS) {
            return total
        }

        return total + score
    }, 0)

    const goldCount = scores.reduce((total, score) => {
        if (score === 9) {
            return total + 1
        }
        return total
    }, 0)

    return (
        <>
            <td>{hitsCount}</td>
            <td>{roundScore}</td>
            <td>{goldCount}</td>
        </>
    )
}

function RunningTotal({scores}) {
    const runningTotal = scores.reduce((total, score) => {
        if (score === MISS) {
            return total
        }

        return total + score
    }, 0)
    return (
        <>
            <h1>Running Total</h1>
            <p>{runningTotal}</p>
        </>
    )
}

function HitCounter({scores}) {
    const hitsCount = scores.reduce((total, score) => {
        if (score !== MISS) {
            return total + 1
        }
        return total
    }, 0)
    return (
        <>
            <h1>Hits</h1>
            <p>{hitsCount}</p>
        </>
    )
}

function GoldCounter({scores}) {
    const goldCount = scores.reduce((total, score) => {
        if (score === 9) {
            return total + 1
        }
        return total
    }, 0)
    return (
        <>
            <h1>Golds</h1>
            <p>{goldCount}</p>
        </>
    )
}
