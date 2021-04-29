if (Meteor.isServer) {
	Meteor.methods({
		'page.get_MY_ENV_VAR'() {
			return process.env.MY_ENV_VAR;
		},
	});
}
