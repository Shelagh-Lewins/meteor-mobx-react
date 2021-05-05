import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from '@material-ui/core';

import StoreContext from '../../api/client/storeContext.tsx';

// A function component wrapped with `observer` will react
// to any future change in an observable it used before.
const ResendVerificationEmailButton: React.FunctionComponent = () => {
	const storeContext = useContext(StoreContext);

	const {
		resendVerificationEmail,
	} = storeContext.usersStore;

	const handleClick = () => {
		resendVerificationEmail();
	};

	return (
		<Button onClick={() => handleClick()} variant="contained" color="secondary">Resend verification email</Button>
	);
};

export default observer(ResendVerificationEmailButton);
