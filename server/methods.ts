// import { check } from 'meteor/check';

Meteor.methods({
	'env.get_MY_ENV_VAR'() {
		return process.env.MY_ENV_VAR;
	},
});
