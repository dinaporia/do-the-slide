import React from 'react';

const GamePiece = ({tile, moveTile}) => {
    const {id, row, col, hidden } = tile;

    const tileLength = 90;  // offset per row/col

    const css = {top: row * tileLength + 'px', left: col * tileLength + 'px'};

    return (
        <div className={`tile ${(hidden) ? 'hidden' : ''} `} 
            style={css}
            onClick={() => moveTile(id)}
        >

        </div>
    );
}

export default GamePiece;