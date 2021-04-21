import { check } from 'meteor/check';
import { Links } from '../Links/links.ts';

Meteor.methods({
	'env.get_MY_ENV_VAR'() {
		return process.env.MY_ENV_VAR;
	},
	'links.add'({ title, url }) {
		check(title, String);
		check(url, String);
		Links.insert({ title, url, 'createdAt': new Date() });
	},
});
