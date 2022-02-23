import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';

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

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: null,
	loading: true,
	user: null,
	error: null,
};

const AuthState = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, initialState);

	// Load User

	// Register User
	const register = async formData => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const res = await axios.post('/api/users', formData, config);

			// Pass
			dispatch({
				type: REGISTER_SUCCESS,
				// response is the token from the backend (see routes/users POST)
				// res.json({ msg: 'Registered a user', token });
				payload: res.data,
			});
		} catch (err) {
			// Fail
			dispatch({
				type: REGISTER_FAIL,
				// response is the token from the backend (see routes/users POST)
				// res.status(500).json({ serverError: err.message });
				// response, not res, b/c response is a property of the axios error object
				payload: err.response.data.msg,
			});
		}
	};

	// Login User

	// Logout

	// Clear Errors
	const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				user: state.user,
				error: state.error,
				register,
				clearErrors,
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthState;
