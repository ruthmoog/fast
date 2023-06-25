import {useState} from "react";

export const meta = () => {
    return [
        {title: "New Remix App"},
        {name: "description", content: "Welcome to Remix!"},
    ];
};

export default function Index() {
    const [scores, setScores] = useState([])


    return (
        <>
            <h1>Fast!</h1>

            <ScoreButton setScores={setScores} value={9}/>
            <ScoreButton setScores={setScores} value={7}/>
            <ScoreButton setScores={setScores} value={5}/>
            <ScoreButton setScores={setScores} value={3}/>
            <ScoreButton setScores={setScores} value={1}/>
            <ScoreButton setScores={setScores} value={'M'}/>

            <ScoreSheet scores={scores}/>

            <RunningTotal scores={scores}/>
            <HitCounter scores={scores}/>
            <GoldCounter scores={scores}/>

        </>
    );
}

function ScoreButton({setScores, value}) {
    return (
        <button onClick={event => setScores(currentScores => [...currentScores, value])}>{value}</button>
    )
}

function ScoreSheet({scores}) {

    const scoresPerEnd = 6 // items per chunk

    const ends = scores.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / scoresPerEnd)

        if (!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = [] // start a new chunk
        }

        resultArray[chunkIndex].push(item)

        return resultArray
    }, [])

    const endsPerRound = 2 // items per chunk

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
            <table >
                <thead>
                <tr >
                    <th  colSpan={6}>🎯 scores</th>
                    <th >E/T</th>
                    <th  colSpan={6}>🎯 scores</th>
                    <th >E/T</th>
                    <th >H</th>
                    <th >S</th>
                    <th >G</th>
                </tr>
                </thead>
                <tbody>
                {rounds.map((e) => (
                    <tr >
                        <End endScores={e[0] ?? []} />
                        <End endScores={e[1] ?? []} />
                        <RoundSubTotals ends={e}/>
                    </tr>
                ))}

                </tbody>
            </table>
        </>
    )
}

function End({endScores}) {
    const endTotal = endScores.reduce((totalScore, score) => {
        if (score === 'M') {
            return totalScore
        }

        return totalScore + score
    }, 0)
    return (
        <>
            <td >{endScores[0] ?? ''}</td>
            <td >{endScores[1] ?? ''}</td>
            <td >{endScores[2] ?? ''}</td>
            <td >{endScores[3] ?? ''}</td>
            <td >{endScores[4] ?? ''}</td>
            <td >{endScores[5] ?? ''}</td>

            <td >{endTotal}</td>
        </>
    );
}

function RoundSubTotals({ends}) {
    console.log("Ends: ", ends)
    const scores = ends.flat()

    const hitsCount = scores.reduce((total, score) => {
        if (score !== 'M') {
            return total + 1
        }
        return total
    }, 0)

    const roundScore = scores.reduce((total, score) => {
        if (score === 'M') {
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
        if (score === 'M') {
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
        if (score !== 'M') {
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

function Counter() {
    const [count, setCount] = useState(0)
    return (
        <>
            <p>count = {count}</p>
            <button onClick={event => setCount(count + 1)}>Click me!</button>
        </>
    );
}

