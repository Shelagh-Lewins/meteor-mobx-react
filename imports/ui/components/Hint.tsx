import React from 'react';
import {
	Box,
	createMuiTheme,
	Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes, { InferProps } from 'prop-types';
import InfoIcon from '@material-ui/icons/Info';

const theme = createMuiTheme();

const useStyles = makeStyles({
	'root': {
		'opacity': 0.7,
		'margin': theme.spacing(1, 0),
		'& p': {
			'margin-left': theme.spacing(1),
		},
	},
});

type ownPropTypes = InferProps<CounterView.propTypes>;

const Hint: React.FunctionComponent = ({ text }: ownPropTypes) => {
	const classes = useStyles();

	return (
		<Box alignItems="center" display="flex" className={classes.root}>
			<Box>
				<InfoIcon />
			</Box>
			<Box>
				<Typography>{text}</Typography>
			</Box>
		</Box>
	);
};

// with Typescript validation we theoretically don't need PropTypes, but they can catch missing values at runtime e.g. because of a data issue
Hint.propTypes = {
	'text': PropTypes.string.isRequired,
};

export default Hint;