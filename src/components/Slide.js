import React, { useState } from 'react';

import { GameBoard, GameImage, GameOver, Stats } from './Game/';



const Slide = () => {
    const [ moves, setMoves ] = useState(0);
    const [ start, setStart ] = useState(false);
    const [ gameOver, setGameOver ] = useState(false);
    
    const toggleStart = () => {
        setStart(true);
    }

    const handleMove = () => {
        setMoves(moves => moves + 1);
    }

    if (gameOver) {
        setStart(false);
        console.log('game over');
    }

    return (
        <div className='game-wrapper'>
        {(start) ? 
            <GameBoard 
                boardWidth={6} boardHeight={4} 
                start={start} 
                setGameOver={setGameOver}
                handleMove={handleMove}
            /> 
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