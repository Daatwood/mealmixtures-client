import axios from 'axios';

import {
	FETCH_USER,
	FETCH_USER_SUCCESS,
	FETCH_RECIPES,
	FETCH_RECIPES_SUCCESS,
	FETCH_RECIPE,
	FETCH_RECIPE_SUCCESS,
	LOGOUT,
	FAVORITE_RECIPE_SUB,
	FAVORITE_RECIPE_ADD
} from './types';

const base = window.atob("aHR0cHM6Ly9nOWQ4bmYxd3c5LmV4ZWN1dGUtYXBpLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tL2FwaQ==");

const header = (token) => {
	return {
		headers: {
			'X-Api-Key': token,
			Authorization: 'Bearer ' + token
		}
	}
}
export const fetchUser = (provider, access_token, history) => async (dispatch) => {
	dispatch({ type: FETCH_USER, payload: {[provider]: access_token} });
	const token = Buffer.from(access_token, 'binary').toString('base64')
	const res = await axios.get(base+`/auth/login/${token}?provider=${provider}`, {
		headers: {
			'X-Api-Key': token,
			Authorization: 'Bearer ' + 'allow'
		}
	})
	dispatch({ type: FETCH_USER_SUCCESS, payload: res.data });
	history.push(res.data.success ? '/dashboard' : '/login')
};
export const userLogout = (token, history) => async (dispatch) => {
	console.log(token)
	dispatch({ type: LOGOUT });
	axios.post(base+'/auth/logout',{}, {
		headers: {
			Authorization: 'Bearer '+ token
		}
	})
	history.push('/');
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
export const addFavorite = (id, token) => async (dispatch) => {
	dispatch({ type: FAVORITE_RECIPE_ADD, payload: id });
	const res = await axios.get(base+`/favorites/${id}/add`, header(token) ).catch( (error) => {
    handleError(error);
		setTimeout(
			() => dispatch({ type: FAVORITE_RECIPE_SUB, payload: id }),
			300
		)
  });
};
export const removeFavorite = (id, token) => async (dispatch) => {
	dispatch({ type: FAVORITE_RECIPE_SUB, payload: id });
	const res = await axios.get(base+`/favorites/${id}/remove`, header(token) ).catch( (error) => {
    handleError(error);
		setTimeout(
			() => dispatch({ type: FAVORITE_RECIPE_ADD, payload: id }),
			300
		)  
	});
};

const handleError = (error) => {
	if (error.response) {
		// The request was made and the server responded with a status code
		// that falls out of the range of 2xx
		console.log(error.response.data);
		console.log(error.response.status);
	} else if (error.request) {
		// The request was made but no response was received
		// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
		// http.ClientRequest in node.js
		console.log(error.request);
	} else {
		// Something happened in setting up the request that triggered an Error
		console.log('Error', error.message);
	}
}
