import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact, faSass, faGithub } from '@fortawesome/free-brands-svg-icons';
import MintBeanLogo from './MintBeanLogo';

const Landing = () => {
	return (
		<div className="home">
			<div className="explainer">
				<p className='left'>Do the Slide is a puzzle game built in the style of slide-15 puzzles. The puzzle will randomly select an image, divide it up into tiles, and scramble those tiles on the board.  </p>
				
				<p className='right'>Your job, as the player, is to rearrange the tiles back into the original image. Click on a tile to move it - but you can only move tiles that are adjacent to the empty slot. See if you can do it in fewer than 200 moves!</p>
				<img className='center' src='./images/demo.gif' alt='animated screencap of game'/>
			
				<p className='left'>This app was built by <a href='https://dinamuhic.com' target='_blank' rel='noreferrer'> Dina Muhic</a>,
					<br />using React and Sass,
					<br />as part of a <a href='https://mintbean.io/' target='_blank' rel='noreferrer'>MintBean</a> learnathon project.
					<br />
					<FontAwesomeIcon icon={faReact} size='2x' pull='left' color='#440e90' className='fa-icon'/> 
					<FontAwesomeIcon icon={faSass} size='2x' color='#ffb2d5' className='fa-icon'/>
					<MintBeanLogo />
				</p>
				<div className='right'>
				<p >You can view the source code <a href='https://github.com/dinaporia/do-the-slide' target='_blank' rel='noreferrer'>here</a>.</p>
				<FontAwesomeIcon icon={faGithub} size='2x' className='fa-icon github'/>
				</div>
				
				
			</div>
		</div>
	);
}

export default Landing;
