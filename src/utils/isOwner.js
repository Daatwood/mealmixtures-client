// TODO: tie recipe ownership to id
function isOwner(user, recipe) {
	if (!user || !recipe) return false;
	return user.email === recipe.owner;
}
export default isOwner;
