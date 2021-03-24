import React, { Component } from 'react';
import { GamePiece } from './';

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

    // store ordered tiles as props bc they don't change after creation
    orderedTiles = [];

    // shuffle tiles using Fisher-Yates algorithm
    shuffleTiles = (tiles) => {
        for (let i = tiles.length -1; i > 0; i--) {
            const j = Math.floor(Math.random() * i);
            const k = tiles[i];
            tiles[i] = tiles[j];
            tiles[j] = k;
        }
    }

    // check to see if puzzle is solvable using inversions
    isSolvable = (width, tiles, hiddenRow) => {
        let inversions = 0;
        // check for 0 bc it isn't even or odd
        const rowIsEven = (hiddenRow === 0 || hiddenRow % 2 === 0) 
            ? true : false;
        
        tiles.forEach( tile => {
        // each tile that belongs before this one but comes after it is an inversion
            for (let i = (tile.shuffledIndex + 1); i < tiles.length -1; i++) {
                if (tiles[i].id < tile.id) inversions++;
            }
        });
        console.log('inversions ' + inversions);

        // if grid is odd, inversions must be even
        if (width % 2 === 1) {
            return (inversions % 2 === 0);
        } else {
            // if hidden row is even, inversions must be odd
            if (rowIsEven) {
                return (inversions % 2 === 1)
            } else {
                // if hidden row is odd, inversions must be even
                return (inversions % 2 === 0)
            }
        }
    }

    // runs on mount
    createTiles = () => {
        const { boardWidth, boardHeight } = this.props;
        let tileIndex = 0;
        // each tile stores its correct location in array (via index/id) and col/row
        for (let row = 0; row < boardHeight; row++) {
            for (let col = 0; col < boardWidth; col++) {
                const piece = { id: tileIndex, col: col, row: row }
                this.orderedTiles.push(piece);
                tileIndex++;
                 // hide corner tile
                piece.hidden = ((piece.row === (boardHeight - 1)) && (piece.col === (boardWidth - 1))) ? true : false;
            }
        }
        // create shallow copy of cloned objects to shuffle
        let shuffledTiles = this.orderedTiles.map(oTile => {
            return {...oTile}
        });
        
        this.shuffleTiles(shuffledTiles);

        // calculate new position based on index
        shuffledTiles.forEach((sTile, index) => {
            sTile.col = index % boardWidth;
            sTile.row = Math.floor(index/boardWidth);
            sTile.shuffledIndex = index; // store for easier reference
        }); 

    // CHECK IF PUZZLE IS SOLVABLE
        // check if hidden tile is in even row
        const hiddenRow = shuffledTiles.filter(tile => tile.hidden)[0].row;

        if (!this.isSolvable(boardWidth, shuffledTiles, hiddenRow)) {
            console.log("running not solvable")
            // if not solvable, swap two tiles
            if (hiddenRow === 0) {
                // if hidden tile is in top row, swap last two tiles
                let i = shuffledTiles.length - 1;
                let j = i - 1;
                const spare = shuffledTiles[i];
                shuffledTiles[i] = shuffledTiles[j]
                shuffledTiles[j] = spare;
                // update indices
                shuffledTiles[j].shuffledIndex = j;
                shuffledTiles[i].shuffledIndex = i;
                // update position
                shuffledTiles[j].col = shuffledTiles[j].col + 1;
                shuffledTiles[i].col = shuffledTiles[j].col - 1;
            } else {
                // swap first two tiles
                const spare = shuffledTiles[0];
                shuffledTiles[0] = shuffledTiles[1]
                shuffledTiles[1] = spare;

                shuffledTiles[0].shuffledIndex = 0;
                shuffledTiles[1].shuffledIndex = 1;

                shuffledTiles[0].col = 0;
                shuffledTiles[1].col = 1;
            }
        }

        // note whether tiles are in correct position
        // hidden tile always reads true
        const correctArray = this.orderedTiles.map(oTile => {
            const currentTile = shuffledTiles.filter(sTile => sTile.id === oTile.id)[0];
            return (currentTile.hidden 
                || (currentTile.row === oTile.row && currentTile.col === oTile.col)) 
                ? true 
                : false;
        });

        this.setState({ correctTiles: correctArray, shuffledTiles: shuffledTiles });
    }

    // passed to GamePieces, responds to click
    moveTile = (id) => {
        // use clones of state objects to prevent accidentally mutating state
        const currentTile = {...this.state.shuffledTiles.filter(item => item.id === id)[0]};
        // hidden tile cannot be interacted with
        if (currentTile.hidden) return;     
        currentTile.shake = false;  
        
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
                currentTile.shake = false;
            break;
            case 'right':
                currentTile.col += 1;
                hiddenTile.col -= 1;
                currentTile.shake = false;
            break;
            case 'up':
                currentTile.row -= 1;
                hiddenTile.row += 1;
                currentTile.shake = false;
            break;
            case 'down':
                currentTile.row += 1;
                hiddenTile.row -= 1;
                currentTile.shake = false;
            break;
            default:
                currentTile.shake = true;
        }   

        // update location for moved & hidden tiles
        const updatedTiles = this.state.shuffledTiles.slice();
        updatedTiles[currentTile.shuffledIndex] = currentTile;
        updatedTiles[hiddenTile.shuffledIndex] = hiddenTile;
  
        this.setState({shuffledTiles: updatedTiles })

        this.props.moveCounter(); // increment move counter

        // note if piece is in correct position, update state
        const oTile = this.orderedTiles.filter(oTile => currentTile.id === oTile.id)[0];
        const correctArray = this.state.correctTiles.slice();
        correctArray[currentTile.id] = (currentTile.row === oTile.row 
            && currentTile.col === oTile.col) 
            ? true 
            : false;
        
        this.setState({correctTiles: correctArray});

        // if all pieces are in correct position, game is won
        if (!correctArray.includes(false)) {
            this.props.gameOver();
        }
    }

    // give tiles access to turn off their shake 
    stopShake = (shuffledIndex) => {
        const shuffledCopy = this.state.shuffledTiles.slice();
        shuffledCopy[shuffledIndex].shake = false;
        this.setState({shuffledTiles: shuffledCopy});
    }

    render () {
        return (
            <div className='board' >
            { this.state.shuffledTiles.map(tile => (
                <GamePiece 
                    tile={tile} 
                    key={tile.id} 
                    moveTile={this.moveTile} 
                    size = {{width: this.props.boardWidth, height: this.props.boardHeight}}
                    imgUrl={this.props.imgUrl}
                    tileLength={this.props.tileLength}
                    stopShake={this.stopShake}
                />
                )) 
            }
            </div>
        );
    }
}

export default GameBoard;