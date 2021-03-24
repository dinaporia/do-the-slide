import React from 'react';
import { Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import Landing from './components/Landing';
import Header from './components/Header';
import Slide from './components/Slide';

const App = () => {
	return (
		<div className="App">
			<Router basename={process.env.PUBLIC_URL}>
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
			</Router>
		</div>		
	);
}

export default App;
