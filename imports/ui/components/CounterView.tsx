import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import CounterButton from './CounterButton.tsx';

type ownPropTypes = InferProps<CounterView.propTypes>;

const CounterView: React.FunctionComponent = ({ store }: ownPropTypes) => {
	const { count } = store;

	handleClick = () => {
		store.increaseCounter(); // keep 'this' context
	};

	return (
		<div className="panel">
			<h2>Counter</h2>
			<p>This section demonstrates a simple client-only interaction with the Mobx store.</p>
			<p>The counter value is taken from the Mobx Counter store. Click either button to increment the count.</p>
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

export default CounterView;
