import { makeAutoObservable } from 'mobx';
import type RootStore from './RootStore.tsx'; // avoid circular dependency
import { UsersInterface } from '../Users/users.ts';

class UsersStore {
	rootStore = rootStore; // allows stores to know about each other

	isUsernameAvailable = undefined

	isEmailAvailable = undefined

	constructor(rootStore: RootStore) {
		makeAutoObservable(this);
	}

	createUserAccount = (userInfo: UsersInterface): void => {
		this.rootStore.pageStore.clearAlert();

		Meteor.call('users.createUserAccount', userInfo, (error, result) => {
			if (error) {
				this.rootStore.pageStore.setAlert({
					'message': error.reason,
					'severity': 'error',
				});
			} else {
				this.rootStore.pageStore.setAlert({
					'message': `User account created with username "${result.username}"`,
					'severity': 'success',
				});
			}
		});
	};
}

export default UsersStore;
