// this is a very basic test to ensure the email address is of form x@y.z
// invalid emails may be allowed
// but no valid emails should be excluded

// only one @ is allowed
// local part may not start or end with @
// multiple . are allowed after the @
// domain may not start or end with .

const isValidEmail = (email: string): boolean => {
	if (!email) {
		return false;
	}

	if (email === '') {
		return false;
	}

	if (email.endsWith('@') || email.startsWith('@')) {
		return false;
	}

	const emailAsArray = email.split('@');

	if (emailAsArray.length !== 2) {
		return false;
	}

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
