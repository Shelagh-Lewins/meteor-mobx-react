import {
	action,
	extendObservable,
	observable,
	// map,
	toJS,
} from 'mobx';
import ReactiveDataManager from './ReactiveDataManager.ts';

export default class AppState {
	constructor() {
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
			'toggleShowComments': action((exampleId) => {
				if (this.showCommentsMap.get(exampleId)) {
					this.showCommentsMap.set(exampleId, false);
				} else {
					this.showCommentsMap.set(exampleId, true);
				}
			}),

			'commentFilter': [],
			'addCommentFilterValue': action((linkId) => {
				const filterArray = toJS(this.commentFilter);

				if (!filterArray.includes(linkId)) {
					filterArray.push(linkId);
					this.commentFilter = filterArray;
					this.showCommentsMap.set(linkId, true);
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

		/* FUNCTIONS TO CALL METEOR METHODS */
		// calls Meteor to add a new example
		this.addExample = () => {
			Meteor.call('addLink');
		};

		/* REACTIVE DATA MANAGEMENT */
		this.dataManager = new ReactiveDataManager(this);
	}
}
