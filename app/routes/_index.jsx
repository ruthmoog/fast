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
        </>
    );
}

function ScoreButton({setScores, value}) {
    return (
        <button onClick={event => setScores(currentScores => [...currentScores, value])}>{value}</button>
    )
}

function ScoreSheet({scores}) {
    return (
        <>
            <h1>Current scores</h1>
            <ol>
                {scores.map(score => (<li>{score}</li>))}
            </ol>
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

function Counter() {
    const [count, setCount] = useState(0)
    return (
        <>
            <p>count = {count}</p>
            <button onClick={event => setCount(count + 1)}>Click me!</button>
        </>
    );
}

