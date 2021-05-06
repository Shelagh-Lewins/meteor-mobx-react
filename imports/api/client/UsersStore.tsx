import {
	makeAutoObservable,
	toJS,
} from 'mobx';
import type RootStore from './RootStore.tsx'; // avoid circular dependency
import {
	AuthInterface,
	ChangePasswordInterface
	UsersInterface,
} from '../Users/users.ts';

class UsersStore {
	rootStore = rootStore; // allows stores to know about each other

	isUsernameAvailable = undefined;

	isEmailAvailable = undefined;

	userId = undefined;

	user = undefined;

	usersLoading = true;

	constructor(rootStore: RootStore) {
		makeAutoObservable(this);
	}

	get isLoggedIn(): boolean {
		return !!this.userId;
	}

	get isEmailVerified(): boolean {
		if (!this.user) {
			return false;
		}

		return toJS(this.user).emails[0].verified;
	}

	setUsersLoading = (usersLoading: boolean): void => {
		this.usersLoading = usersLoading;
	};

	setUserId = (userId: string): void => {
		this.userId = userId;
	};

	clearUserId = (): void => {
		this.userId = undefined;
	};

	setUser = (user: Record<string, unknown>): void => {
		this.user = user;
	};

	clearUser = (): void => {
		this.user = undefined;
	};

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
					'message': `User account created with username "${result.username}".`,
					'severity': 'success',
				});

				this.login({
					'password': userInfo.password,
					'user': userInfo.username,
				}, false);
			}
		});
	};

	login = (authInfo: AuthInterface, clearAlert = true): void => {
		const { password, user } = authInfo;

		if (clearAlert) { // if auto login after account creation, we want to retain the "Account created" message unless there is a new one
			this.rootStore.pageStore.clearAlert();
		}

		Meteor.loginWithPassword(user, password, (error) => {
			if (error) {
				this.rootStore.pageStore.setAlert({
					'message': error.reason,
					'severity': 'error',
				});
			} else {
				this.rootStore.navigationStore.push('/');
			}
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
				this.rootStore.navigationStore.push('/');
			}
		});
	};

	resendVerificationEmail = (): void => {
		this.rootStore.pageStore.clearAlert();

		if (this.userId && this.user) {
			Meteor.call('users.sendVerificationEmail', {
				'userId': this.user._id,
			}, (error, result) => {
				if (error) {
					this.rootStore.pageStore.setAlert({
						'message': error.reason,
						'severity': 'error',
					});
				} else {
					this.rootStore.pageStore.setAlert({
						'message': `Verification email resent to "${this.user.emails[0].address}". If you don't see it, make sure to check your Junk folder`,
						'severity': 'success',
					});
				}
			});
		}
	}

	verifyEmail = (token: string): void => {
		this.rootStore.pageStore.clearAlert();

		Accounts.verifyEmail(token, (error) => {
			if (error) {
				this.rootStore.pageStore.setAlert({
					'message': error.reason,
					'severity': 'error',
				});
			} else {
				this.rootStore.pageStore.setAlert({
					'message': 'Your email address has been verified',
					'severity': 'success',
				});
			}
		});
	}

	changePassword = (passwordInfo: ChangePasswordInterface): void => {
		const { oldPassword, newPassword } = passwordInfo;

		this.rootStore.pageStore.clearAlert();

		Accounts.changePassword(oldPassword, newPassword, (error) => {
			if (error) {
				this.rootStore.pageStore.setAlert({
					'message': error.reason,
					'severity': 'error',
				});
			} else {
				this.rootStore.pageStore.setAlert({
					'message': 'Your password has been changed',
					'severity': 'success',
				});
			}
		});
	}

	forgotPassword = (email: string): void => {
		console.log('forgot password', email);
		this.rootStore.pageStore.clearAlert();

		Accounts.forgotPassword({ email }, (error) => {
			if (error) {
				this.rootStore.pageStore.setAlert({
					'message': error.reason,
					'severity': 'error',
				});
			} else {
				this.rootStore.pageStore.setAlert({
					'message': `A password reset email has been sent to ${email}. If you do not see it, please check your Junk folder`,
					'severity': 'success',
				});
			}
		});
	}

	resetPassword = (passwordInfo: resetPasswordInterface): void => {
		const { token, password } = passwordInfo;

		this.rootStore.pageStore.clearAlert();

		Accounts.resetPassword(token, password, (error) => {
			if (error) {
				this.rootStore.pageStore.setAlert({
					'message': error.reason,
					'severity': 'error',
				});
			} else {
				this.rootStore.pageStore.setAlert({
					'message': 'Your password has been reset',
					'severity': 'success',
				});
			}
		});
	}
}

export default UsersStore;
