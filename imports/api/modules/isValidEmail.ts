// this is a very basic test to ensure the email address is of form x@y.z
// invalid emails may be allowed
// but no valid emails should be excluded

const isValidEmail = (email: string): boolean => {
	if (!email) {
		return false;
	}

	if (email === '') {
		return false;
	}

	// email may not contain spaces
	if (email.includes(' ')) {
		return false;
	}

	const emailAsArray = email.split('@');

	// only one @ is allowed
	if (emailAsArray.length !== 2) {
		return false;
	}

	// local part may not start or end with @
	if (emailAsArray[0].endsWith('@') || emailAsArray[0].startsWith('@')) {
		return false;
	}

	// domain may not start or end with .
	const domain = emailAsArray[1];

	if (domain.endsWith('.') || domain.startsWith('.')) {
		return false;
	}

	if (domain.split('.').length < 2) {
		return false;
	}

	return true;
};

export default isValidEmail;
