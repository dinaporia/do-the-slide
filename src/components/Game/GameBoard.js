import React from 'react';
import { GameImage, GamePiece } from './';


const GameBoard = (props) => {
// 

    return (
        <div className='board'>
        <GameImage />
        <GamePiece />
           
        </div>
    );
}

export default GameBoard;