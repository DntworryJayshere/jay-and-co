import api from '../utils/api';
import { setAlert } from './alert';
import {
	// GET_BOOKING,
	GET_BOOKINGS,
	GET_BOOKINGSADMIN,
	BOOKING_ERROR,
	DELETE_BOOKING,
	ADD_BOOKING,
} from './types';

// *Route is functional but not currently in use by the application
// Get booking by ID
// export const getBookingById = (id) => async (dispatch) => {
// 	try {
// 		const res = await api.get(`/bookings/${id}`);

// 		dispatch({
// 			type: GET_BOOKING,
// 			payload: res.data,
// 		});
// 	} catch (err) {
// 		dispatch({
// 			type: BOOKING_ERROR,
// 			payload: { msg: err.response.statusText, status: err.response.status },
// 		});
// 	}
// };

// Get all bookings for current user
export const getBookings = (_id) => async (dispatch) => {
	try {
		const res = await api.get(`/bookings/user/${_id}`);

		dispatch({
			type: GET_BOOKINGS,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: BOOKING_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Get all bookings
export const getBookingsAdmin = () => async (dispatch) => {
	try {
		const res = await api.get('/bookings/admin');

		dispatch({
			type: GET_BOOKINGSADMIN,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: BOOKING_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Delete booking
export const deleteBooking = (id) => async (dispatch) => {
	try {
		await api.delete(`/bookings/${id}`);

		dispatch({
			type: DELETE_BOOKING,
			payload: id,
		});

		dispatch(setAlert('Booking Removed', 'success'));
	} catch (err) {
		dispatch({
			type: BOOKING_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

export const deleteBookingAdmin = (id) => async (dispatch) => {
	try {
		await api.delete(`/bookings/admin/${id}`);

		dispatch({
			type: DELETE_BOOKING,
			payload: id,
		});

		dispatch(setAlert('Booking Removed', 'success'));
	} catch (err) {
		dispatch({
			type: BOOKING_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Add booking
export const addBooking = (formData) => async (dispatch) => {
	try {
		const res = await api.post('/bookings', formData);

		dispatch({
			type: ADD_BOOKING,
			payload: res.data,
		});

		dispatch(setAlert('Booking Created & Confirmation Email Sent', 'success'));
	} catch (err) {
		dispatch({
			type: BOOKING_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};
