import React from 'react';
import Hello from './Hello.tsx';
import Info from './Info.tsx';

const App: React.FunctionComponent = () => (
	<div>
		<h1>Welcome to Meteor!</h1>
		<Hello />
		<Info />
	</div>
);

export default App;
