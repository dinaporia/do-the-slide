import React from 'react';

const GameImage = ({toggleStart, imgUrl}) => {

    return (
        <div className='game-image' style={{backgroundImage: `url(${imgUrl})`}}>
          <p>To start, select grid size: </p>
            <div className='level-select'>
                <button onClick={() => toggleStart(3)}>3 x 3</button>
                <button onClick={() => toggleStart(4)}>4 x 4</button>
                <button onClick={() => toggleStart(5)}>5 x 5</button>
            </div>
        </div>
    );
}

export default GameImage;