import React from 'react';

const GameOver = ({toggleGameOver, imgUrl, moves, timer}) => {
    // format display of time elapsed
    const hours = Math.floor(timer/3600);
    const minutes = Math.floor((timer % 3600) / 60);
    const seconds = timer - (hours * 3600) - (minutes * 60);
    let time = '';
    // need to add edge cases for 1 hour/minute/second
    // and 0 in the middle
    if (hours > 0) time += `${hours} hours, `;
    if (minutes > 0) time += `${minutes} minutes, `;
    time += `${seconds} seconds`;

    return (
        <div className='game-over' style={{backgroundImage: `url(${imgUrl})`}}>
            <h3>
            You did it!
            </h3><p>
            And it only took you {moves} moves and {time}.
            </p>
          
           <button onClick={toggleGameOver}>PLAY AGAIN</button>
        </div>
    );
}

export default GameOver;