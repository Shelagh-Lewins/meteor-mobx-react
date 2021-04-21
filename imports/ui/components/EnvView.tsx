import React from 'react';
import PropTypes, { InferProps } from 'prop-types';

type ownPropTypes = InferProps<Env.propTypes>;

const EnvView: React.FunctionComponent = ({ store }: ownPropTypes) => {
	const { myEnvVar } = store;

	return (
		<div className="panel">
			<h2>Environment variable</h2>
			<p>This section demonstrates loading an environment variable and storing it in the Mobx state.</p>
			<p>The environment variable is specified in a file .env on the server and loaded into the Mobx Page store by calling a Meteor method at startup.</p>
			<p>Value of MY_ENV_VAR: &quot;{myEnvVar}&quot;</p>
		</div>
	);
};

EnvView.propTypes = {
	'store': PropTypes.shape({
		'myEnvVar': PropTypes.string,
	}).isRequired,
};

export default EnvView;
