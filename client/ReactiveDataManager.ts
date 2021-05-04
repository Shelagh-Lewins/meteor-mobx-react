import { autorun, toJS } from 'mobx';
import { Comments } from '../imports/api/Comments/comments.ts';
import { Links } from '../imports/api/Links/links.ts';

// based on this example:
// https://medium.com/@swalta/adventures-with-react-mobx-and-meteor-605a133460b3#.530jkvrkw
// updated for newer versions and extended

// A class for managing Meteor subscriptions based on observed changes in a state store
export default class ReactiveDataManager {
	// state - a Mobx store instance
	constructor(state: Class) {
		//  We want to enforce max of only one subscription and observer at a time for each data manager
		this.linksSubscription = null;
		this.linksObserver = null;

		// a Mobx autorun function for fetching Links data
		autorun(() => {
			// reusable method for updating the state store with fresh data
			const refreshLinks = () => {
				const refreshedLinks = Links.find().fetch();
				state.updateLinks(refreshedLinks);
			};

			// If a current subscription exists, it is now invalidated by the mobx autorun, so stop it
			if (this.linksSubscription) {
				this.linksSubscription.stop();
			}
			// same with the observer for the subscription
			if (this.linksObserver) {
				this.linksObserver.stop();
			}

			// create a new Meteor subscription
			state.setLinksLoading(true);

			this.linksSubscription = Meteor.subscribe('links', {

				// callback when the Meteor subscription is ready
				'onReady': () => {
					// create a Meteor observer to watch the subscription for changes and update data when they occur
					this.linksObserver = Links.find().observe({
						'added': () => {
							refreshLinks(state);
						},
						'changed': () => {
							refreshLinks(state);
						},
						'removed': () => {
							refreshLinks(state);
						},
					});
					state.setLinksLoading(false);
				},
			});
		});

		// a Mobx autorun function for fetching Comments data
		autorun(() => {
			const commentFilter = toJS(state.commentFilter);

			// reusable method for updating the state store with fresh data
			const refreshComments = () => {
				const refreshedComments = Comments.find().fetch();
				state.updateComments(refreshedComments);
			};

			// If a current subscription exists, it is now invalidated by the mobx autorun, so stop it
			if (this.commentsSubscription) {
				this.commentsSubscription.stop();
			}
			// same with the observer for the subscription
			if (this.commentsObserver) {
				this.commentsObserver.stop();
			}

			// create a new Meteor subscription, but only if there are some filter values
			if (commentFilter.length > 0) {
				this.commentsSubscription = Meteor.subscribe('comments', commentFilter, {
					// callback when the Meteor subscription is ready
					'onReady': () => {
						// create a Meteor observer to watch the subscription for changes and update data when they occur
						this.commentsObserver = Comments.find().observe({
							'added': () => {
								refreshComments(state);
							},
							'changed': () => {
								refreshComments(state);
							},
						});
					},
				});
			}
		});

		// a Mobx autorun function for monitoring the current user
		autorun(() => {
			const refreshCurrentUser = () => {
				const currentUser = Meteor.user();
				state.updateCurrentUser(currentUser);
			};
		});
	}
}
