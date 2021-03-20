import React from 'react';
import { GameImage, GamePiece } from './';


const GameBoard = (props) => {
// 540 x 360 image
// 6 x 4 grid
// 90x 90 tiles

    const boardWidth = 6;   // num of columns
    const boardHeight = 4;  // num of rows

    const tiles = [];   

    // for each cell in grid, create object and add to array
    for (let row = 1; row <= boardHeight; row++) {
        for (let col = 1; col <= boardWidth; col++) {
            // store correct placement of tile
            const piece = { initialCol: col, initialRow: row }
            // last tile will be hidden
            if (row === boardHeight && col === boardWidth) {
                piece.hidden = true;
            } else {
                piece.hidden = false;
            }
            tiles.push(piece);
        }
    }

    // shuffle array
   // tiles.sort(() => Math.random() - 0.5);

    // get current position based on index in array
    tiles.forEach((item, index) => {
        let col, row;
        for (let i = boardWidth; i > 0; i--){  // 6
            if (index < boardHeight * i) {      // 0   < 
            col = i;
            }
        }
        col = index % boardWidth + 1;
        row = Math.floor(index/boardWidth) + 1;
    
        item.currentCol = col;
        item.currentRow = row;       
    });


    return (
        <div className='board'>
        {/* render a GamePiece for each tile */}
        { tiles.map(tile => <GamePiece tile={tile}/>) }
        </div>
    );
}

export default GameBoard;