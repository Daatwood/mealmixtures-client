function isFavorite(user, recipe) {
	return +(user ? user.favorites && user.favorites.indexOf(recipe.id) !== -1 : false);
}
export default isFavorite;
