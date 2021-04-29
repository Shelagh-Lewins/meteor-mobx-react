import { makeAutoObservable } from 'mobx';
import type RootStore from './RootStore.tsx'; // avoid circular dependency

export interface AlertInterface {
	message: string;
	severity: string;
}

class PageStore {
	myEnvVar = ''

	alert = undefined

	rootStore = rootStore; // allows stores to know about each other

	constructor(rootStore: RootStore) {
		makeAutoObservable(this);

		Meteor.call('page.get_MY_ENV_VAR', (error, result) => {
			this.setMyEnvVar(result);
		});
	}

	setMyEnvVar = (text: string): void => {
		this.rootStore.pageStore.myEnvVar = text;
	};

	setAlert = ({ message, severity }: AlertInterface): void => {
		this.alert = {
			message,
			severity,
		};
	};

	clearAlert = (): void => {
		this.alert = undefined;
	};
}

export default PageStore;
