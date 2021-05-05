// used to check parameters supplied to methods and publications
export default nonEmptyStringCheck = Match.Where((x) => {
	check(x, String);
	return x !== '';
});
