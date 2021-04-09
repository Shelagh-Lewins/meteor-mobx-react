//import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
//import App from '../imports/ui/App.tsx';

import renderRoutes from '../imports/startup/client/routes.tsx';
import AppState from './AppState';

Meteor.startup(() => {
	// render(<App />, document.getElementById('react-target'));

	const state = new AppState();
	render(renderRoutes(state), document.getElementById('react-target'));
});
