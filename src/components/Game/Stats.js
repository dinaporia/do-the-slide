import React, { useState, useEffect } from 'react';


const Timer = ({start, getTime}) => {
    const [ time, setTime ] = useState(0);
    useEffect(() => {
        if (start) {
            const stopTimer = setInterval(() => setTime(t => t + 1), 1000);
            return () => clearInterval(stopTimer);
         } else {
            getTime(time);
        }
    }, [start, time, getTime])

    return (
        <p>Time: <span id='time'>{time}</span></p>
    );
}


const Stats = ({moves, start = false, getTime}) => {

    return (
        <div className='stats'>
            <p>Moves: <span id='moves'>{moves}</span></p>
            <Timer start={start} getTime={getTime}/>
        </div>
    );
}

export default Stats;