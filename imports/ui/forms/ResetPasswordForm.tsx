import React, { useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
	Button,
	Grid,
	TextField,
	Typography,
} from '@material-ui/core';
import { observer } from 'mobx-react';

import PropTypes, { InferProps } from 'prop-types';
import StoreContext from '../../api/client/storeContext.tsx';
import isValidPassword from '../../api/modules/isValidPassword.ts';
import {
	PASSWORD_MIN_LENGTH,
	PASSWORD_MAX_LENGTH,
} from '../../api/modules/parameters.ts';

type ownPropTypes = InferProps<CounterView.propTypes>;

const ResetPasswordForm: React.FunctionComponent = ({ token }: ownPropTypes): void => {
	const {
		handleSubmit,
		control,
		'formState': { errors },
		getValues,
		reset,
		trigger,
	} = useForm(); // 'all' so email and username availability are checked before submit

	const storeContext = useContext(StoreContext);

	const {
		resetPassword,
	} = storeContext.usersStore;

	const handleResetPassword = async (data) => {
		await resetPassword({
			'password': data.newPassword,
			token,
		});

		// we must supply reset (default) values to avoid an uncontrolled inputs error
		reset({
			'confirmNewPassword': '',
			'newPassword': '',
		});
	};

	return (
		// padding overcomes negative margin introduced by grid spacing
		<form onSubmit={handleSubmit(handleResetPassword)} className="accounts-form">
			<Typography paragraph>Enter a new password.</Typography>
			<Grid container spacing={3}>
				<Grid item xs={12} md={6}>
					<Controller
						control={control}
						defaultValue=""
						name="newPassword"
						render={({ field }) => (
							<TextField
								// pass all props to enable form control to work
								// eslint-disable-next-line react/jsx-props-no-spreading
								{...field}
								className="form-text-field"
								// error must be boolean
								// eslint-disable-next-line no-unneeded-ternary
								error={errors.newPassword ? true : false}
								helperText={errors.newPassword && errors.newPassword.message}
								label="New password"
								type="password"
								variant="filled"
							/>
						)}
						rules={{
							'required': 'New password is required',
							'maxLength': {
								'value': PASSWORD_MAX_LENGTH,
								'message': `Password cannot have more than ${PASSWORD_MAX_LENGTH} characters`,
							},
							'minLength': {
								'value': PASSWORD_MIN_LENGTH,
								'message': `Password must have at least ${PASSWORD_MIN_LENGTH} characters`,
							},
							'validate': (value) => {
								trigger('confirmNewPassword'); // ensure match
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
						name="confirmNewPassword"
						render={({ field }) => (
							<TextField
								// pass all props to enable form control to work
								// eslint-disable-next-line react/jsx-props-no-spreading
								{...field}
								className="form-text-field"
								// error must be boolean
								// eslint-disable-next-line no-unneeded-ternary
								error={errors.confirmNewPassword ? true : false}
								helperText={errors.confirmNewPassword && errors.confirmNewPassword.message}
								label="Confirm new password"
								type="password"
								variant="filled"
							/>
						)}
						rules={{
							'required': 'Confirm new password is required',
							'validate': (value) => {
								if (value === getValues().newPassword) {
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
					<Button type="submit" variant="outlined" aria-label="change password" color="primary">
						Change password
					</Button>
				</Grid>
			</Grid>
		</form>
	);
};

// with Typescript validation we theoretically don't need PropTypes, but they can catch missing values at runtime e.g. because of a data issue
ResetPasswordForm.propTypes = {
	'token': PropTypes.string,
};

export default observer(ResetPasswordForm);
