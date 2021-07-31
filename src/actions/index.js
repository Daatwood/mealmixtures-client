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

const base = 'https://api.mealmixtures.com'

const fetchClient = (token) => {
  const defaultOptions = {
    baseURL: base,
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Create instance
  let instance = axios.create(defaultOptions);

  // Set the AUTH token for any request
  instance.interceptors.request.use(function (config) {
    config.headers.Authorization =  token ? `${token}` : '';
    return config;
  });

  return instance;
};

export const securedTest = (token) => async (dispatch) => {
	// dispatch({ type: 'test_start', payload: null });
	// axios.defaults.headers.common['Authorization'] = token;
	console.log(token)
	const res = await fetchClient(token).post(base+'/test?debug=true',{}).catch(handleError);
	// dispatch({ type: 'test_end', payload: res.data });
};

export const fetchUser = (provider, access_token, history) => async (dispatch) => {
	dispatch({ type: FETCH_USER, payload: {[provider]: access_token} });
	const token = Buffer.from(access_token, 'binary').toString('base64')
	const res = await axios.get(base+`/auth/login/${token}?provider=${provider}`).catch(handleError)
	dispatch({ type: FETCH_USER_SUCCESS, payload: res.data });
	history.push(res.data.success ? '/dashboard' : '/login')
};
export const userLogout = (token, history) => async (dispatch) => {
	dispatch({ type: LOGOUT });
	await fetchClient(token).post(base+'/auth/logout',{}).catch(handleError)
	history.push('/');
};
export const fetchRecipes = () => async (dispatch) => {
	dispatch({ type: FETCH_RECIPES });
	const res = await axios.get(base+'/recipes');
	dispatch({ type: FETCH_RECIPES_SUCCESS, payload: res.data });
};
export const fetchUserRecipes = () => async (dispatch) => {
	dispatch({ type: FETCH_RECIPES });
	const res = await axios.get(base+'/recipes').catch(handleError);
	dispatch({ type: FETCH_RECIPES_SUCCESS, payload: res.data });
};
export const fetchFavoriteRecipes = (token) => async (dispatch) => {
	dispatch({ type: FETCH_RECIPES });
	const res = await fetchClient(token).get(base+'/favorites');
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
	const res = await fetchClient(token).post(base+`/favorites/${id}/add`,{}).catch(handleError);
	if (res && res.status === 200 ) 
		dispatch({ type: FAVORITE_RECIPE_ADD, payload: id });
};
export const removeFavorite = (id, token) => async (dispatch) => {
	const res = await fetchClient(token).post(base+`/favorites/${id}/remove`,{}).catch(handleError);
	if (res && res.status === 200 ) 
		dispatch({ type: FAVORITE_RECIPE_SUB, payload: id });
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
