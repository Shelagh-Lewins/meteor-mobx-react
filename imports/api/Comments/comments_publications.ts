import { check } from 'meteor/check';
import { Comments } from './comments.ts';

if (Meteor.isServer) {
	Meteor.publish('comments', (commentFilter: Array) => {
		check(commentFilter, [String]);

		return Comments.find({ 'linkId': { '$in': commentFilter } }, { 'sort': { 'createdAt': 1 } });
	});
}
