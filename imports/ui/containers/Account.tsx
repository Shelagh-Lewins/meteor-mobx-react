import React, { useContext } from 'react';
import { observer } from 'mobx-react';
import {
	createMuiTheme,
	Divider,
	Grid,
	makeStyles,
	Typography,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import ResendVerificationEmailButton from '../components/ResendVerificationEmailButton.tsx';
import LogoutButton from '../components/LogoutButton.tsx';
import StoreContext from '../../api/client/storeContext.tsx';
import VerifyEmailForm from '../forms/VerifyEmailForm.tsx';
import ChangePasswordForm from '../forms/ChangePasswordForm.tsx';

const theme = createMuiTheme();

const useStyles = makeStyles({
	'root': {
		'display': 'flex',
	},
	'error': {
		'color': theme.palette.error.main,
	},
	'success': {
		'color': theme.palette.success.main,
	},
});

const Account: React.FunctionComponent = () => {
	const storeContext = useContext(StoreContext);

	const {
		isEmailVerified,
		isLoggedIn,
		user,
		usersLoading,
	} = storeContext.usersStore;

	const classes = useStyles();

	const makeIcon = () => {
		if (isEmailVerified) {
			return <CheckIcon className={classes.success} />;
		}

		return <CloseIcon className={classes.error} />;
	};

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
					<Typography variant="h3">Account</Typography>
					<Typography variant="body1" paragraph>Username: {user && user.username}</Typography>
					<Typography variant="body1" paragraph>Email address: {user && user.emails[0].address}</Typography>
					<Typography variant="body1" paragraph className={classes.root}>Email status: {isEmailVerified ? 'verified' : 'unverified'}{makeIcon()}</Typography>
				</Grid>
				{!isEmailVerified && (
					<>
						<Grid item xs={12}>
							<Divider />
							<Typography variant="h4">Verify your email address</Typography>
						</Grid>
						<VerifyEmailForm />
						<Grid item xs={12}>
							<Typography variant="body1" paragraph>If you have not received an email with a verification token, check your Junk email folder.</Typography>
							<Typography variant="body1" paragraph>You can request a new email by clicking the button below.</Typography>
							<ResendVerificationEmailButton />
						</Grid>
					</>
				)}
				<Grid item xs={12}>
					<Divider />
					<Typography variant="h4">Security</Typography>
				</Grid>
				<ChangePasswordForm />
				<Grid item xs={12}>
					<Divider />
				</Grid>
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
