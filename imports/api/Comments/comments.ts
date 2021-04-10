import SimpleSchema from 'simpl-schema';

export interface Comment {
	_id?: string;
	linkId: string;
	text: string;
	createdAt: Date;
}

export const Comments = new Mongo.Collection<Comment>('comments');

// Deny all client-side updates on the Comments collection
Comments.deny({
	insert() { return true; },
	update() { return true; },
	remove() { return true; },
});

Comments.schema = new SimpleSchema({
	'createdAt': Date,
	'linkId': String,
	'text': String,
});

Comments.attachSchema(Comments.schema);
