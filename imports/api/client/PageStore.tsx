import { makeAutoObservable } from 'mobx';
import type RootStore from './RootStore.tsx'; // avoid circular dependency

export interface AlertInterface {
	message: string;
	severity: string;
}

class PageStore {
	myEnvVar = ''

	alert = undefined;

	rootStore = rootStore; // allows stores to know about each other

	waiting = false;

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

	setWaiting = (): void => {
		this.rootStore.pageStore.waiting = true;
	};

	setWaitingFalse = (): void => {
		this.rootStore.pageStore.waiting = false;
	};

	clearWaiting = (): void => {
		// this should not be necessary, but makes absolutely certain the state will be cleared after the current loop is finished, i.e. after the 'waiting' state has been set true, to avoid uncleared spinner.
		setTimeout(() => {
			// use an action to observe strict mode
			this.rootStore.pageStore.setWaitingFalse();
		}, 1);
	};
}

export default PageStore;
