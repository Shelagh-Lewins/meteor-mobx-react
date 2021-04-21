import { render } from 'react-dom';

import renderApp from '../imports/ui/App.tsx';
import RootStore from '../imports/api/client/RootStore.tsx';

Meteor.startup(() => {
	const state = new RootStore();
	render(renderApp(state), document.getElementById('react-target'));
});
