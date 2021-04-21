import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar: React.FunctionComponent = () => {
	const thing = 1;

	return (
		<ul>
			<li><NavLink to="/">Home</NavLink></li>
			<li><NavLink to="/reactive-data">Reactive data</NavLink></li>
			<li><NavLink to="/simple-state">Simple state</NavLink></li>
			<li><NavLink to="/env-var">Environment variable</NavLink></li>
		</ul>
	);
};

export default Navbar;
