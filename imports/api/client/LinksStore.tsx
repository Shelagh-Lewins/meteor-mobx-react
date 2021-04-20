import {
	makeAutoObservable,
	observable,
	toJS,
} from 'mobx';
import ReactiveDataManager from '../../../client/ReactiveDataManager.ts';
import type RootStore from './RootStore.tsx'; // avoid circular dependency

export default class LinksStore {
	// dataManager = new ReactiveDataManager(this);

	linksLoading = false;

	links = [];

	rootStore = rootStore1; // allows stores to know about each other

	showCommentsMap = observable.map();

	commentFilter = [];

	comments = [];

	constructor(rootStore1: RootStore) {
		makeAutoObservable(this);
		this.dataManager = new ReactiveDataManager(this);
	}

	updateLinks = (newLinks: array): void => {
		this.links = newLinks;
	};

	setLinksLoading = (linksLoading: boolean): void => {
		this.linksLoading = linksLoading;
	};

	// comments
	toggleShowComments = (linkId: string): void => {
		if (this.showCommentsMap.get(linkId)) {
			this.showCommentsMap.set(linkId, false);
		} else {
			this.showCommentsMap.set(linkId, true);
		}
	};

	addCommentFilterValue = (linkId: string): void => {
		const filterArray = toJS(this.commentFilter);

		if (!filterArray.includes(linkId)) {
			filterArray.push(linkId);
			this.commentFilter = filterArray;
		}
	};

	// updates examples with fresh data
	updateComments = (newComments: array): void => {
		this.comments = newComments;
	};

	setCommentsLoading = (commentsLoading: boolean): void => {
		this.commentsLoading = commentsLoading;
	};

	get linksWithComments(): array {
		const comments = toJS(this.comments);
		const links = toJS(this.links);

		// construct nested data for components
		// this seems more efficient than running a filter for each link
		const CommentsByLink = {};
		comments.forEach((comment) => {
			if (!CommentsByLink[comment.linkId]) {
				CommentsByLink[comment.linkId] = [];
			}

			CommentsByLink[comment.linkId].push(comment);
		});

		const linksWithComments = links.map((link) => {
			const newLink = { ...link, 'comments': [] }; // this is shallow copy

			if (CommentsByLink[link._id]) {
				newLink.comments = CommentsByLink[link._id].sort((a, b) => new Date(b.date) - new Date(a.date));
			}

			return newLink;
		});

		// sort on the client as this is a UI decision
		linksWithComments.sort((a, b) => {
			if (a.text < b.text) {
				return -1;
			}
			if (a.text > b.text) {
				return 1;
			}
			return 0;
		});

		return linksWithComments;
	}
}
