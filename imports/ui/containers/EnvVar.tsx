import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import EnvView from '../components/EnvView.tsx';

// here we are prop chaining to pass the store down to child components
// we could use React context instead

type ownPropTypes = InferProps<CounterView.propTypes>;

const EnvVar: React.FunctionComponent = ({ store }: ownPropTypes) => (
	<div className="panel">
		<EnvView store={store} />
	</div>
);

// with Typescript validation we theoretically don't need PropTypes, but they can catch missing values at runtime e.g. because of a data issue
EnvVar.propTypes = {
	'store': PropTypes.shape({
		'count': PropTypes.number,
	}).isRequired,
};

export default EnvVar;
