import React, { useState } from 'react';

import { GameBoard, GameImage, GameOver, Stats } from './Game/';

const Slide = () => {
    const [ moves, setMoves ] = useState(0);
    const [ start, setStart ] = useState(false);
    const [ gameOver, setGameOver ] = useState(false);
    const [ timer, setTimer ] = useState(0);
    const [ imgUrl, setImage ] = useState(false);
    const [ grid, setGrid ] = useState(4);

    const images = ['/images/bubbleSquare.jpg', '/images/bird.jpg', '/images/eggs.jpg', '/images/fruit.jpg', '/images/pastel.jpg', '/images/pigeons.jpg', '/images/rose.jpg'];
 
    // select image randomly from array
    const pickImage = () => {
        let x = Math.floor(Math.random() * (images.length - 1));
        setImage(images[x]);
    }
    if (!imgUrl) {
        pickImage();
    }

    // grid size
    const gridHeight = grid;
    const gridWidth = grid;
    const tileLength = 400/grid;

    // receives grid input from GameImage
    // resets moves, starts game
    const toggleStart = (grid) => {
        setGrid(grid);
        setMoves(0);
        setGameOver(false);
        setStart(true);
    }

    // triggered by play again btn on GameOver screen
    // selects new image
    const toggleGameOver = () => {
        setGameOver(false);
        pickImage();
    }

    // passed to GameBoard
    const moveCounter = () => {
        setMoves(moves => moves + 1);
    }

    // triggered when tiles are arranged correctly
    // stops counter, triggers game over screen
    const handleGameOver = () => {
        setGameOver(true);
        setStart(false);
       
    }
    // stores time from timer at game over
    const getTime = (time) => {
       setTimer(time - 5);
    }

    // toggle screens based on state
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
                    boardWidth={gridWidth} 
                    boardHeight={gridHeight} 
                    start={start} 
                    handleGameOver={handleGameOver}
                    moveCounter={moveCounter}
                    imgUrl={imgUrl}
                    tileLength={tileLength}
                    pickImage={pickImage}
                /> 
                :  <GameImage 
                        toggleStart={toggleStart} 
                        imgUrl={imgUrl}
                    />
        }
        {(start || gameOver) &&
            <Stats 
                moves={moves} 
                start={start} 
                getTime={getTime} 
            />
        }
        </div>
    );
}

export default Slide;