// spinner to show when waiting for an aysync response such as login

import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme: Theme) => createStyles({
	'root': {
		'float': 'left',
		'left': '50%',
		'position': 'sticky',
		'top': '200px',
		'z-index': 200,
	},
	'spinner': {
		'left': '-50%',
		'position': 'relative',
	},
}));

const WaitingView: React.FunctionComponent = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<CircularProgress className={classes.spinner} />
		</div>
	);
};

export default WaitingView;
