import SimpleSchema from 'simpl-schema';

export interface Link {
	_id?: string;
	title: string;
	url: string;
	createdAt: Date;
}

export const Links = new Mongo.Collection<Link>('links');

// Deny all client-side updates on the Lists collection
Links.deny({
	insert() { return true; },
	update() { return true; },
	remove() { return true; },
});

Links.schema = new SimpleSchema({
	'createdAt': Date,
	'title': String,
});

Links.attachSchema(Links.schema);
