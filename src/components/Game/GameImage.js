import React from 'react';

const GameImage = ({toggleStart}) => {
// 

    return (
        <div className='game-image'>
            <button onClick={toggleStart}>Start</button>
        </div>
    );
}

export default GameImage;