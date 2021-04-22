import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';

import StoreContext from '../../api/client/storeContext.tsx';

const EnvView: React.FunctionComponent = () => {
	const storeContext = useContext(StoreContext);

	const {
		myEnvVar,
	} = storeContext.pageStore;

	return (
		<div className="panel">
			<h2>Environment variable</h2>
			<p>This section demonstrates loading an environment variable and storing it in the Mobx state.</p>
			<p>The environment variable is specified in a file .env on the server and loaded into the Mobx Page store by calling a Meteor method at startup.</p>
			<p>Value of MY_ENV_VAR: &quot;{myEnvVar}&quot;</p>
		</div>
	);
};

export default observer(EnvView);
