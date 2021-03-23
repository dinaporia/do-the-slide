import React from 'react';

const GamePiece = ({tile, moveTile, size, imgUrl, tileLength}) => {

    const {id, row, col, hidden } = tile;
  // const tileLength = 100;  // offset per row/col

    const correctCol = id % size.width;
    const correctRow = Math.floor(id/size.width);

    const tileSize = {width: (tileLength - 4) + 'px', height: (tileLength - 4) }

    const position = { top: (row * tileLength) + 'px', 
        left: (col * tileLength) + 'px'};

    const imgPlacement = (hidden) 
        ? { visibility: 'hidden' } 
        : { background: `url(${imgUrl}) no-repeat ${-correctCol * tileLength}px ${-correctRow * tileLength}px ` };
  
    const styleObject = {...tileSize, ...position, ...imgPlacement}
    
    return (
        <div className='tile' 
            style={styleObject}
            onClick={() => moveTile(id)}
        >

        </div>
    );
}

export default GamePiece;