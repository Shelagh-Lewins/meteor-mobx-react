import React, { useEffect, useState } from 'react';

const Hello: React.FunctionComponent = () => {
	const [counter, setCounter] = useState(0);

	const message: string = 'Hello, World!';
	console.log(message);

	const increment = () => {
		setCounter(counter + 1);
	};

	useEffect(() => {
		document.title = `You clicked ${counter} times`;
	}, [counter]);

	return (
		<div>
			<button type="button" onClick={increment}>Click Me</button>
			<p>You&apos;ve pressed the button {counter} times.</p>
		</div>
	);
};

export default Hello;
