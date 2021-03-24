import React, {useEffect, useState} from 'react';

const GamePiece = ({tile, moveTile, size, imgUrl, tileLength, stopShake}) => {
    const {id, row, col, hidden, shuffledIndex, shake = false} = tile;
    const [ shakeTile, setShake] = useState('');

    useEffect(() => {
        // add shake, clear after animation ends
        if (shake) {
            setShake('shakeTile');
            setTimeout(() => {
                setShake('');
                stopShake(shuffledIndex);
                }, 
            800);
        }
    }, [shake, stopShake, shuffledIndex]);

    // determine slice of image that goes inside tile
    const correctCol = id % size.width;
    const correctRow = Math.floor(id/size.width);

    const tileSize = {
        width: (tileLength - 5) + 'px', 
        height: (tileLength - 5) 
    };

    const position = { 
        transform: `translate(${col * tileLength}px, ${row * tileLength}px) `
    };
        
    const imgPlacement = (hidden) 
        ? { visibility: 'hidden' } 
        : { background: `url(${imgUrl}) no-repeat ${-correctCol * tileLength}px ${-correctRow * tileLength}px ` };

    return (
        <div 
            className={`tile ${(hidden) ? 'hidden' : ''}`}
            style={{...tileSize, ...position}}
            onClick={() => moveTile(id)}
        >
            <div 
                className={`inner-tile ${shakeTile}`} 
                style={imgPlacement}
            />      
        </div>
    );
}

export default GamePiece;