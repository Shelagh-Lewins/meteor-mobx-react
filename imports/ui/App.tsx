import React from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import PropTypes from 'prop-types';

import Info from './pages/Info.tsx';
import Env from './pages/Env.tsx';
import CounterView from './components/CounterView.tsx';

import { LinksProvider } from '../api/client/linksContext.tsx';

// each UI component is passed the entire relevant store, because it will make updating the component easier as new store properties are added
const App: React.FunctionComponent = observer(({ state }: ownPropTypes) => {
	const { counterStore, linksStore, pageStore } = state; // pass the data to components

	// build the React context to supply links data (provided by the MongoDB database) to any child component
	// ideally we would pass state directly as context, but then each component would need to convert the simple values to JS.
	// I prefer to keep all knowledge of the Mobx store's internal workings here at the top of the component tree.

	// simple values
	const {
		linksLoading,
		showCommentsMap,
	} = toJS(linksStore);

	// actions and getters
	const {
		addCommentFilterValue,
		linksWithComments,
		toggleShowComments,
	} = linksStore;

	const linksContext = {
		linksLoading,
		showCommentsMap,
		addCommentFilterValue,
		linksWithComments,
		toggleShowComments,
	};

	return (
		<div>
			<h1>Welcome to the great test app!</h1>
			<p>This text app explores a range of technologies in combination: Meteor, React, Mobx, Typescript, Material UI.</p>
			<CounterView store={counterStore} />
			<h2>Links</h2>
			<LinksProvider value={linksContext}>
				<Info	/>
			</LinksProvider>
			<Env store={pageStore} />
		</div>
	);
});

App.propTypes = {
	'state': PropTypes.objectOf(PropTypes.any).isRequired,
};

export default App;
