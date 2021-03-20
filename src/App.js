import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Landing from './components/Landing';
import AboveTheFold from './components/AboveTheFold';
import Slide from './components/Slide';

const App = () => {
	return (
		<Router>
			<div className="App">
				<AboveTheFold />
				<Switch>
					<Route path='/home'>
						<Landing />
					</Route>
					<Route path='/slide'>
						<Slide />
					</Route>
					<Redirect to='/home' />
				</Switch>
			</div>		
		</Router>
	);
}

export default App;
