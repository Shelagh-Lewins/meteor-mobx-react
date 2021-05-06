import React from 'react';
import { useParams } from 'react-router-dom';

import {
	Grid,
	Typography,
} from '@material-ui/core';

import ResetPasswordForm from '../forms/ResetPasswordForm.tsx';

const ResetPassword: React.FunctionComponent = () => {
	const { token } = useParams();

	return (
		<div className="panel">
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Typography variant="h3">Reset your password</Typography>
				</Grid>
				<ResetPasswordForm token={token} />
			</Grid>
		</div>
	);
};

export default ResetPassword;
