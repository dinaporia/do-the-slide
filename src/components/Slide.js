import React, { useState } from 'react';

import { GameBoard, GameImage, GameOver, Stats } from './Game/';

const Slide = () => {
    const [ moves, setMoves ] = useState(0);
    const [ start, setStart ] = useState(false);
    const [ gameOver, setGameOver ] = useState(false);
    const [ timer, setTimer ] = useState(0);

    const imgUrl = '/images/bubbleSquare.jpg'
    
    const toggleStart = () => {
        setMoves(0);
        setGameOver(false);
        setStart(true);
    }

    const toggleGameOver = () => {
        setGameOver(false);
    }

    const moveCounter = () => {
        setMoves(moves => moves + 1);
    }

    const handleGameOver = () => {
        setStart(false);
        setGameOver(true);
        console.log('game over');
    }

    const getTime = (time) => {
       setTimer(time);
    }

    return (
        <div className='game-wrapper'>

        {(gameOver) ? 
            <GameOver 
                toggleGameOver={toggleGameOver} 
                imgUrl={imgUrl}
                moves={moves}
                timer={timer}
            />
            : (start) ?
                <GameBoard 
                    boardWidth={4} boardHeight={4} 
                    start={start} 
                    gameOver={handleGameOver}
                    moveCounter={moveCounter}
                    imgUrl={imgUrl}
                /> 
                :  <GameImage 
                        toggleStart={toggleStart} 
                        imgUrl={imgUrl}
                    />
        
        }
        {(start || gameOver) &&
        <Stats moves={moves} start={start} getTime={getTime} />
        }
        </div>
    );
}

export default Slide;