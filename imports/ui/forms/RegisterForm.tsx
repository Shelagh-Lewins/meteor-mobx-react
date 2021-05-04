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
import isValidEmail from '../../api/modules/isValidEmail.ts';
import isValidPassword from '../../api/modules/isValidPassword.ts';
import isValidUsername from '../../api/modules/isValidUsername.ts';
import {
	USERNAME_MIN_LENGTH,
	USERNAME_MAX_LENGTH,
	PASSWORD_MIN_LENGTH,
	PASSWORD_MAX_LENGTH,
} from '../../api/modules/parameters.ts';
import callWithPromise from '../../api/modules/callWithPromise.ts';

import Hint from '../components/Hint.tsx';

const RegisterForm: React.FunctionComponent = (): void => {
	const {
		handleSubmit,
		control,
		'formState': { errors },
		getValues,
		reset,
		trigger,
	} = useForm({ 'mode': 'all' }); // 'all' so email and username availability are checked before submit

	const storeContext = useContext(StoreContext);
	const {
		createUserAccount,
	} = storeContext.usersStore;
	const handleRegistration = async (data) => {
		await createUserAccount(data);

		// we must supply reset (default) values to avoid an uncontrolled inputs error
		reset({
			'username': '',
			'email': '',
			'password': '',
			'confirmPassword': '',
		});
	};

	return (
		// padding overcomes negative margin introduced by grid spacing
		<form onSubmit={handleSubmit(handleRegistration)} className="accounts-form" style={{ 'padding': 20 }}>
			<Typography variant="h3">Register</Typography>
			<Typography paragraph>Create a new user account on the demo site.</Typography>
			<Grid container spacing={3}>
				<Grid item xs={12} md={6}>
					<Controller
						control={control}
						defaultValue=""
						name="username"
						render={({ field }) => (
							<TextField
								// pass all props to enable form control to work
								// eslint-disable-next-line react/jsx-props-no-spreading
								{...field}
								className="form-text-field"
								// error must be boolean
								// eslint-disable-next-line no-unneeded-ternary
								error={errors.username ? true : false}
								helperText={errors.username && errors.username.message}
								label="Username"
								variant="filled"
							/>
						)}
						rules={{
							'required': 'Username is required',
							'maxLength': {
								'value': USERNAME_MAX_LENGTH,
								'message': `Username cannot have more than ${USERNAME_MAX_LENGTH} characters`,
							},
							'minLength': {
								'value': USERNAME_MIN_LENGTH,
								'message': `Username must have at least ${USERNAME_MIN_LENGTH} characters`,
							},
							'validate': async (value) => {
								// check the database to see if the username is in use already
								const isUsernameAvailable = await callWithPromise('users.isUsernameAvailable', { 'username': value });

								if (!isUsernameAvailable) {
									return `The username "${value}" is not available`;
								}

								return isValidUsername(value) ? true : 'Username cannot contain spaces';
							},
						}}
					/>
					<Hint text="Your username is how other users will see you." />
				</Grid>
			</Grid>
			<Grid container spacing={3}>
				<Grid item xs={12} md={6}>
					<Controller
						control={control}
						defaultValue=""
						name="email"
						render={({ field }) => (
							<TextField
								// pass all props to enable form control to work
								// eslint-disable-next-line react/jsx-props-no-spreading
								{...field}
								className="form-text-field"
								// error must be boolean
								// eslint-disable-next-line no-unneeded-ternary
								error={errors.email ? true : false}
								helperText={errors.email && errors.email.message}
								label="Email address"
								variant="filled"
							/>
						)}
						rules={{
							'required': 'Email address is required',
							'validate': async (value) => {
								const isEmailAvailable = await callWithPromise('users.isEmailAvailable', { 'email': value });

								if (!isEmailAvailable) {
									return `The email address "${value}" is not available`;
								}

								return (isValidEmail(value) ? true : 'Must be a valid email address');
							},
						}}
					/>
					<Hint text="Your email address will not be visible to other users." />
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
							'maxLength': {
								'value': PASSWORD_MAX_LENGTH,
								'message': `Password cannot have more than ${PASSWORD_MAX_LENGTH} characters`,
							},
							'minLength': {
								'value': PASSWORD_MIN_LENGTH,
								'message': `Password must have at least ${PASSWORD_MIN_LENGTH} characters`,
							},
							'validate': (value) => {
								trigger('confirmPassword'); // ensure match
								return isValidPassword(value) ? true : 'Password cannot contain spaces';
							},
						}}
					/>
				</Grid>
			</Grid>
			<Grid container spacing={3}>
				<Grid item xs={12} md={6}>
					<Controller
						control={control}
						defaultValue=""
						name="confirmPassword"
						render={({ field }) => (
							<TextField
								// pass all props to enable form control to work
								// eslint-disable-next-line react/jsx-props-no-spreading
								{...field}
								className="form-text-field"
								// error must be boolean
								// eslint-disable-next-line no-unneeded-ternary
								error={errors.confirmPassword ? true : false}
								helperText={errors.confirmPassword && errors.confirmPassword.message}
								label="Confirm password"
								type="password"
								variant="filled"
							/>
						)}
						rules={{
							'required': 'Confirm password is required',
							'validate': (value) => {
								if (value === getValues().password) {
									return true;
								}

								return 'The passwords do not match';
							},
						}}
					/>
				</Grid>
			</Grid>
			<Grid container spacing={3}>
				<Grid item xs={6}>
					<Button type="submit" variant="outlined" aria-label="create account" color="primary">
						Create account
					</Button>
				</Grid>
			</Grid>
		</form>
	);
};
export default observer(RegisterForm);
