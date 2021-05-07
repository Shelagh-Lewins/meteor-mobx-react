import React from 'react';
import {
	Typography,
} from '@material-ui/core';

const Home: React.FunctionComponent = () => {
	const items = [
		'Meteor v2.1',
		'Mobx v6.1.8',
		'React v17.0.2',
		'React router v5.2.0',
		'React hook form v7.3.4',
		'TypeScript v4.0.2',
		'Material UI v4.11.3',
		'SASS (using fourseven:scss@4.12.0)',
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
			<Typography paragraph>The Reactive Data Manager which loads data from the Mongo database has been adapted from <a href="https://medium.com/@swalta/adventures-with-react-mobx-and-meteor-605a133460b3#.530jkvrkw" target="_blank" rel="noreferrer">Tom Swales&apos; example</a>.</Typography>
			<Typography paragraph>React context is used to pass the Mobx store to components without prop chaining.</Typography>
			<Typography paragraph>The demo app includes a complete user management system based on Meteor Accounts and featuring:</Typography>
			<ul>
				<li>Create account</li>
				<li>Login</li>
				<li>Verify email</li>
				<li>Change password</li>
				<li>Reset password</li>
			</ul>
			<Typography paragraph>Meteor.user() information is passed into the Mobx store so that the React components do not need to be aware of Meteor.</Typography>
			<Typography paragraph>To enable email, add your email credentials to the Environment Variables file .env which you will need to create. See .env-template for more information. Make sure never to commit your credentials to source control.</Typography>
			<Typography paragraph>Created by Shelagh Lewins, &copy; May 2021.</Typography>
		</div>
	);
};

export default Home;
