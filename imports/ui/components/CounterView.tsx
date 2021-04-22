import React, { useContext } from 'react';
import { observer } from 'mobx-react';

import StoreContext from '../../api/client/storeContext.tsx';
import CounterButton from './CounterButton.tsx';

const CounterView: React.FunctionComponent = () => {
	const storeContext = useContext(StoreContext);

	const {
		count,
	} = storeContext.counterStore;

	return (
		<div className="panel">
			<h2>Counter</h2>
			<p>This section demonstrates a simple client-only interaction with the Mobx store.</p>
			<p>The counter value is taken from the Mobx Counter store. Click either button to increment the count.</p>
			<div>Count: {count}</div>
			<CounterButton text="Click me first!" />
			<CounterButton text="No, click me!" />
		</div>
	);
};

export default observer(CounterView);
