import React from 'react';
import { useForm, Controller } from 'react-hook-form';

import { makeStyles } from '@material-ui/core/styles';
import {
	Button,
	FormGroup,
	Grid,
	TextField,
	Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	'root': {
		'flexGrow': 1,
	},
	'textInput': {
		'width': '100%',
	},
}));

const RegisterForm = (): void => {
	const classes = useStyles();

	const {
		handleSubmit,
		control,
		'formState': { errors },
	} = useForm();
	const handleRegistration = (data) => console.log(data);

	return (
		// padding overcomes negative margin introduced by grid spacing
		<form onSubmit={handleSubmit(handleRegistration)} className={classes.root} style={{ 'padding': 20 }}>
			<Typography variant="h3">Register</Typography>
			<Typography paragraph>Create a new user account on the demo site.</Typography>
			<Grid container spacing={3}>
				<Grid item xs={6}>
					<Controller
						control={control}
						defaultValue=""
						name="email"
						render={({ field }) => (
							<TextField
								// pass all props to enable form control to work
								// eslint-disable-next-line react/jsx-props-no-spreading
								{...field}
								className={classes.textInput}
								// error must be boolean
								// eslint-disable-next-line no-unneeded-ternary
								error={errors.email ? true : false}
								helperText={errors.email ? 'Email is required' : ''}
								label="Email address"
								variant="filled"
							/>
						)}
						rules={{ 'required': true }}
					/>
				</Grid>
			</Grid>
			<Grid container spacing={3}>
				<Grid item xs={6}>
					<Controller
						control={control}
						defaultValue=""
						name="password"
						render={({ field }) => (
							<TextField
								// pass all props to enable form control to work
								// eslint-disable-next-line react/jsx-props-no-spreading
								{...field}
								className={classes.textInput}
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
