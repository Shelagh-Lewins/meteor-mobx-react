import React from 'react';
import { observer } from 'mobx-react-lite';
import PropTypes, { InferProps } from 'prop-types';
import CounterButton from './CounterButton.tsx';

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
			<h2>Counter</h2>
			<p>The counter value is taken from the Mobx store. You can click any button.</p>
			<div>Count: {count}</div>
			<CounterButton store={store} text="Click me first!" />
			<CounterButton store={store} text="No, click me!" />
		</div>
	);
};

// with Typescript validation we theoretically don't need PropTypes, but they can catch missing values at runtime e.g. because of a data issue
CounterView.propTypes = {
	'store': PropTypes.shape({
		'count': PropTypes.number,
	}).isRequired,
};

export default observer(CounterView);
