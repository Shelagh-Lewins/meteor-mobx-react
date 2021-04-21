import SimpleSchema from 'simpl-schema';

export interface LinkInterface {
	_id?: string;
	title: string;
	url: string;
	createdAt?: Date;
}

export const Links = new Mongo.Collection<LinkInterface>('links');

// Deny all client-side updates on the Lists collection
Links.deny({
	insert() { return true; },
	update() { return true; },
	remove() { return true; },
});

Links.schema = new SimpleSchema({
	'createdAt': Date,
	'title': String,
	'url': String,
});

Links.attachSchema(Links.schema);
