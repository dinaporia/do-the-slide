import React, { Component } from 'react';
import { GameImage, GamePiece } from './';

// 540 x 360 image
// 90x 90 tiles

class GameBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderedTiles: [],
            shuffledTiles: []
        };
    }

    componentDidMount() {
        this.createTiles();
    }

    createTiles = () => {
        const {boardWidth, boardHeight } = this.props;
        const tiles = []; 
        let tileIndex = 0;
        // each tile stores its correct location in array and col/row
        for (let row = 0; row < boardHeight; row++) {
            for (let col = 0; col < boardWidth; col++) {
                const piece = { id: tileIndex, col: col, row: row }
                tiles.push(piece);
                tileIndex++;
            }
        }
       
        // shuffle tiles into new array
       // const shuffledTiles = tiles.slice().sort(() => Math.random() - 0.5);
       const shuffledTiles = tiles.slice();
       const spare = shuffledTiles[23];
       shuffledTiles[23] = shuffledTiles[22];
       shuffledTiles[22] = spare;
       
       
        shuffledTiles.forEach((item, index) => {
            // get current position based on index in new array
            item.col = index % boardWidth;
            item.row = Math.floor(index/boardWidth);

            // corner tile will be hidden
            item.hidden = ((item.row === (boardHeight - 1)) && (item.col === (boardWidth - 1))) ? true : false;

            // store index for easier reference
            item.shuffledIndex = index;
        }); 

        // store both correct and new location in state
        this.setState({orderedTiles: tiles, shuffledTiles: shuffledTiles });
    }

    moveTile = (id) => {
        // retrieve tile by id
        const tile = this.state.shuffledTiles.filter(item => item.id === id)[0];
        console.log('tile ' + JSON.stringify(tile));
        // do nothing if hidden
        if (tile.hidden) return;

        // check if tile is adjacent to hidden tile
        const hiddenTile = this.state.shuffledTiles.filter(item => item.hidden)[0];

        let movable = false;
        if (hiddenTile.row === tile.row) {
            if (hiddenTile.col - tile.col === 1) {
                movable = 'right';
            } else if (hiddenTile.col - tile.col === -1) {
                movable = 'left';
            }
        } else if (hiddenTile.col === tile.col) {
            if (hiddenTile.row - tile.row === 1) {
                movable = 'down';
            } else if (hiddenTile.row - tile.row === -1){
                movable = 'up';
            }
        }
        
        console.log('movable ' + movable);
        // set new position according to move direction
        switch (movable) {
            case 'left': 
                tile.col -= 1;
                hiddenTile.col += 1;
            break;
            case 'right':
                tile.col += 1;
                hiddenTile.col -= 1;
            break;
            case 'up':
                tile.row -= 1;
                hiddenTile.row += 1;
            break;
            case 'down':
                tile.row += 1;
                hiddenTile.row -= 1;
            break;
            default:
                // if tile is not movable, add shake animation!
                return;
        }   
        // store new info for moved tile & hidden tile
        const updatedTiles = this.state.shuffledTiles.slice();
        updatedTiles[tile.shuffledIndex] = tile;
        updatedTiles[hiddenTile.shuffledIndex] = hiddenTile;
  
        this.setState({shuffledTiles: updatedTiles })
        this.props.handleMove();

        // // check if puzzle is solved
        // let correctPlacement = [];
        // this.state.orderedTiles.forEach(orderedTile => {
        //     const shuffledTile = updatedTiles.filter(shuffled => orderedTile.id === shuffled.id)[0];
        //     if ((shuffledTile.col === orderedTile.col) && (shuffledTile.row === orderedTile.row)) {
        //         correctPlacement.push(true);
        //     } else {
        //         correctPlacement.push(false);
        //     }
            
        // });
        
        // if (!correctPlacement.includes(false)) {
        //     console.log('correct ' + correctPlacement); 
        //     this.props.setGameOver();
        // }


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
                />
                )) 
            }
            </div>
        );
    }
    
}

export default GameBoard;