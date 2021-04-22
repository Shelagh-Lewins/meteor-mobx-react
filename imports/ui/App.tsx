import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from 'react-router-dom';
import { observer } from 'mobx-react';

import Navbar from './components/Navbar.tsx';
import Home from './containers/Home.tsx';
import SimpleState from './containers/SimpleState.tsx';
import ReactiveData from './containers/ReactiveData.tsx';
import EnvVar from './containers/EnvVar.tsx';

import { StoreProvider } from '../api/client/storeContext.tsx';

const DefaultContainer: React.FunctionComponent = observer(({ state }: ownPropTypes) => (
	<StoreProvider value={state}>
		<div className="app-container">
			<Navbar	/>
			<div className="main-container">
				<Route exact path="/reactive-data" component={ReactiveData} />
				<Route exact path="/simple-state" component={SimpleState} />
				<Route exact path="/env-var" component={EnvVar} />
			</div>
		</div>
	</StoreProvider>
));

// do not provide context
// this just demonstrates using different containers
const HomeContainer: React.FunctionComponent = () => (
	<div className="app-container">
		<Navbar	/>
		<div className="main-container">
			<Home />
		</div>
	</div>
);

const renderApp = (state: Class): void => (
	<Router>
		<Switch>
			<Route exact path="/" component={HomeContainer} />
			<Route render={() => <DefaultContainer state={state} />} />
		</Switch>
	</Router>
);

export default renderApp;
