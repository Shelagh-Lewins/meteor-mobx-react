import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
	AppBar,
	Box,
	IconButton,
	Toolbar,
	Typography,
} from '@material-ui/core';
import { observer } from 'mobx-react';

import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import PrintIcon from '@material-ui/icons/Print';
import StoreContext from '../../api/client/storeContext.tsx';

const useStyles = makeStyles((theme) => ({
	'root': {
		'flexGrow': 1,
	},
	'menuDesktop': {
		'display': 'flex',
		'flexGrow': 1,
		'maxWidth': '600px',
		[theme.breakpoints.down('sm')]: {
			'display': 'none',
		},
	},
	'menuMobile': {
		'backgroundColor': '#fff',
		'display': 'none',
		[theme.breakpoints.up('md')]: {
			'display': 'none',
		},
		'& a': {
			'color': '#000',
			'width': '100%',
		},
	},
	'menuOpen': {
		[theme.breakpoints.down('sm')]: {
			'display': 'block',
			'padding': theme.spacing(1),
		},
	},
	'toolbarLeft': {
	},
	'toolbarRight': {
		'display': 'flex',
		'marginLeft': 'auto',
	},
	'homeButton': {
		'marginRight': theme.spacing(2),
	},
	'menuButton': {
		'display': 'none',
		[theme.breakpoints.down('sm')]: {
			'display': 'inline-block',
		},
	},
	'printButton': {
		'marginRight': theme.spacing(2),
	},
	'navLink': {
		'color': 'inherit',
		'flexGrow': 1,
		'display': 'inline-block',
		'opacity': 0.7,
		'textDecoration': 'inherit',
	},
	'active': {
		'opacity': 1,
	},
}));

const Navbar: React.FunctionComponent = () => {
	const storeContext = useContext(StoreContext);

	const {
		isLoggedIn,
		user,
		usersLoading,
	} = storeContext.usersStore;

	const location = useLocation();
	const classes = useStyles();
	const [menuOpen, setMenuOpen] = useState(false);

	const demoMenuItems = [
		{ 'text': 'Reactive data', 'path': '/reactive-data' },
		{ 'text': 'Simple state', 'path': '/simple-state' },
		{ 'text': 'Environment variable', 'path': '/env-var' },
	];

	const accountMenuItems = [
		{ 'text': 'Register', 'path': '/register' },
		{ 'text': 'Login', 'path': '/login' },
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

	const makeHomeButton = () => (
		<IconButton
			aria-label="home"
			color="inherit"
			component={Link}
			edge="start"
			to="/"
		>
			<HomeIcon />
		</IconButton>
	);

	const makeMenuButton = () => (
		<IconButton
			aria-label="menu"
			className={classes.menuButton}
			color="inherit"
			edge="end"
			onClick={() => toggleMenu()}
		>
			<MenuIcon />
		</IconButton>
	);

	const makePrintButton = () => (
		<IconButton
			aria-label="print view"
			color="inherit"
			component={Link}
			to="/print-view"
		>
			<PrintIcon />
		</IconButton>
	);

	const makeAuthLinks = () => {
		if (usersLoading) {
			return;
		}

		if (isLoggedIn) {
			return makeNavLink({
				'text': user ? user.username : '',
				'path': 'account',
			});
		}

		return accountMenuItems.map((item) => makeNavLink(item));
	};

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Box display="flex" flexDirection="row">
					<Toolbar className={classes.toolbarLeft}>
						{makeHomeButton()}
						{makePrintButton()}
					</Toolbar>
					<Toolbar className={classes.menuDesktop}>
						{demoMenuItems.map((item) => makeNavLink(item))}
					</Toolbar>
					<Toolbar className={classes.toolbarRight}>
						{makeAuthLinks()}
						{makeMenuButton()}
					</Toolbar>
				</Box>
				<Toolbar className={`${classes.menuMobile} ${menuOpen ? classes.menuOpen : ''}`}>
					{demoMenuItems.map((item) => makeNavLink(item))}
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default observer(Navbar);
