import React from 'react';
import Hello from './Hello.tsx';
import Info from './Info.tsx';
import Env from './Env.tsx';
import CounterView from './Counter.tsx';
import CounterStore from '../api/client/CounterStore.tsx';

const store = new CounterStore();

const App: React.FunctionComponent = () => (
	<div>
		<h1>Welcome to Meteor!</h1>
		<CounterView store={store} />
		<Hello />
		<Info />
		<Env />
	</div>
);

export default App;
