import React from 'react';

const Home: React.FunctionComponent = () => {
	const items = [
		'Meteor',
		'Mobx',
		'React',
		'TypeScript',
		'Material UI',
		'React router',
	];

	makeItem = (item: string) => (
		<li key={item}>{item}</li>
	);

	return (
		<div className="panel">
			<h2>Welcome to the Meteor-Mobx-React demo</h2>
			<p>This app demonstrates the following technologies working together:</p>
			<ul>
				{items.map((item) => makeItem(item))}
			</ul>
			<p>Click the menu items to see different uses of Mobx state.</p>
			<p>React context is used to pass the Mobx store to components without prop chaining.</p>
		</div>
	);
};

export default Home;
