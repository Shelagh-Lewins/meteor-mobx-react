import React from 'react';
// import { useTracker } from 'meteor/react-meteor-data';

import PropTypes, { InferProps } from 'prop-types';
import { Link } from '../api/Links/links.ts';

type ownPropTypes = InferProps<CounterView.propTypes>;

const Info: React.FunctionComponent = ({ links }: ownPropTypes) => {
	// const links = useTracker(() => Links.find().fetch());

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

Info.propTypes = {
	'links': PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Info;
