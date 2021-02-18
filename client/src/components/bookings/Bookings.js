import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import BookingItem from './BookingItem';
import { getBookings } from '../../actions/booking';

const Bookings = ({ getBookings, booking: { bookings, loading } }) => {
	useEffect(() => {
		getBookings();
	}, []);

	return (
		<Fragment>
			{loading ? (
				<Spinner />
			) : (
				<Fragment>
					<div>
						{bookings.map((booking) => (
							<BookingItem key={booking._id} booking={booking} />
						))}
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

Bookings.propTypes = {
	getBookings: PropTypes.func.isRequired,
	booking: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	booking: state.booking,
});

export default connect(mapStateToProps, { getBookings })(Bookings);
