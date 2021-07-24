import axios from 'axios';

import {
	FETCH_USER,
	FETCH_RECIPES,
	FETCH_RECIPES_SUCCESS,
	FETCH_RECIPES_FAILURE,
	FETCH_RECIPE,
	FETCH_RECIPE_SUCCESS,
	FETCH_RECIPE_FAILURE
} from './types';

const base = "https://api.mealmixtures.com";

export const fetchUser = () => async (dispatch) => {
	const res = await axios.get(base+'/current_user');
	dispatch({ type: FETCH_USER, payload: res.data });
};
export const fetchRecipes = () => async (dispatch) => {
	dispatch({ type: FETCH_RECIPES });
	const res = await axios.get(base+'/recipes');
	dispatch({ type: FETCH_RECIPES_SUCCESS, payload: res.data });
};
export const fetchUserRecipes = () => async (dispatch) => {
	dispatch({ type: FETCH_RECIPES });
	const res = await axios.get(base+'/recipes');
	dispatch({ type: FETCH_RECIPES_SUCCESS, payload: res.data });
};
export const fetchFavoriteRecipes = () => async (dispatch) => {
	dispatch({ type: FETCH_RECIPES });
	const res = await axios.get(base+'/recipes/favorite');
	dispatch({ type: FETCH_RECIPES_SUCCESS, payload: res.data });
};
export const fetchRecipe = (id) => async (dispatch) => {
	dispatch({ type: FETCH_RECIPE });
	const res = await axios.get(base+'/recipes/' + id);
	dispatch({ type: FETCH_RECIPE_SUCCESS, payload: res.data });
};
export const submitRecipe = (values, history) => async (dispatch) => {
	const res = await axios.put(base+'/recipes', values);
	history.push('/recipes/' + res.data.id);
	dispatch({ type: FETCH_RECIPE_SUCCESS, payload: res.data });
};
export const updateRecipe = (values, history) => async (dispatch) => {
	const res = await axios.put(base+'/recipes/' + values.id, values);
	history.push('/recipes/' + res.data.id);
	dispatch({ type: FETCH_RECIPE_SUCCESS, payload: res.data });
};
export const deleteRecipe = (id, history) => async (dispatch) => {
	const res = await axios.delete(base+'/recipes/' + id);
	history.push('/dashboard');
};
export const addFavorite = (id) => async (dispatch) => {
	const res = await axios.get(base+`/favorites/${id}/add`);
	dispatch({ type: FETCH_USER, payload: res.data });
};
export const removeFavorite = (id) => async (dispatch) => {
	const res = await axios.get(base+`/favorites/${id}/remove`);
	dispatch({ type: FETCH_USER, payload: res.data });
};
