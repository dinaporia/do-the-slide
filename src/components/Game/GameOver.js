import React from 'react';

const GameOver = ({toggleGameOver, imgUrl, moves, timer}) => {

    const hours = Math.floor(timer/3600);
    const minutes = Math.floor((timer % 3600) / 60);
    const seconds = timer - (hours * 3600) - (minutes * 60);
  
    let time = '';
    if (hours > 0) time += `${hours} hours, `;
    if (minutes > 0) time += `${minutes} minutes, `;
    time += `${seconds} seconds`;
    return (
        <div className='game-over' style={{backgroundImage: `url(${imgUrl})`}}>
            <p>
            You did it! And it only took you {moves} moves and {time}.
            </p>
          
           <button onClick={toggleGameOver}>PLAY AGAIN'</button>
        </div>
    );
}

export default GameOver;