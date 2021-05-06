import React, { useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
	Button,
	Grid,
	TextField,
	Typography,
} from '@material-ui/core';
import { observer } from 'mobx-react';

import StoreContext from '../../api/client/storeContext.tsx';
import Hint from '../components/Hint.tsx';

const LoginForm: React.FunctionComponent = (): void => {
	const {
		handleSubmit,
		control,
		'formState': { errors },
		reset,
	} = useForm({ 'mode': 'all' }); // 'all' so email and username availability are checked before submit

	const storeContext = useContext(StoreContext);
	const {
		isLoggedIn,
		login,
		usersLoading,
	} = storeContext.usersStore;
	const handleLogin = async (data) => {
		await login(data);

		// we must supply reset (default) values to avoid an uncontrolled inputs error
		reset({
			'user': '',
			'password': '',
		});
	};

	if (usersLoading) {
		return <div>Loading...</div>;
	}

	if (isLoggedIn) {
		return <div>You are already logged in</div>;
	}

	return (
		// padding overcomes negative margin introduced by grid spacing
		<form onSubmit={handleSubmit(handleLogin)} className="accounts-form">
			<Typography paragraph>Log in to your account.</Typography>
			<Grid container spacing={3}>
				<Grid item xs={12} md={6}>
					<Hint text="You can enter either your username or your email address." />
					<Controller
						control={control}
						defaultValue=""
						name="user"
						render={({ field }) => (
							<TextField
								// pass all props to enable form control to work
								// eslint-disable-next-line react/jsx-props-no-spreading
								{...field}
								className="form-text-field"
								// error must be boolean
								// eslint-disable-next-line no-unneeded-ternary
								error={errors.user ? true : false}
								helperText={errors.user && errors.user.message}
								label="Username or email address"
								variant="filled"
							/>
						)}
						rules={{
							'required': 'Username is required',
						}}
					/>
				</Grid>
			</Grid>
			<Grid container spacing={3}>
				<Grid item xs={12} md={6}>
					<Controller
						control={control}
						defaultValue=""
						name="password"
						render={({ field }) => (
							<TextField
								// pass all props to enable form control to work
								// eslint-disable-next-line react/jsx-props-no-spreading
								{...field}
								className="form-text-field"
								// error must be boolean
								// eslint-disable-next-line no-unneeded-ternary
								error={errors.password ? true : false}
								helperText={errors.password && errors.password.message}
								label="Password"
								type="password"
								variant="filled"
							/>
						)}
						rules={{
							'required': 'Password is required',
						}}
					/>
				</Grid>
			</Grid>
			<Grid container spacing={3}>
				<Grid item xs={6}>
					<Button type="submit" variant="contained" aria-label="login" color="primary">
						Login
					</Button>
				</Grid>
			</Grid>
		</form>
	);
};
export default observer(LoginForm);
