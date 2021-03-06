import { makeAutoObservable } from 'mobx';
import type RootStore from './RootStore.tsx'; // avoid circular dependency

class CounterStore {
	count = 0

	constructor(rootStore: RootStore) {
		makeAutoObservable(this);
		this.rootStore = rootStore; // allows stores to know about each other
	}

	increaseCounter(): void {
		this.rootStore.counterStore.count += 1;
	}
}

export default CounterStore;
