import React from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from '@material-ui/core';
import PropTypes, { InferProps } from 'prop-types';

type ownPropTypes = InferProps<CounterView.propTypes>;

// A function component wrapped with `observer` will react
// to any future change in an observable it used before.
const CounterView: React.FunctionComponent = ({ store }: ownPropTypes) => {
	const { count } = store;

	handleClick = () => {
		store.increaseCounter(); // keep 'this' context
	};

	return (
		<div className="panel">
			<h2>Mobx test</h2>
			<div>Count: {count}</div>
			<Button onClick={handleClick} variant="contained" color="primary">Add to count</Button>
		</div>
	);
};

// with Typescript validation we theoretically don't need PropTypes, but they can catch missing values at runtime e.g. because of a data issue
CounterView.propTypes = {
	'store': PropTypes.shape({
		'count': PropTypes.number,
		'increaseCounter': PropTypes.func,
	}).isRequired,
};

export default observer(CounterView);
