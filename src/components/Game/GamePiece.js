import React from 'react';

const GamePiece = ({tile}) => {
const {initialCol, initialRow, currentCol, currentRow, hidden} = tile;
const tileLength = 90;  // offset per cell

//  tile position determined via position props
let currentTop = (currentCol -1)*tileLength;
let currentLeft = (currentRow -1)*tileLength;

    return (
        <div className={`tile ${(hidden) ? 'hidden' : ''}`}>

        </div>
    );
}

export default GamePiece;