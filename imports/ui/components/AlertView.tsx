import React, { useContext } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import { Alert, AlertTitle } from '@material-ui/lab';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import StoreContext from '../../api/client/storeContext.tsx';

const useStyles = makeStyles((theme: Theme) => createStyles({
	'root': {
		'marginBottom': theme.spacing(1),
		'width': '100%',
		'& > * + *': {
			'marginTop': theme.spacing(2),
		},
	},
}));

const AlertView: React.FunctionComponent = () => {
	const storeContext = useContext(StoreContext);

	const classes = useStyles();

	const {
		alert,
		clearAlert,
	} = storeContext.pageStore;

	const { message, severity } = alert;

	let titleText = '';

	switch (severity) {
		case 'error':
			titleText = 'Error';
			break;

		case 'warning':
			titleText = 'Warning';
			break;

		case 'info':
			titleText = 'Info';
			break;

		case 'success':
			titleText = 'Success';
			break;

		default:
			break;
	}

	return (
		<div className={classes.root}>
			<Alert
				action={(
					<IconButton
						aria-label="close"
						color="inherit"
						size="small"
						onClick={() => {
							clearAlert();
						}}
					>
						<CloseIcon fontSize="inherit" />
					</IconButton>
				)}
				severity={severity}
			>
				<AlertTitle>{titleText}</AlertTitle>
				{message}
			</Alert>
		</div>
	);
};

export default observer(AlertView);
