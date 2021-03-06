import {
	REGISTER_SUCCESS,
	REGISTER_SUBSCRIBER,
	//REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	//LOGIN_FAIL,
	LOGOUT,
	ACCOUNT_DELETED,
} from '../actions/types';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: null,
	loading: true,
	user: null,
	subscriber: null,
};

function authReducer(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case REGISTER_SUBSCRIBER:
			return {
				...state,
				subscriber: payload,
				loading: false,
			};
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: payload,
			};
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			return {
				...state,
				...payload,
				isAuthenticated: true,
				loading: false,
			};
		case ACCOUNT_DELETED:
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null,
			};
		case AUTH_ERROR:
		case LOGOUT:
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null,
			};
		default:
			return state;
	}
}

export default authReducer;
