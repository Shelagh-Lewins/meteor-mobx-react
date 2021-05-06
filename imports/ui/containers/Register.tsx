import React from 'react';
import {
	Grid,
	Typography,
} from '@material-ui/core';
import RegisterForm from '../forms/RegisterForm.tsx';

const Register: React.FunctionComponent = () => (
	<div className="panel">
		<Grid container spacing={3}>
			<Grid item xs={12}>
				<Typography variant="h3">Register</Typography>
			</Grid>
			<RegisterForm />
		</Grid>
	</div>
);

export default Register;
