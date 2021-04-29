// Configure user accounts and roles

Meteor.startup(() => {
	if (Meteor.isServer) {
		Accounts.config({
			'sendVerificationEmail': true,
		});
	}
});

Accounts.onCreateUser((options, user) => {
	const customizedUser = { ...user, 'usernameSort': user.username.toLowerCase() };

	// We still want the default hook's 'profile' behavior.
	if (options.profile) {
		customizedUser.profile = options.profile;
	}

	return customizedUser;
});
