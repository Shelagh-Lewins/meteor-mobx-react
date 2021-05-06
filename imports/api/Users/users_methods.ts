// Methods that affect Meteor.users
import isValidEmail from '../modules/isValidEmail.ts';
import isValidPassword from '../modules/isValidPassword.ts';
import isValidUsername from '../modules/isValidUsername.ts';
import nonEmptyStringCheck from '../modules/server/nonEmptyStringCheck.ts';

if (Meteor.isServer) {
	Meteor.methods({
		'users.createUserAccount'({
			email,
			password,
			username,
		}) {
			check(email, String);
			check(password, String);
			check(username, String);

			if (!isValidEmail(email)) {
				throw new Meteor.Error('create-user-account-invalid-email', 'Unable to create new user account because email address is not valid');
			}

			if (!isValidPassword(password)) {
				throw new Meteor.Error('create-user-account-invalid-password', 'Unable to create new user account because password is not valid');
			}

			if (!isValidUsername(username)) {
				throw new Meteor.Error('create-user-account-invalid-username', 'Unable to create new user account because username is not valid');
			}

			// is there already a user with this username?
			// this check is case insensitive
			if (Accounts.findUserByUsername(username)) {
				throw new Meteor.Error('create-user-account-username-not-available', `Unable to create new user account because username "${username}" is not available`);
			}

			// is there already a user with this email address?
			// this check is case insensitive
			if (Accounts.findUserByEmail(email)) {
				throw new Meteor.Error('create-user-account-email-not-available', `Unable to create new user account because email address "${email}" is not available`);
			}

			const newUserId = Accounts.createUser({
				email,
				password,
				username,
			});

			// email is not sent automatically because we are creating the user on the server, not the client
			if (newUserId) {
				Accounts.sendVerificationEmail(newUserId);
			}

			return { password, username };
		},
		'users.isUsernameAvailable'({
			username,
		}) {
			check(username, String);

			// findUserByUsername will error on empty string
			try {
				if (Accounts.findUserByUsername(username)) {
					return false;
				}
			} catch (error) {
				return false;
			}

			return true;
		},
		'users.isEmailAvailable'({
			email,
		}) {
			check(email, String);

			// findUserByEmail will error on empty string
			try {
				if (Accounts.findUserByEmail(email)) {
					return false;
				}
			} catch (error) {
				return false;
			}

			return true;
		},
		'users.sendVerificationEmail'({
			userId,
		}) {
			check(userId, nonEmptyStringCheck);

			if (userId !== Meteor.userId()) {
				throw new Meteor.Error('send-verification-email-not-logged-in', 'Unable to send verification email because the user is not logged in');
			}

			return Accounts.sendVerificationEmail(userId);
		},
	});
}