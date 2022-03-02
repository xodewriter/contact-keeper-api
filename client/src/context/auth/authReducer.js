import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_ERRORS,
} from '../types';

const authReducer = (state, action) => {
	switch (action.type) {
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				// User Data Object from res.data
				user: action.payload,
			};
		case REGISTER_SUCCESS:
			// Get res.data.token & put in local storage
			console.log('REGISTER SUCCESS', action.payload);
			localStorage.setItem('token', action.payload);
			return {
				...state,
				// Put token in the state
				...action.payload,
				// Change from null
				isAuthenticated: true,
				loading: false,
			};
		case REGISTER_FAIL:
		case AUTH_ERROR:
			// Remove any existing token from localStorage
			localStorage.removeItem('token');

			return {
				...state,
				// Reset everything, but not identical to initalState
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null,
				error: action.payload,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};

export default authReducer;
