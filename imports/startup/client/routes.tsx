import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from 'react-router-dom';

// route components
import App from '../../ui/App.tsx';
// import NotFound from '../../ui/components/NotFound.jsx';

const renderRoutes = (state: Class): void => (
	<Router>
		<Switch>
			<Route path="/" render={() => <App state={state} />} />
		</Switch>
	</Router>
);

export default renderRoutes;
