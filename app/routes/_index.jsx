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

    const perChunk = 6 // items per chunk

    const ends = scores.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / perChunk)

        if (!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = [] // start a new chunk
        }

        resultArray[chunkIndex].push(item)

        return resultArray
    }, [])

    console.log(ends);


    return (
        <>
            <h1>Your Scores</h1>
            <table style={{border: "1px solid black"}}>
                <thead>
                <tr style={{border: "1px solid black"}}>
                    <th style={{border: "1px solid black"}} colSpan={6}>🎯 scores</th>
                    <th style={{border: "1px solid black"}}>E/T</th>
                    <th style={{border: "1px solid black"}} colSpan={6}>🎯 scores</th>
                    <th style={{border: "1px solid black"}}>E/T</th>
                </tr>
                </thead>
                <tbody>
                <tr style={{border: "1px solid black"}}>
                    {ends.map((endScores) => (<End endScores={endScores}/>))}
                </tr>
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
            {endScores.map((score) => (<td style={{border: "1px solid black"}}>{score}</td>))}
            <td style={{border: "1px solid black"}}>{endTotal}</td>
        </>
    );
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

