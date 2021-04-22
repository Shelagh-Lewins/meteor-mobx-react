import { makeAutoObservable } from 'mobx';
import type RootStore from './RootStore.tsx'; // avoid circular dependency

class CounterStore {
	count = 0

	rootStore = rootStore; // allows stores to know about each other

	constructor(rootStore: RootStore) {
		makeAutoObservable(this);
	}

	increaseCounter = (): void => {
		// we could use this.count, but we are showing use of this.rootStore
		this.rootStore.counterStore.count += 1;
	};
}

export default CounterStore;
