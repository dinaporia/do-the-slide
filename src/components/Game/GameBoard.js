import React, { Component } from 'react';
import { GameImage, GamePiece } from './';

// 540 x 360 image
// 90x 90 tiles

class GameBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            correctTiles: [],  
            shuffledTiles: []
        };
    }

    componentDidMount() {
        this.createTiles();
    }

    orderedTiles = [];

    createTiles = () => {
        const { boardWidth, boardHeight } = this.props;
        let tileIndex = 0;
        // each tile stores its correct location in array (via index/id) and col/row
        for (let row = 0; row < boardHeight; row++) {
            for (let col = 0; col < boardWidth; col++) {
                const piece = { id: tileIndex, col: col, row: row }
                this.orderedTiles.push(piece);
                tileIndex++;
            }
        }
       
        // create shallow copy of cloned objects to shuffle
        const shuffledTiles = this.orderedTiles.map(oTile => {
            return {...oTile}
        });
        
       shuffledTiles.sort(() => Math.random() - 0.5);   // TODO: CHECK IF PUZZLE IS SOLVABLE

        // const spare = shuffledTiles[22];
        // shuffledTiles[22] = shuffledTiles[23];
        // shuffledTiles[23] = spare;
       
        shuffledTiles.forEach((sTile, index) => {
            // get current position based on index in new array
            sTile.col = index % boardWidth;
            sTile.row = Math.floor(index/boardWidth);
            // hide corner tile
            sTile.hidden = ((sTile.row === (boardHeight - 1)) && (sTile.col === (boardWidth - 1))) ? true : false;
            // store index for easier reference
            sTile.shuffledIndex = index;
        }); 

        // mark whether tiles are in correct position
        // hidden tile always reads true
        const correctArray = this.orderedTiles.map(oTile => {
            const currentTile = shuffledTiles.filter(sTile => sTile.id === oTile.id)[0];
            return (currentTile.hidden || (currentTile.row === oTile.row && currentTile.col === oTile.col)) ? true : false;
        })

        // store both correct and new location in state
        this.setState({ correctTiles: correctArray, shuffledTiles: shuffledTiles });
    }

    moveTile = (id) => {
        // retrieve clone of tile by id
        const currentTile = {...this.state.shuffledTiles.filter(item => item.id === id)[0]};
        console.log('tile ' + JSON.stringify(currentTile));
        // do nothing if hidden
        if (currentTile.hidden) return;

        // check if tile is adjacent to hidden aka movable
        const hiddenTile = {...this.state.shuffledTiles.filter(item => item.hidden)[0]};
        let movable = false;

        if (hiddenTile.row === currentTile.row) {
            if (hiddenTile.col - currentTile.col === 1) {
                movable = 'right';
            } else if (hiddenTile.col - currentTile.col === -1) {
                movable = 'left';
            }
        } else if (hiddenTile.col === currentTile.col) {
            if (hiddenTile.row - currentTile.row === 1) {
                movable = 'down';
            } else if (hiddenTile.row - currentTile.row === -1){
                movable = 'up';
            }
        }
        
        // set new position according to move direction
        switch (movable) {
            case 'left': 
                currentTile.col -= 1;
                hiddenTile.col += 1;
            break;
            case 'right':
                currentTile.col += 1;
                hiddenTile.col -= 1;
            break;
            case 'up':
                currentTile.row -= 1;
                hiddenTile.row += 1;
            break;
            case 'down':
                currentTile.row += 1;
                hiddenTile.row -= 1;
            break;
            default:
                // TO DO: add shake animation!
                return;
        }   

        // update location for moved & hidden tiles
        const updatedTiles = this.state.shuffledTiles.slice();
        updatedTiles[currentTile.shuffledIndex] = currentTile;
        updatedTiles[hiddenTile.shuffledIndex] = hiddenTile;
  
        this.setState({shuffledTiles: updatedTiles })
        this.props.moveCounter(); 

        // mark if piece is in correct position
        const oTile = this.orderedTiles.filter(oTile => currentTile.id === oTile.id)[0];
        const correctArray = this.state.correctTiles.slice();
        correctArray[currentTile.id] = (currentTile.row === oTile.row && currentTile.col === oTile.col) ? true : false;
        
        this.setState({correctTiles: correctArray});

        if (!correctArray.includes(false)) {
            this.props.gameOver();
        }

    }

  

    render () {
        return (
            <div className='board' >
            {/* render a GamePiece for each tile */}
            { this.state.shuffledTiles.map(tile => (
                <GamePiece 
                    tile={tile} 
                    key={tile.id} 
                    moveTile={this.moveTile} 
                    size = {{width: this.props.boardWidth, height: this.props.boardHeight}}
                    imgUrl='/images/memento.jpg'

                />
                )) 
            }
            </div>
        );
    }
    
}

export default GameBoard;