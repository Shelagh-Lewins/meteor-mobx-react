import React, { useState } from 'react';

const Env: React.FunctionComponent = () => {
	const [envVar, setEnvVar] = useState('');

	Meteor.call('env.get_MY_ENV_VAR', (error, result) => {
		setEnvVar(result);
	});

	return (
		<div className="panel">
			<h2>Display an environment variable</h2>
			<p>Thie environment variable is specified in a file .env on the server and loaded in this component by a Method call.</p>
			<p>Value of MY_ENV_VAR: &quot;{envVar}&quot;</p>
		</div>
	);
};

export default Env;
