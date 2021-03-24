import React from 'react';
import { Switch, Route, Redirect, HashRouter } from 'react-router-dom';
import './App.scss';
import Landing from './components/Landing';
import Header from './components/Header';
import Slide from './components/Slide';

const App = () => {
	return (
		<div className="App">
			<HashRouter>
				<Header />
				<Switch>
					<Route path='/home'>
						<Landing />
					</Route>
					<Route path='/slide'>
						<Slide />
					</Route>
					<Redirect to='/home' />
				</Switch>
			</HashRouter>
		</div>		
	);
}

export default App;
