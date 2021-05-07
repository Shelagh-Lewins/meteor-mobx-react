import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';

import StoreContext from '../../api/client/storeContext.tsx';

const EnvView: React.FunctionComponent = () => {
	const storeContext = useContext(StoreContext);

	const {
		myEnvVar,
	} = storeContext.pageStore;

	return (
		<>
			<p>This section demonstrates loading an environment variable and storing it in the Mobx state.</p>
			<p>The environment variable must be specified in a file .env on the server; see .env-template for details of how to create the file. The example environment variable is loaded into the Mobx Page store by calling a Meteor method at startup.</p>
			<p>Value of MY_ENV_VAR: &quot;{myEnvVar}&quot;</p>
		</>
	);
};

export default observer(EnvView);
