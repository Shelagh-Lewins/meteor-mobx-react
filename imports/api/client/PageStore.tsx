import { makeAutoObservable } from 'mobx';
import type RootStore from './RootStore.tsx'; // avoid circular dependency

class PageStore {
	myEnvVar = ''

	constructor(rootStore: RootStore) {
		makeAutoObservable(this);
		this.rootStore = rootStore; // allows stores to know about each other

		Meteor.call('env.get_MY_ENV_VAR', (error, result) => {
			this.setMyEnvVar(result);
		});
	}

	setMyEnvVar(text: string): void {
		this.rootStore.pageStore.myEnvVar = text;
	}
}

export default PageStore;
