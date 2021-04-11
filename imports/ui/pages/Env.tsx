import React from 'react';
import PropTypes, { InferProps } from 'prop-types';

type ownPropTypes = InferProps<Env.propTypes>;

const Env: React.FunctionComponent = ({ store }: ownPropTypes) => {
	const { myEnvVar } = store;

	return (
		<div className="panel">
			<h2>Display an environment variable</h2>
			<p>Thie environment variable is specified in a file .env on the server and loaded by a Method call.</p>
			<p>Value of MY_ENV_VAR: &quot;{myEnvVar}&quot;</p>
		</div>
	);
};

Env.propTypes = {
	'store': PropTypes.shape({
		'myEnvVar': PropTypes.string,
	}).isRequired,
};

export default Env;
