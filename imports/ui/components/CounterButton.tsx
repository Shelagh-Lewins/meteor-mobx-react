import React from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TouchApp from '@material-ui/icons/TouchApp';
import PropTypes, { InferProps } from 'prop-types';

// Material UI Hook API
const useStyles = makeStyles({
	'root': {
		'background': 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
		'border': 0,
		'borderRadius': 3,
		'boxShadow': '0 3px 5px 2px rgba(255, 105, 135, .3)',
		'color': 'white',
		'height': 48,
		'margin': '8px 8px 8px 0',
		'padding': '0 30px',
		'&:last-child': {
			'marginRight': 0,
		},
	},
});

type ownPropTypes = InferProps<CounterView.propTypes>;

// A function component wrapped with `observer` will react
// to any future change in an observable it used before.
const CounterButton: React.FunctionComponent = ({ store, text = 'Click me' }: ownPropTypes) => {
	const classes = useStyles();

	handleClick = () => {
		store.increaseCounter(); // keep 'this' context
	};

	return (
		<Button onClick={handleClick} className={classes.root}><TouchApp />{text}</Button>
	);
};

// with Typescript validation we theoretically don't need PropTypes, but they can catch missing values at runtime e.g. because of a data issue
CounterButton.propTypes = {
	'store': PropTypes.shape({
		'increaseCounter': PropTypes.func,
	}).isRequired,
	'text': PropTypes.string,
};

export default observer(CounterButton);
