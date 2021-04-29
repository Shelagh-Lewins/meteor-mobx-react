import {
	USERNAME_MAX_LENGTH,
	USERNAME_MIN_LENGTH,
} from './parameters.ts';

const isValidUsername = (username: string): boolean => {
	if (!username) {
		return false;
	}

	if (username === '') {
		return false;
	}

	// username may not contain spaces
	if (username.includes(' ')) {
		return false;
	}

	if (username.length > USERNAME_MAX_LENGTH || username.length < USERNAME_MIN_LENGTH) {
		return false;
	}

	return true;
};

export default isValidUsername;
