/**
 * GET token from route
 * 1. Token is stored in Request Headers
 * -  DevTools -> Network -> auth.js to verify "Authorization" header
 * 2. Axios has a tool to easily grab the token from the headers
 * 3. Axios can grab other properties from the headers as well
 */

import axios from 'axios';

const setAuthToken = token => {
	// If setAuthToken is called and a token was passed as an argument
	// In AuthState.js uses setAuthToken(localStorage.token);
	// Where localStore.token is the token
	if (token) {
		// console.log('setAuth AUTHORIZED:', token);
		// console.log('setAuth AUTHORIZED:', typeof token);
		// Set to whatever the token is
		axios.defaults.headers.common['Authorization'] = token;
	} else {
		// console.log('setAuth NOT AUTHORIZED', token);
		// console.log('setAuth NOT AUTHORIZED', typeof token);
		// Delete Authorization if no token was passed in
		delete axios.defaults.headers.common['Authorization'];
	}
};

export default setAuthToken;
