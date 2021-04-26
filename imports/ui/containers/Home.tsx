import React from 'react';

const Home: React.FunctionComponent = () => {
	const items = [
		'Meteor',
		'Mobx',
		'React',
		'React router',
		'TypeScript',
		'Material UI',
		'SCSS',
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
			<p>The Reactive Data Manager which loads data from the Mongo database has been adapted from <a href="https://medium.com/@swalta/adventures-with-react-mobx-and-meteor-605a133460b3#.530jkvrkw" target="_blank" rel="noreferrer">Tom Swales&apos; example</a>.</p>
		</div>
	);
};

export default Home;
