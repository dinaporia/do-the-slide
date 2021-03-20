import React, { useState, useEffect } from 'react';


const Timer = ({gameRun}) => {
    const [ time, setTime ] = useState(0);
    useEffect(() => {
        if (gameRun) {
            const stopTimer = setInterval(() => setTime(t => t + 1), 1000);
            return () => clearInterval(stopTimer);
        // } else {
        //     setTime(0);
        }
    }, [gameRun])

    return (
        <p>Time: <span id='time'>{time}</span></p>
    );
}


const Stats = ({moves, gameRun = false}) => {

    return (
        <div className='stats'>
            <p>Moves: <span id='moves'>{moves}</span></p>
            <Timer gameRun={gameRun} />
        </div>
    );
}

export default Stats;