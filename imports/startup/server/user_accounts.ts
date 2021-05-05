// Configure user accounts and roles

Meteor.startup(() => {
	Accounts.emailTemplates.siteName = 'Meteor-Mobx-React demo';
	Accounts.emailTemplates.from = 'Meteor-Mobx-React demo <no-reply@example.com>';
	Accounts.emailTemplates.verifyEmail.subject = (user) => 'Verify your email address';
	Accounts.emailTemplates.verifyEmail.text = (user, url) => {
		const urlWithoutHash = url.replace('#/', '');

		let text = `Hello ${user.username},\n\nThank you for creating an account on the Meteor-Mobx-React demo website.`;

		text += '\n\nIn order to activate your account, please verify your email address be clicking the link below:';

		text += `\n\n${urlWithoutHash}`;

		text += '\n\nAlternatively, you can enter the verification code below on your Account page on the Meteor-Mobx-React demo website:';

		let code = urlWithoutHash.split('/');

		code = urlWithoutHash.split('/')[urlWithoutHash.split('/').length - 1];

		text += `\n\n${code}`;

		text += '\n\nBest wishes';

		text += '\n\nThe development team';

		return text;
	};
	Accounts.emailTemplates.resetPassword.subject = (user) => 'Reset your password';
	Accounts.emailTemplates.resetPassword.text = (user, url) => {
		const urlWithoutHash = url.replace('#/', '');
		let text = `Hello ${user.username},\n\nTo reset your password on the Meteor-Mobx-React demo website, please click the link below.:\n\n ${urlWithoutHash}`;

		text += '\n\nBest wishes';

		text += '\n\nThe development team';

		return text;
	};
});

Accounts.onCreateUser((options, user) => {
	const customizedUser = { ...user, 'usernameSort': user.username.toLowerCase() };

	// We still want the default hook's 'profile' behavior.
	if (options.profile) {
		customizedUser.profile = options.profile;
	}

	return customizedUser;
});
