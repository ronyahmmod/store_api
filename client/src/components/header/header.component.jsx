import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './header.style.scss';

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
				<Link to="/" className="navbar-brand">
					Store Management System
				</Link>
			</nav>
		);
	}
}

export default Header;
