// allow rate limiter

//import { Meteor } from 'meteor/meteor';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

if (Meteor.isServer) {
	// Define a rule that matches login attempts by non-admin users.
	const loginRule = {
		userId(userId) {
			const user = Meteor.users.findOne(userId);
			return user && user.type !== 'admin'; // TODO implement 'admin' type for user - probably actually use roles
		},

		'type': 'method',
		'name': 'login',
	};

	// Add the rule, allowing up to 5 messages every 1000 milliseconds.
	// DDPRateLimiter.addRule(loginRule, 5, 1000);
}
