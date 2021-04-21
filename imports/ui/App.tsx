import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from 'react-router-dom';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';

// route components
import Navbar from './components/Navbar.tsx';
import Home from './containers/Home.tsx';
import SimpleState from './containers/SimpleState.tsx';
import ReactiveData from './containers/ReactiveData.tsx';
import EnvVar from './containers/EnvVar.tsx';

import { LinksProvider } from '../api/client/linksContext.tsx';

const DefaultContainer: React.FunctionComponent = observer(({ state }: ownPropTypes) => {
	const { counterStore, linksStore, pageStore } = state; // pass the data to components

	// build the React context to supply links data (provided by the MongoDB database) to any child component
	// ideally we would pass state directly as context, but then each component would need to convert values to JS.
	// I prefer to keep all knowledge of the Mobx store's internal workings here at the top of the component tree.
	// however BE WARNED this will likely interfere with context

	// simple values
	const {
		linksLoading,
		showCommentsMap,
	} = toJS(linksStore);

	// actions and getters
	const {
		addCommentFilterValue,
		addLink,
		linksWithComments,
		toggleShowComments,
	} = linksStore;

	const linksContext = {
		linksLoading,
		showCommentsMap,
		addCommentFilterValue,
		addLink,
		linksWithComments,
		toggleShowComments,
	};

	return (
		<LinksProvider value={linksContext}>
			<div className="app-container">
				<Navbar	/>
				<div className="main-container">
					<Route exact path="/" component={Home} />
					<Route exact path="/reactive-data" component={ReactiveData} />
					<Route exact path="/simple-state" render={() => <SimpleState store={counterStore} />} />
					<Route exact path="/env-var" render={() => <EnvVar store={pageStore} />} />
				</div>
			</div>
		</LinksProvider>
	);
});

// This construction allows us to use different containers for different groups of routers, for example a print-friendly view would not show menus
const renderApp = (state: Class): void => (
	<Router>
		<Switch>
			<Route render={() => <DefaultContainer state={state} />} />
		</Switch>
	</Router>
);

export default renderApp;
