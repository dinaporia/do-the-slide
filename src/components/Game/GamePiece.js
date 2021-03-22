import React from 'react';

const GamePiece = ({tile, moveTile, size, imgUrl}) => {

    const {id, row, col, hidden } = tile;
    const tileLength = 90;  // offset per row/col

    const correctCol = id % size.width;
    const correctRow = Math.floor(id/size.width);

    const position = {top: (row * tileLength) + 'px', 
    left: (col * tileLength) + 'px'};
    const imgPlacement = (hidden) 
        ? { visibility: hidden } 
        : { background: `url(${imgUrl}) no-repeat ${-correctCol * tileLength}px ${-correctRow * tileLength}px ` };
  
    const styleObject = {...position, ...imgPlacement}
    
    return (
        <div className={`tile `} 
            style={styleObject}
            onClick={() => moveTile(id)}
        >

        </div>
    );
}

export default GamePiece;