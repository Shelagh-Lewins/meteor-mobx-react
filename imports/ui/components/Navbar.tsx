import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
	'root': {
		'flexGrow': 1,
	},
	'menuButton': {
		'marginRight': theme.spacing(2),
	},
	'navLink': {
		'color': 'inherit',
		'flexGrow': 1,
		'opacity': 0.7,
		'textDecoration': 'inherit',
	},
	'active': {
		'opacity': 1,
	},
}));

const Navbar: React.FunctionComponent = () => {
	const location = useLocation();
	const classes = useStyles();

	const menuItems = [
		{ 'text': 'Home', 'path': '/' },
		{ 'text': 'Reactive data', 'path': '/reactive-data' },
		{ 'text': 'Simple state', 'path': '/simple-state' },
		{ 'text': 'Environment variable', 'path': '/env-var' },
	];

	// the NavLink component adds "active" class but this is not compatible with Material UI. By using Link and adding "active" with makeStyles, we keep all navbar styling in this file
	const makeNavLink = ({
		text,
		path,
	}: {
		'text': string,
		'path': string,
	}) => (
		<Link to={path} key={path} className={`${classes.navLink} ${location.pathname === path ? classes.active : ''}`}><Typography variant="h6">{text}</Typography></Link>
	);

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					{menuItems.map((item) => makeNavLink(item))}
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default Navbar;
