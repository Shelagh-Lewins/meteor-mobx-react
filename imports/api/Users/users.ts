// Meteor.users is already defined but we want config to be consistent with other collections

export interface UsersInterface {
	_id?: string;
	email: string;
	password: string;
	username: string;
	createdAt?: Date;
}

// login info
export interface AuthInterface {
	user: string; // username or email
	password: string;
}

// Don't let people write arbitrary data to their 'profile' field from the client
Meteor.users.deny({
	update() {
		return true;
	},
});