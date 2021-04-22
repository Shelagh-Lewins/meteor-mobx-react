import React from 'react';
import EnvView from '../components/EnvView.tsx';

const EnvVar: React.FunctionComponent = () => (
	<div className="panel">
		<h2>Environment variable</h2>
		<EnvView />
	</div>
);

export default EnvVar;
