import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/header/header.component';
import Login from './pages/login/login.page';
import './App.scss';

function App() {
	return (
		<div className="App" style={{ marginTop: '80px' }}>
			<Header />
			<Switch>
				<Route exact path="/" component={Login} />
			</Switch>
		</div>
	);
}

export default App;
