import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { LinksCollection, Link } from '../api/links.ts';

const Info: React.FunctionComponent = () => {
	const links = useTracker(() => LinksCollection.find().fetch());

	const makeLink = (link: Link) => (
		<li key={link._id}>
			<a href={link.url} target="_blank" rel="noreferrer">{link.title}</a>
		</li>
	);

	return (
		<div className="panel">
			<h2>Learn Meteor!</h2>
			<ul>{links.map(makeLink)}</ul>
		</div>
	);
};

export default Info;
