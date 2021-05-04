import React, { useEffect } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from 'react-router-dom';
import { observer } from 'mobx-react';
import { Tracker } from 'meteor/tracker';

import AlertView from './components/AlertView.tsx';
import Navbar from './components/Navbar.tsx';
import Home from './containers/Home.tsx';
import SimpleState from './containers/SimpleState.tsx';
import ReactiveData from './containers/ReactiveData.tsx';
import EnvVar from './containers/EnvVar.tsx';
import PrintView from './containers/PrintView.tsx';
import Register from './containers/Register.tsx';
import Login from './containers/Login.tsx';
import Account from './containers/Account.tsx';

import { StoreProvider } from '../api/client/storeContext.tsx';

const DefaultContainer: React.FunctionComponent = observer(({ state }: ownPropTypes) => {
	// this pattern uses the existing Meteor functionality to populate the Mobx store with data for the logged-in user
	// Meteor.user() is a global subscription so we cannot use the reactive data manager to tell when the subscription is ready, and Meteor.userId() may be set at page reload, not by a user action
	// The UI can now get all user data from the store and does not need to know about Meteor
	useEffect(() => {
		Tracker.autorun(() => {
			if (Accounts.loginServicesConfigured()) {
				state.usersStore.setUsersLoading(false);
			} else {
				state.usersStore.setUsersLoading(true);
			}

			if (Meteor.userId()) {
				state.usersStore.setUserId(Meteor.userId());
			} else {
				state.usersStore.clearUserId();
			}

			if (Meteor.user()) {
				state.usersStore.setUser(Meteor.user());
			} else {
				state.usersStore.clearUser();
			}
		});
	});

	return (
		<StoreProvider value={state}>
			<div className="app-container">
				<Navbar	/>
				<div className="main-container">
					{state.pageStore.alert && <AlertView />}
					<Route exact path="/" component={Home} />
					<Route exact path="/reactive-data" component={ReactiveData} />
					<Route exact path="/simple-state" component={SimpleState} />
					<Route exact path="/env-var" component={EnvVar} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/account" component={Account} />
				</div>
			</div>
		</StoreProvider>
	);
});

// this just demonstrates using different containers: this one does not provide context
const PrintContainer: React.FunctionComponent = () => (
	<div className="app-container">
		<div className="main-container">
			<PrintView />
		</div>
	</div>
);

const renderApp = (state: Class): void => (
	<Router>
		<Switch>
			<Route exact path="/print-view" component={PrintContainer} />
			<Route render={() => <DefaultContainer state={state} />} />
		</Switch>
	</Router>
);

export default renderApp;
