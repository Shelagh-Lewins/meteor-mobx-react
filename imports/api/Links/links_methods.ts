import { check } from 'meteor/check';
import { Links } from './links.ts';

if (Meteor.isServer) {
	Meteor.methods({
		'links.add'({ title, url }) {
			check(title, String);
			check(url, String);
			Links.insert({ title, url, 'createdAt': new Date() });
		},
	});
}
