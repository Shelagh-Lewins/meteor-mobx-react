import React from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import PropTypes from 'prop-types';

import Info from './pages/Info.tsx';
import Env from './pages/Env.tsx';
import CounterView from './components/CounterView.tsx';

// each UI component is passed the entire relevant store, because it will make updating the component easier as new store properties are added

const App = observer(class App extends React.Component {
	render() {
		const { counterStore, linksStore, pageStore } = this.props.state; // eslint-disable-line react/destructuring-assignment, react/prop-types
		// get the reactive data from state
		const {
			comments,
			links,
		} = toJS(linksStore);

		// construct nested data for components
		// this seems more efficient than running a filter for each link
		const CommentsByLink = {};
		comments.forEach((comment) => {
			if (!CommentsByLink[comment.linkId]) {
				CommentsByLink[comment.linkId] = [];
			}

			CommentsByLink[comment.linkId].push(comment);
		});

		const linksWithComments = links.map((link) => {
			const newLink = { ...link, 'comments': [] }; // this is shallow copy

			if (CommentsByLink[link._id]) {
				newLink.comments = CommentsByLink[link._id].sort((a, b) => new Date(b.date) - new Date(a.date));
			}

			return newLink;
		});

		// sort on the client as this is a UI decision
		linksWithComments.sort((a, b) => {
			if (a.text < b.text) {
				return -1;
			}
			if (a.text > b.text) {
				return 1;
			}
			return 0;
		});

		// pass the data to components
		return (
			<div>
				<h1>Welcome to Meteor!</h1>
				<p>This text app explores a range of technologies in combination.</p>
				<CounterView store={counterStore} />
				<h2>Links</h2>
				<Info
					linksWithComments={linksWithComments}
					store={toJS(linksStore)}
				/>
				<Env store={pageStore} />
			</div>
		);
	}
});

App.propTypes = {
	'state': PropTypes.objectOf(PropTypes.any).isRequired,
};

export default App;
