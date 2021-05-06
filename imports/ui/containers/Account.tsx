import React, { useContext } from 'react';
import { observer } from 'mobx-react';
import {
	Grid,
	Typography,
} from '@material-ui/core';
import ResendVerificationEmailButton from '../components/ResendVerificationEmailButton.tsx';
import LogoutButton from '../components/LogoutButton.tsx';
import StoreContext from '../../api/client/storeContext.tsx';
import VerifyEmailForm from '../forms/VerifyEmailForm.tsx';

const Account: React.FunctionComponent = () => {
	const storeContext = useContext(StoreContext);

	const {
		isEmailVerified,
		isLoggedIn,
		user,
		usersLoading,
	} = storeContext.usersStore;

	const makePanelContent = () => {
		if (usersLoading) {
			return <div>Loading data...</div>;
		}

		if (!isLoggedIn) {
			return <div>No user is logged in</div>;
		}

		return (
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Typography variant="h3">{user && user.username}</Typography>
					<p>Manage your account here.</p>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="body1" paragraph>Email status: {isEmailVerified ? 'verified' : 'unverified'}</Typography>
				</Grid>
				{!isEmailVerified && (
					<>
						<VerifyEmailForm />
						<Grid item xs={12}>
							<Typography variant="body1" paragraph>If you have not received an email with a verification token, check your Junk email folder.</Typography>
							<Typography variant="body1" paragraph>You can request a new email by clicking the button below.</Typography>
							<ResendVerificationEmailButton />
						</Grid>
					</>
				)}
				<Grid item xs={12}>
					<LogoutButton />
				</Grid>
			</Grid>
		);
	};

	return (
		<div className="panel">
			{makePanelContent()}
		</div>
	);
};

export default observer(Account);
