import React, { useEffect, useState } from 'react';
import { Button, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TouchApp from '@material-ui/icons/TouchApp';

// Material UI Hook API
const useStyles = makeStyles({
	'root': {
		'background': 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
		'border': 0,
		'borderRadius': 3,
		'boxShadow': '0 3px 5px 2px rgba(255, 105, 135, .3)',
		'color': 'white',
		'height': 48,
		'padding': '0 30px',
	},
});

const Hello: React.FunctionComponent = () => {
	const [counter, setCounter] = useState(0);

	// Typescript
	const message: string = `A variable message to demonstrate typing. Counter: ${counter}`;

	const increment = () => {
		setCounter(counter + 1);
	};

	useEffect(() => {
		document.title = `Counter: ${counter}`;
	}, [counter]);

	const classes = useStyles();

	return (
		<div className="panel">
			<p>An IconButton from Material UI:</p>
			<IconButton onClick={increment} color="primary" title="Click Me"><TouchApp /></IconButton>
			<p>A Button from Material UI with an Icon inside it:</p>
			<Button onClick={increment} className={classes.root}><TouchApp />Click Me</Button>
			<p>You&apos;ve pressed a button {counter} times</p>
			<p>Message: {message}</p>
		</div>
	);
};

export default Hello;
