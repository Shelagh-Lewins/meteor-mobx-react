import React from 'react';
import { Link } from 'react-router-dom';
import {
	Grid,
	Typography,
} from '@material-ui/core';
import LoginForm from '../forms/LoginForm.tsx';

const Login: React.FunctionComponent = () => (
	<div className="panel">
		<Grid container spacing={3}>
			<Grid item xs={12}>
				<Typography variant="h3">Login</Typography>
			</Grid>
			<LoginForm />
			<Grid item xs={12}>
				<Link to="/forgot-password"><Typography variant="body1" paragraph>Forgot your password?</Typography></Link>
			</Grid>
		</Grid>
	</div>
);

export default Login;
