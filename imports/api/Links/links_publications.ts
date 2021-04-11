import { Links } from './links.ts';

if (Meteor.isServer) {
	Meteor.publish('links', () => Links.find({}));
}
