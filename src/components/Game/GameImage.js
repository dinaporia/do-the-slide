import React from 'react';

const GameImage = ({toggleStart, imgUrl}) => {
// 

    return (
        <div className='game-image' style={{backgroundImage: `url(${imgUrl})`}}>
            <button onClick={toggleStart}>PLAY</button>
        </div>
    );
}

export default GameImage;