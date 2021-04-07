import React from 'react';
import Hello from './Hello.tsx';
import Info from './Info.tsx';
import Env from './Env.tsx';

const App: React.FunctionComponent = () => (
	<div>
		<h1>Welcome to Meteor!</h1>
		<Hello />
		<Info />
		<Env />
	</div>
);

export default App;
