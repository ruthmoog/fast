import {useEffect, useState} from "react";
import {
    calculateGoldCount,
    calculateHitsCount,
    calculateRounds,
    calculateTotal,
    scoresPerEnd,
    validScores
} from "../domain/scores";

export const meta = () => {
    return [
        {title: "Fast!"},
        {name: "description", content: "Fast!"},
    ];
};

function useLocalStorage(key) {
    const [state, setState] = useState([]);

    useEffect(() => {
        const rawData = localStorage.getItem(key);
        if (rawData === null) {
            setState([])
        } else {
            setState(JSON.parse(rawData));
        }
    }, [key]);

    const setWithLocalStorage = (nextState) => {
        localStorage.setItem(key, JSON.stringify(nextState))
        setState(nextState);
    };

    return [state, setWithLocalStorage];
}

export default function Index() {
    const [scores, setScores] = useLocalStorage("scores")

    return (
        <>
            <h1>FAST!</h1>

            <section id="buttonsContainer">
                {validScores.map((score, index) => (
                    <ScoreButton key={index} setScores={setScores} value={score} currentScore={scores}/>
                ))}
            </section>

            <ScoreSheet scores={scores}/>
            {/*<RunningTotal scores={scores}/>*/}
            {/*<HitCounter scores={scores}/>*/}
            {/*<GoldCounter scores={scores}/>*/}

            <ClearStorageButton setScores={setScores}/>

        </>
    );
}

function ClearStorageButton({setScores}) {
    const [shouldClear, setShouldClear] = useState(false)

    useEffect(() => {
        if(shouldClear) {
            setScores([])
            setShouldClear(false)
        }
    }, [shouldClear])

    return (
        <button onClick={() => setShouldClear(true)}>⚠️ Clear stored data?</button>

    )
}

function ScoreButton({setScores, value, currentScore}) {
    return (
        <button id={"score" + value}
                onClick={() => setScores([...currentScore, value] )}>{value}</button>
    )
}

function ScoreSheet({scores}) {
    return (
        <>
            <h1>Your Scores</h1>
            <table>
                <thead>
                <tr>
                    <th className="spanningColumn" colSpan={6}>🎯 scores</th>
                    <th>E/T</th>
                    <th className="spanningColumn" colSpan={6}>🎯 scores</th>
                    <th>E/T</th>
                    <th>H</th>
                    <th>S</th>
                    <th>G</th>
                    <th>R/T</th>
                </tr>
                </thead>
                <tbody>
                {calculateRounds(scores).map((round, index) => (
                    <tr key={index}>
                        <End endScores={round.firstEnd}/>
                        <End endScores={round.secondEnd}/>
                        <RoundSubTotals subtotals={round.subTotals}/>
                    </tr>
                ))}

                </tbody>
            </table>
        </>
    )
}

function End({endScores}) {
    return (
        <>
            {Array.from({length: scoresPerEnd}, (_, i) => i + 1).map((e, index) => (
                <td key={index}>{endScores[e - 1] ?? ''}</td>
            ))}
            <td>{calculateTotal(endScores)}</td>
        </>
    );
}

function RoundSubTotals({subtotals}) {
    return (
        <>
            <td>{subtotals.hits}</td>
            <td>{subtotals.score}</td>
            <td>{subtotals.golds}</td>
            <td>{subtotals.runningTotal}</td>
        </>
    )
}

function RunningTotal({scores}) {
    return (
        <>
            <h1>Running Total</h1>
            <p data-testid={"running-total"}>{calculateTotal(scores)}</p>
        </>
    )
}

function HitCounter({scores}) {
    return (
        <>
            <h1>Hits</h1>
            <p>{calculateHitsCount(scores)}</p>
        </>
    )
}

function GoldCounter({scores}) {
    return (
        <>
            <h1>Golds</h1>
            <p>{calculateGoldCount(scores)}</p>
        </>
    )
}
