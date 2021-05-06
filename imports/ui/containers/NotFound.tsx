import React from 'react';
import {
	Grid,
	Typography,
} from '@material-ui/core';

const NotFound: React.FunctionComponent = () => (
	<div className="panel">
		<Grid container spacing={3}>
			<Grid item xs={12}>
				<Typography variant="h3">Page not found</Typography>
			</Grid>
		</Grid>
	</div>
);

export default NotFound;
