import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.scss';
import Landing from './components/Landing';
import Header from './components/Header';
import Slide from './components/Slide';

const App = () => {
	return (
		<Router>
			<div className="App">
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
			</div>		
		</Router>
	);
}

export default App;
