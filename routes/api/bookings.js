const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const checkObjectId = require('../../middleware/checkObjectId');

const Booking = require('../../models/Booking');
const User = require('../../models/User');

// @route    POST api/bookings
// @desc     Create a booking
// @access   Private
router.post(
	'/',
	[
		auth,
		[
			check('appointmentDate', 'Appointment Date is Required').not().isEmpty(),
			check('appointmentTime', 'Appointment Time is Required').not().isEmpty(),
			check('appointmentDuration', 'Appointment Duration is Required')
				.not()
				.isEmpty(),
			check('text', 'Text is required').not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const user = await User.findById(req.user.id).select('-password');

			const newBooking = new Booking({
				appointmentDate: req.body.appointmentDate,
				appointmentTime: req.body.appointmentTime,
				appointmentDuration: req.body.appointmentDuration,
				text: req.body.text,
				name: user.name,
				lastName: user.lastName,
				email: user.email,
				user: req.user.id,
			});

			const booking = await newBooking.save();

			res.json(booking);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

// @route    GET api/bookings/admin
// @desc     Get all bookings for all users
// @access   Admin*********************************************************
router.get('/admin', async (req, res) => {
	try {
		const bookings = await Booking.find().sort({ date: 1 });
		res.json(bookings);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    GET api/bookings/user/:user_id
// @desc     Get all bookings for current user
// @access   Private
router.get(
	'/user/:user_id',
	[auth, checkObjectId('user_id')],
	async ({ params: { user_id } }, res) => {
		try {
			const bookings = await Booking.find({
				user: user_id,
			}).sort({ date: 1 });

			if (!bookings) return res.status(400).json({ msg: 'No bookings found' });

			return res.json(bookings);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

// @route    GET api/bookings/:id
// @desc     Get booking by ID
// @access   Private
router.get('/:id', [auth, checkObjectId('id')], async (req, res) => {
	try {
		const booking = await Booking.findById(req.params.id);

		if (!booking) {
			return res.status(404).json({ msg: 'Booking not found' });
		}

		res.json(booking);
	} catch (err) {
		console.error(err.message);

		res.status(500).send('Server Error');
	}
});

// @route    DELETE api/bookings/:id
// @desc     Delete a booking
// @access   Private
router.delete('/:id', [auth, checkObjectId('id')], async (req, res) => {
	try {
		const booking = await Booking.findById(req.params.id);

		if (!booking) {
			return res.status(404).json({ msg: 'Booking not found' });
		}

		// Check user
		if (booking.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'User not authorized' });
		}

		await booking.remove();

		res.json({ msg: 'Booking removed' });
	} catch (err) {
		console.error(err.message);

		res.status(500).send('Server Error');
	}
});

// @route    DELETE api/bookings/admin/:id
// @desc     Delete a booking
// @access   Admin*********************************************************
router.delete('/admin/:id/', checkObjectId('id'), async (req, res) => {
	try {
		const booking = await Booking.findById(req.params.id);

		if (!booking) {
			return res.status(404).json({ msg: 'Booking not found' });
		}

		await booking.remove();

		return res.json({ msg: 'Booking removed' });
	} catch (err) {
		console.error(err.message);

		res.status(500).send('Server Error');
	}
});

module.exports = router;
