function isOwner(user, recipe) {
	if (!user || !recipe) return false;
	return user.id === recipe._user;
}
export default isOwner;
