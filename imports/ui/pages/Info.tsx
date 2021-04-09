import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { Link } from '../../api/Links/links.ts';

type ownPropTypes = InferProps<CounterView.propTypes>;

const Info: React.FunctionComponent = ({ links, linksLoading }: ownPropTypes) => {
	const makeLink = (link: Link) => (
		<li key={link._id}>
			<a href={link.url} target="_blank" rel="noreferrer">{link.title}</a>
		</li>
	);

	return (
		<div className="panel">
			<h2>Learn Meteor!</h2>
			{!linksLoading && <ul>{links.map(makeLink)}</ul>}
			{linksLoading && <div>Loading data...</div>}
		</div>
	);
};

Info.propTypes = {
	'links': PropTypes.arrayOf(PropTypes.any).isRequired,
	'linksLoading': PropTypes.bool.isRequired,
};

export default Info;
