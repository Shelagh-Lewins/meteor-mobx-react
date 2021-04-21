import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import AddCircle from '@material-ui/icons/AddCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import LinksContext from '../../api/client/linksContext.tsx';

import { LinkInterface } from '../../api/Links/links.ts';

const LinksView: React.FunctionComponent = () => {
	const linksContext = useContext(LinksContext);

	const {
		addCommentFilterValue,
		addLink,
		linksLoading,
		linksWithComments,
		showCommentsMap,
		toggleShowComments,
	} = linksContext;

	handleClick = (linkId: string) => {
		addCommentFilterValue(linkId);
		toggleShowComments(linkId);
	};

	const makeLink = (link: LinkInterface) => {
		const showComments = showCommentsMap.get(link._id);
		const buttonIcon = showComments ? <RemoveCircle /> : <AddCircle />;
		return (
			<li key={link._id}>
				<a href={link.url} target="_blank" rel="noreferrer">{link.title}</a>
				<Button onClick={() => handleClick(link._id)} title={showComments ? 'Hide comments' : 'Show comments'}>{buttonIcon}</Button>
				{showComments && (
					<ul>
						{link.comments.map((comment) => <li key={comment._id}>{comment.text}</li>)}
					</ul>
				)}
			</li>
		);
	};

	return (
		<div className="panel">
			<h2>Links</h2>
			<p>This section demonstrates loading reactive data from the MongoDB database.</p>
			<p>The links and comments collections are loaded from the database into the Mobx Links store. Nested data (comments on each link) are computed in the Mobx store.</p>
			<p>Store data, actions and getters are provided to React components via the React context to avoid prop chaining.</p>
			<p>A Meteor method is used to add new links.</p>
			{!linksLoading && <ul>{linksWithComments.map(makeLink)}</ul>}
			{linksLoading && <div>Loading data...</div>}
			<Button onClick={() => addLink({ 'title': 'New dummy link', 'url': '#' })} variant="contained" color="secondary" title="Add link">Add link</Button>
		</div>
	);
};

export default LinksView;
