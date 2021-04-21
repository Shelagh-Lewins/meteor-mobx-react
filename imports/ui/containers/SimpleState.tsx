import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import CounterView from '../components/CounterView.tsx';

// here we are prop chaining to pass the store down to child components
// we could use React context instead

type ownPropTypes = InferProps<CounterView.propTypes>;

const SimpleState: React.FunctionComponent = ({ store }: ownPropTypes) => (
	<div className="panel">
		<CounterView store={store} />
	</div>
);

// with Typescript validation we theoretically don't need PropTypes, but they can catch missing values at runtime e.g. because of a data issue
SimpleState.propTypes = {
	'store': PropTypes.shape({
		'count': PropTypes.number,
	}).isRequired,
};

export default SimpleState;
