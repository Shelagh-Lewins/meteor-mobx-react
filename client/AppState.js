import {
	action,
	computed,
	extendObservable,
	observable,
	observer,
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

			//get linksWithComments () { return 2*3; },
			//'linksWithComments': computed(() => this.links),
		});

		/* FUNCTIONS TO CALL METEOR METHODS */
		// calls Meteor to add a new example
		this.addExample = () => {
			Meteor.call('addLink');
		};

		//'linksWithComments': computed(() => observable(this.links));

		/* REACTIVE DATA MANAGEMENT */
		this.dataManager = new ReactiveDataManager(this);
	}
}
