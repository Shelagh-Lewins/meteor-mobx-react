import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { Button } from '@material-ui/core';
import AddCircle from '@material-ui/icons/AddCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircle';

import { Link } from '../../api/Links/links.ts';

type ownPropTypes = InferProps<Info.propTypes>;

const Info: React.FunctionComponent = ({ linksWithComments, store }: ownPropTypes) => {
	const {
		addCommentFilterValue,
		linksLoading,
		showCommentsMap,
		toggleShowComments,
	} = store;

	handleClick = (linkId: string) => {
		addCommentFilterValue(linkId);
		toggleShowComments(linkId);
	};

	const makeLink = (link: Link) => {
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
			<h2>Learn Meteor!</h2>
			{!linksLoading && <ul>{linksWithComments.map(makeLink)}</ul>}
			{linksLoading && <div>Loading data...</div>}
		</div>
	);
};

Info.propTypes = {
	'store': PropTypes.shape({
		'addCommentFilterValue': PropTypes.func.isRequired,
		'linksLoading': PropTypes.bool.isRequired,
		'showCommentsMap': PropTypes.objectOf(PropTypes.any).isRequired,
		'toggleShowComments': PropTypes.func.isRequired,
	}).isRequired,
	'linksWithComments': PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Info;
