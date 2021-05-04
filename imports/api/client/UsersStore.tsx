import { makeAutoObservable } from 'mobx';
import type RootStore from './RootStore.tsx'; // avoid circular dependency
import {
	AuthInterface,
	UsersInterface,
} from '../Users/users.ts';

class UsersStore {
	rootStore = rootStore; // allows stores to know about each other

	currentUserLoading = false;

	isUsernameAvailable = undefined;

	isEmailAvailable = undefined;

	isLoggedIn = undefined;

	currentUser = undefined;

	constructor(rootStore: RootStore) {
		makeAutoObservable(this);
	}

	updateCurrentUser = (newCurrentUser: Record<string, unknown>): void => {
		this.currentUser = newCurrentUser;
	};

	setCurrentUserLoading = (currentUserLoading: boolean): void => {
		this.currentUserLoading = currentUserLoading;
	};

	createReactiveUserManager = (): void => {
		this.dataManager = new ReactiveUserManager(this);
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

	login = (authInfo: AuthInterface): void => {
		const { password, user } = authInfo;

		this.rootStore.pageStore.clearAlert();

		Meteor.loginWithPassword(user, password, (error) => {
			if (error) {
				this.rootStore.pageStore.setAlert({
					'message': error.reason,
					'severity': 'error',
				});
			} else {
				console.log('login succeeded');
				//TODO navigate home
			}
			console.log('user logged in', Meteor.user());
		});
	};

	logout = (): void => {
		this.rootStore.pageStore.clearAlert();

		Meteor.logout((error) => {
			if (error) {
				this.rootStore.pageStore.setAlert({
					'message': error.reason,
					'severity': 'error',
				});
			} else {

				//TODO navigate home
			}
		});
	};
}

export default UsersStore;
