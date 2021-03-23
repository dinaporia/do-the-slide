import React, { useState, useEffect } from 'react';

import { GameBoard, GameImage, GameOver, Stats } from './Game/';

const Slide = () => {
    const [ moves, setMoves ] = useState(0);
    const [ start, setStart ] = useState(false);
    const [ gameOver, setGameOver ] = useState(false);
    const [ timer, setTimer ] = useState(0);
    const [ imgUrl, setImage ] = useState(false);
    const [ grid, setGrid ] = useState(4);

    // select image randomly from array
    const images = ['/images/bubbleSquare.jpg', '/images/bird.jpg', '/images/eggs.jpg', '/images/fruit.jpg', '/images/pastel.jpg', '/images/pigeons.jpg', '/images/rose.jpg'];
    // const imgUrl = '/images/bubbleSquare.jpg';

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

    const toggleStart = (grid) => {
        setGrid(grid);
        setMoves(0);
        setGameOver(false);
        setStart(true);
    }

    const toggleGameOver = () => {
        setGameOver(false);
        pickImage();
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
                    boardWidth={gridWidth} boardHeight={gridHeight} 
                    start={start} 
                    gameOver={handleGameOver}
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
        <Stats moves={moves} start={start} getTime={getTime} />
        }
        </div>
    );
}

export default Slide;