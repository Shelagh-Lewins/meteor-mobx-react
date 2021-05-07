import React from 'react';

const PrintView: React.FunctionComponent = () => (
	<div className="panel">
		<h2>Printer friendly view</h2>
		<p>This page can be printed without including the Navigation Bar or alerts.</p>
		<p>Other routes use a container component that adds the Navigation bar, alerts and progress indicator. This route demonstrates how to use a different container for a route.</p>

	</div>
);

export default PrintView;
