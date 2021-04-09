import { render } from 'react-dom';

import renderRoutes from '../imports/startup/client/routes.tsx';
import AppState from './AppState';

Meteor.startup(() => {
	const state = new AppState();
	render(renderRoutes(state), document.getElementById('react-target'));
});
