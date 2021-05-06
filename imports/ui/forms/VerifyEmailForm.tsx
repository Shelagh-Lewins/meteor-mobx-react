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

const VerifyEmailForm: React.FunctionComponent = (): void => {
	const {
		handleSubmit,
		control,
		'formState': { errors },
		reset,
	} = useForm();

	const storeContext = useContext(StoreContext);
	const {
		usersLoading,
		verifyEmail,
	} = storeContext.usersStore;
	const handleVerifyEmail = async (data) => {
		await verifyEmail(data.token);

		// we must supply reset (default) values to avoid an uncontrolled inputs error
		reset({
			'token': '',

		});
	};

	if (usersLoading) {
		return <div>Loading...</div>;
	}

	return (
		// padding overcomes negative margin introduced by grid spacing
		<form onSubmit={handleSubmit(handleVerifyEmail)} className="accounts-form">
			<Typography variant="body1" paragraph>To verify your email address, click the link in the verification email that has been sent to your email address, or enter the token in the box below.</Typography>
			<Grid container spacing={3}>
				<Grid item xs={12} md={6}>
					<Controller
						control={control}
						defaultValue=""
						name="token"
						render={({ field }) => (
							<TextField
								// pass all props to enable form control to work
								// eslint-disable-next-line react/jsx-props-no-spreading
								{...field}
								className="form-text-field"
								// error must be boolean
								// eslint-disable-next-line no-unneeded-ternary
								error={errors.token ? true : false}
								helperText={errors.token && errors.token.message}
								label="Verification token"
								variant="filled"
							/>
						)}
						rules={{
							'required': 'Token is required',
						}}
					/>
				</Grid>
			</Grid>
			<Grid container spacing={3}>
				<Grid item xs={6}>
					<Button type="submit" variant="outlined" aria-label="verify email address" color="primary">
						Verify email address
					</Button>
				</Grid>
			</Grid>
		</form>
	);
};
export default observer(VerifyEmailForm);
