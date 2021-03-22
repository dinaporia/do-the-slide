import React from 'react';

const Landing = () => {
	return (
		<div className="home">
			<div className="screenshot">
				<img src='/images/bubble.jpg' alt='screenshot of app'/>
			</div>
			<div className="explainer">
				<p className='left'>Do the Slide is a puzzle game built in the style of slide-15 puzzles. The puzzle will randomly select an image, divide it up into tiles, and scramble those tiles on the board.  </p>
				<p className='right'>Your job, as the player, is to rearrange the tiles back into the original image. Click on a tile to move it - but you can only move tiles that are adjacent to the empty slot. See if you can do it in fewer than 500 moves!</p>
				<p className='left'>You can view the source code here.</p>
				<p className='right'>This app was built by Dina Muhic, <br />using React and Sass, <br /> as part of a MintBean learnathon project.</p>
			</div>
		</div>
	);
}

export default Landing;
