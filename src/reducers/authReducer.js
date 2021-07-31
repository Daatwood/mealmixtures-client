import _, { map } from 'underscore';
import { 
  FETCH_USER, 
  FETCH_USER_SUCCESS, 
  LOGOUT,
	FAVORITE_RECIPE_ADD,
	FAVORITE_RECIPE_SUB,
} from "../actions/types";
const INITIAL_STATE = { user: null, provider: {}, loading: false, favorites: [], token: null };
export default function(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_USER:
      return { ...state, user: null, provider: payload, loading: true };
    case FETCH_USER_SUCCESS:
      return { ...state, user: payload, loading: false, favorites: payload.favorites, token: payload.session };
    case LOGOUT:
      return INITIAL_STATE;
    case FAVORITE_RECIPE_SUB:
      return {
        ...state,
        favorites: _.without(state.favorites, payload),
      }
    case FAVORITE_RECIPE_ADD:
      return {
        ...state,
        favorites: (state.favorites || []).concat(payload)
      }
    default:
      return state;
  }
}
