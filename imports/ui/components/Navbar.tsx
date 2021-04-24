import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
	'root': {
		'flexGrow': 1,
	},
	'toolbar': {
		'display': 'flex',
		'flexGrow': 1,
		[theme.breakpoints.down('sm')]: {
			'display': 'none',
		},
	},
	'toolbarOpen': {
		[theme.breakpoints.down('sm')]: {
			'display': 'block',
			'padding': 0,
		},
	},
	'menuButton': {
		'display': 'none',
		'marginRight': theme.spacing(2),
		[theme.breakpoints.down('sm')]: {
			'display': 'inline-block',
		},
	},
	'navLink': {
		'color': 'inherit',
		'flexGrow': 1,
		'display': 'inline-block',
		'opacity': 0.7,
		'textDecoration': 'inherit',
		'width': '100%',
		[theme.breakpoints.down('sm')]: {
			'backgroundColor': '#fff',
			'color': '#666',
			'width': '100%',
		},
	},
	'active': {
		'opacity': 1,
	},
}));

const Navbar: React.FunctionComponent = () => {
	const location = useLocation();
	const classes = useStyles();
	const [menuOpen, setMenuOpen] = useState(false);

	const menuItems = [
		{ 'text': 'Home', 'path': '/' },
		{ 'text': 'Reactive data', 'path': '/reactive-data' },
		{ 'text': 'Simple state', 'path': '/simple-state' },
		{ 'text': 'Environment variable', 'path': '/env-var' },
	];

	toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

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

	const makeMenuButton = () => (
		<Box display="flex" flexDirection="row-reverse">
			<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => toggleMenu()}>
				<MenuIcon />
			</IconButton>
		</Box>
	);

	return (
		<div className={classes.root}>
			<AppBar position="static">
				{makeMenuButton()}
				<Toolbar className={`${classes.toolbar} ${menuOpen ? classes.toolbarOpen : ''}`}>
					{menuItems.map((item) => makeNavLink(item))}
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default Navbar;
