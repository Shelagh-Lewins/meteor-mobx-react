// username may not contain spaces

const isValidUsername = (username: string): boolean => {
	if (!username) {
		return false;
	}

	if (username === '') {
		return false;
	}

	if (username.includes(' ')) {
		return false;
	}

	return true;
};

export default isValidUsername;
