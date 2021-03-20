import React, { useState } from 'react';

import { GameBoard, GameImage, GameOver, Stats } from './Game/';



const Slide = () => {
    const [ moves, setMoves ] = useState(0);
    const [ start, setStart ] = useState(false);
    const [ gameOver, setGameOver ] = useState(false);
    
    const toggleStart = () => {
        setStart(true);
    }

    if (gameOver) {
        setStart(false);
    }

    return (
        <div className='game-wrapper'>
        {(start) ? 
            <GameBoard setMoves={setMoves} start={start} setGameOver={setGameOver}/> 
            : 
            <GameImage toggleStart={toggleStart}/>
        }
       
        { gameOver &&
            <GameOver />
        }
            <Stats moves={moves} gameRun={start} />
        </div>
    );
}

export default Slide;