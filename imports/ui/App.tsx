import React from 'react';
import { observer } from 'mobx-react';
import { computed, toJS } from 'mobx';
import PropTypes from 'prop-types';

import Info from './pages/Info.tsx';
import Env from './pages/Env.tsx';
import CounterView from './components/CounterView.tsx';
import CounterStore from '../api/client/CounterStore.tsx';

const store = new CounterStore();

const App = observer(class App extends React.Component {
	handleAddClick() {
		// this.props.route.state.addExample();
	}

	render() {
		const {
			addCommentFilterValue,
			comments,
			links,
			linksLoading,
			showCommentsMap,
			toggleShowComments,
		} = toJS(this.props.state); // eslint-disable-line react/destructuring-assignment, react/prop-types

		// construct nested data for components
		// this seems more efficient than running a filter for each link to find the associated comments
		const CommentsByLink = {};
		comments.forEach((comment) => {
			if (!CommentsByLink[comment.linkId]) {
				CommentsByLink[comment.linkId] = [];
			}

			CommentsByLink[comment.linkId].push(comment);
		});

		const linksWithComments = links.map((link) => {
			const newLink = { ...link, 'comments': [] }; // note this is shallow copy!

			if (CommentsByLink[link._id]) {
				newLink.comments = CommentsByLink[link._id];
			}

			return newLink;
		});

		return (
			<div>
				<h1>Welcome to Meteor!</h1>
				<p>This text app explores a range of technologies in combination.</p>
				<CounterView store={store} />
				<h2>Links</h2>
				<Info
					addCommentFilterValue={addCommentFilterValue}
					comments={comments}
					linksLoading={linksLoading}
					linksWithComments={linksWithComments}
					showCommentsMap={showCommentsMap}
					toggleShowComments={toggleShowComments}
				/>
				<Env />
			</div>
		);
	}
});

App.propTypes = {
	'state': PropTypes.objectOf(PropTypes.any).isRequired,
};

export default App;
