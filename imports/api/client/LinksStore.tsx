import {
	action,
	extendObservable,
	observable,
	toJS,
} from 'mobx';
import ReactiveDataManager from '../../../client/ReactiveDataManager.ts';
import type RootStore from './RootStore.tsx'; // avoid circular dependency

export default class LinksStore {
	constructor(rootStore: RootStore) {
		/* MOBX STATE */
		extendObservable(this, {
			// Links
			'linksLoading': false,
			'links': [],
			// updates examples with fresh data
			'updateLinks': action((newlinks) => {
				this.links = newlinks;
			}),
			'setLinksLoading': action((boolean) => {
				this.linksLoading = boolean;
			}),

			// Comments
			'showCommentsMap': observable.map(),
			'toggleShowComments': action((linkId) => {
				if (this.showCommentsMap.get(linkId)) {
					this.showCommentsMap.set(linkId, false);
				} else {
					this.showCommentsMap.set(linkId, true);
				}
			}),

			'commentFilter': [],
			'addCommentFilterValue': action((linkId) => {
				const filterArray = toJS(this.commentFilter);

				if (!filterArray.includes(linkId)) {
					filterArray.push(linkId);
					this.commentFilter = filterArray;
				}
			}),
			'comments': [],
			// updates examples with fresh data
			'updateComments': action((newComments) => {
				this.comments = newComments;
			}),
			'setCommentsLoading': action((boolean) => {
				this.commentsLoading = boolean;
			}),
		});

		this.rootStore = rootStore; // allows stores to know about each other

		/* FUNCTIONS TO CALL METEOR METHODS */
		// calls Meteor to add a new example (the method doesn't actually exist but this shows how it would be used)
		this.addExample = () => {
			Meteor.call('addLink');
		};

		/* REACTIVE DATA MANAGEMENT */
		this.dataManager = new ReactiveDataManager(this);
	}
}
