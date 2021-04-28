import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
	Button,
	Grid,
	TextField,
	Typography,
} from '@material-ui/core';

import isValidEmail from '../../api/modules/isValidEmail.tsx';
import isValidUsername from '../../api/modules/isValidUsername.tsx';

import Hint from '../components/Hint.tsx';

const RegisterForm = (): void => {
	const {
		handleSubmit,
		control,
		'formState': { errors },
		getValues,
		trigger,
	} = useForm();
	const handleRegistration = (data) => console.log(data);

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
							'minLength': {
								'value': 8,
								'message': 'Username must have at least 8 characters',
							},
							'validate': (value) => (isValidUsername(value) ? true : 'Username cannot contain spaces'),
						}}
					/>
					<Hint text="Your username may be seen by other users." />
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
							'validate': (value) => (isValidEmail(value) ? true : 'Must be a valid email address'),
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
							'minLength': {
								'value': 8,
								'message': 'Password must have at least 8 characters',
							},
							'validate': (value) => {
								trigger('confirmPassword'); // ensure match
								return true;
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
					<Button type="submit" variant="outlined" aria-label="delete" color="primary">
						Create account
					</Button>
				</Grid>
			</Grid>
		</form>
	);
};
export default RegisterForm;
