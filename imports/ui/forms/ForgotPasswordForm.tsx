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

const ForgotPasswordrForm: React.FunctionComponent = (): void => {
	const {
		handleSubmit,
		control,
		'formState': { errors },
		reset,
	} = useForm(); // 'all' so email and username availability are checked before submit

	const storeContext = useContext(StoreContext);
	const {
		forgotPassword,
	} = storeContext.usersStore;
	const handleRegistration = async (data) => {
		await forgotPassword(data.email);

		// we must supply reset (default) values to avoid an uncontrolled inputs error
		reset({
			'email': '',
		});
	};

	return (
		// padding overcomes negative margin introduced by grid spacing
		<form onSubmit={handleSubmit(handleRegistration)} className="accounts-form">
			<Typography paragraph>Request an email to reset your password.</Typography>
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
				</Grid>
			</Grid>
			<Grid container spacing={3}>
				<Grid item xs={6}>
					<Button type="submit" variant="contained" aria-label="send email" color="primary">
						Send email
					</Button>
				</Grid>
			</Grid>
		</form>
	);
};
export default observer(ForgotPasswordrForm);
