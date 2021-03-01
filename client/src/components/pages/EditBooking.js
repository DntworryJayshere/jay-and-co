import React, { Component } from 'react';
import BookingForm from './../booking-form/BookingForm';

class EditBooking extends Component {
	render() {
		return (
			<>
				<div className="text-center align-self-center topping">
					<h2>Edit Booking</h2>
				</div>

				<BookingForm />
			</>
		);
	}
}

export default EditBooking;
