// wrap a method call in a promise so it can be called synchronously

const callWithPromise = (method: string, myParameters: Record<string, unknown>): Promise => new Promise((resolve, reject) => {
	Meteor.call(method, myParameters, (error, result) => {
		if (error) {
			reject(error.reason);
		}

		resolve(result);
	});
});

export default callWithPromise;
