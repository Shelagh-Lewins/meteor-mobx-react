// Allow any Mobx action to navigate without needing the history object to be passed in
// https://stackoverflow.com/questions/45377854/react-router-v4-navigate-from-mobx-store-action
// I'm not sure it needs to be a Mobx store with 'observable' but it's a nice way to keep the functionality within the store and keeps things consistent.
// App.js must use Router from react-router not react-router-dom in order set a custom history
// https://github.com/ReactTraining/react-router/issues/3498
// otherwise URL will change but component not re-render.

import { makeAutoObservable } from 'mobx';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createBrowserHistory } from 'history'; // history is installed as a dependency by React Router
import type RootStore from './RootStore.tsx'; // avoid circular dependency

class NavigationStore {
	constructor(rootStore: RootStore) {
		makeAutoObservable(this);
		this.history = createBrowserHistory();
	}

	push = (location: string): void => {
		this.history.push(location);
	}

	replace = (location: string): void => {
		this.history.replace(location);
	}

	go = (n: number): void => {
		this.history.go(n);
	}

	goBack = (): void => {
		this.history.goBack();
	}

	goForward = (): void => {
		this.history.goForward();
	}
}

export default NavigationStore;
