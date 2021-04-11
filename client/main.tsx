import { render } from 'react-dom';

import renderRoutes from '../imports/startup/client/routes.tsx';
import RootStore from '../imports/api/client/RootStore.tsx';

Meteor.startup(() => {
	const state = new RootStore();
	render(renderRoutes(state), document.getElementById('react-target'));
});
