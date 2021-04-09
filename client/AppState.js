import {
	extendObservable,
	action,
} from 'mobx';
import ReactiveDataManager from './ReactiveDataManager.ts';

export default class AppState {
	constructor() {
		/* MOBX STATE */
		extendObservable(this, {
			'linksLoading': false,
			'links': [],
			// updates examples with fresh data
			'updateLinks': action((newlinks) => {
				this.links = newlinks;
			}),
			'setLinksLoading': action((boolean) => {
				this.linksLoading = boolean;
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
