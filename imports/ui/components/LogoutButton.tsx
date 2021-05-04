import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from '@material-ui/core';

import StoreContext from '../../api/client/storeContext.tsx';

// A function component wrapped with `observer` will react
// to any future change in an observable it used before.
const LogoutButton: React.FunctionComponent = ({ text = 'Click me' }: ownPropTypes) => {
	const storeContext = useContext(StoreContext);

	const {
		logout,
	} = storeContext.usersStore;

	handleClick = () => {
		logout(); // keep 'this' context
	};

	return (
		<Button onClick={() => handleClick()}>Log out</Button>
	);
};

export default observer(LogoutButton);
