import { makeAutoObservable } from 'mobx';

class CounterStore {
	count = 0

	constructor() {
		makeAutoObservable(this);
	}

	increaseCounter(): void {
		this.count += 1;
	}
}

export default CounterStore;
