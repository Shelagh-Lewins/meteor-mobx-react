import React from 'react';
import {
	Typography,
} from '@material-ui/core';

const Home: React.FunctionComponent = () => {
	const items = [
		'Meteor',
		'Mobx',
		'React',
		'React router',
		'React hook form',
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
			<Typography paragraph>This app demonstrates the following technologies working together:</Typography>
			<ul>
				{items.map((item) => makeItem(item))}
			</ul>
			<Typography paragraph>Click the menu items to see different uses of Mobx state.</Typography>
			<Typography paragraph>React context is used to pass the Mobx store to components without prop chaining.</Typography>
			<Typography paragraph>The Reactive Data Manager which loads data from the Mongo database has been adapted from <a href="https://medium.com/@swalta/adventures-with-react-mobx-and-meteor-605a133460b3#.530jkvrkw" target="_blank" rel="noreferrer">Tom Swales&apos; example</a>.</Typography>
			<Typography paragraph>The demo app includes a complete basic implementation of Meteor Accounts, with create account, login, email verification, change password and reset password. Meteor.user() information is passed into the store so that the UI components do not need to be aware of Meteor.</Typography>
		</div>
	);
};

export default Home;
