import { autorun } from 'mobx';
import { Links } from '../imports/api/Links/links.ts';

// A class for managing Meteor subscriptions based on observed changes in a state store
export default class ReactiveDataManager {
	// state - a Mobx store instance
	constructor(state: Class) {
		//  We want to enforce max of only one subscription and observer at a time for each data manager
		this.linksSubscription = null;
		this.linksObserver = null;

		// a Mobx autorun function for fetching data
		autorun(() => {
			// const linksDataManager = autorun(() => {
			// const linksDataManager = autorun((state) => { // not sure if state should be provided here, it is already available in upper scope
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
	}
}
