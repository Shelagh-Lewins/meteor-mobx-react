import {
	PASSWORD_MAX_LENGTH,
	PASSWORD_MIN_LENGTH,
} from './parameters.ts';

const isValidPassword = (password: string): boolean => {
	if (!password) {
		return false;
	}

	if (password === '') {
		return false;
	}

	// password may not contain spaces
	if (password.includes(' ')) {
		return false;
	}

	if (password.length > PASSWORD_MAX_LENGTH || password.length < PASSWORD_MIN_LENGTH) {
		return false;
	}

	return true;
};

export default isValidPassword;
