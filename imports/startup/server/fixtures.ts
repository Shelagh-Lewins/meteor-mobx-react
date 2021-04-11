import { Comments } from '../../api/Comments/comments.ts';
import { Links } from '../../api/Links/links.ts';

function insertLink(title: string, url: string) {
	Links.insert({ title, url, 'createdAt': new Date() });
}

function insertComment(text: string, linkId: string) {
	Comments.insert({ text, linkId, 'createdAt': new Date() });
}

Meteor.startup(() => {
	// If the Links collection is empty, add some data.
	if (Links.find().count() === 0) {
		insertLink(
			'Do the Tutorial',
			'https://www.meteor.com/tutorials/react/creating-an-app',
		);

		insertLink(
			'Follow the Guide',
			'http://guide.meteor.com',
		);

		insertLink(
			'Read the Docs',
			'https://docs.meteor.com',
		);

		insertLink(
			'Discussions',
			'https://forums.meteor.com',
		);
	}

	/**
		* Returns a random integer between min (inclusive) and max (inclusive).
		* The value is no lower than min (or the next integer greater than min
		* if min isn't an integer) and no greater than max (or the next integer
		* lower than max if max isn't an integer).
		* Using Math.round() will give you a non-uniform distribution!
	*/
	function getRandomInt(min, max) {
		const min1 = Math.ceil(min);
		const max1 = Math.floor(max);
		return Math.floor(Math.random() * (max1 - min1 + 1)) + min1;
	}

	// if the comments collection is empty, add some data
	if (Comments.find().count() === 0) {
		let count = 0;

		Links.find().fetch().forEach((link) => {
			numberOfComments = getRandomInt(1, 5);

			for (let i = 0; i < numberOfComments; i += 1) {
				insertComment(
					`This is comment number ${count}`,
					link._id,
				);
				count += 1;
			}
		});
	}
});
