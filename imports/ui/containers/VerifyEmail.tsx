import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import {
	Typography,
} from '@material-ui/core';

import StoreContext from '../../api/client/storeContext.tsx';

const VerifyEmail: React.FunctionComponent = () => {
	const storeContext = useContext(StoreContext);

	const {
		isEmailVerified,
		isLoggedIn,
		usersLoading,
		verifyEmail,
	} = storeContext.usersStore;

	const { token } = useParams();

	const [haveVerified, setHaveVerified] = useState(false);

	useEffect(() => {
		if (!haveVerified) {
			verifyEmail(token);
			setHaveVerified(true);
		}
	});

	const makePanelContent = () => {
		if (usersLoading) {
			return <div>Loading data...</div>;
		}

		if (!isLoggedIn) {
			return <div>No user is logged in</div>;
		}

		return (
			<>
				<Typography variant="h3">Verifying your email address</Typography>
				<Typography paragraph>{isEmailVerified ? 'Your email address is verified' : 'Your email address is not verified'}</Typography>
			</>
		);
	};

	return (
		<div className="panel">
			{makePanelContent()}
		</div>
	);
};

export default observer(VerifyEmail);
