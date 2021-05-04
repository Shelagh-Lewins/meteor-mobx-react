import React, { useContext } from 'react';
import { observer } from 'mobx-react';
import {
	Typography,
} from '@material-ui/core';
import LogoutButton from '../components/LogoutButton.tsx';
import StoreContext from '../../api/client/storeContext.tsx';

const Account: React.FunctionComponent = () => {
	const storeContext = useContext(StoreContext);

	const {
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
			<>
				<Typography variant="h3">{user && user.username}</Typography>
				<p>userid: {Meteor.userId()}</p>
				<LogoutButton />
			</>
		);
	};

	return (
		<div className="panel">
			{makePanelContent()}
		</div>
	);
};

export default observer(Account);
