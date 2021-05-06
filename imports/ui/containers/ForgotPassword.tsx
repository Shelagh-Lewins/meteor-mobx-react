import React from 'react';
import {
	Typography,
} from '@material-ui/core';
import ForgotPasswordForm from '../forms/ForgotPasswordForm.tsx';

const ForgotPassword: React.FunctionComponent = () => (
	<div className="panel">
		<Typography variant="h3">Forgot password</Typography>
		<ForgotPasswordForm />
	</div>
);

export default ForgotPassword;
