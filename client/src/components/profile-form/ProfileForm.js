import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createProfile, getCurrentProfile } from '../../actions/profile';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const initialState = {
	phone: '',
	address1: '',
	address2: '',
	city: '',
	statee: '',
	zip: '',
};

const ProfileForm = ({
	profile: { profile, loading },
	createProfile,
	getCurrentProfile,
	history,
}) => {
	const [formData, setFormData] = useState(initialState);

	useEffect(() => {
		if (!profile) getCurrentProfile();
		if (!loading && profile) {
			const profileData = { ...initialState };
			for (const key in profile) {
				if (key in profileData) profileData[key] = profile[key];
			}
			setFormData(profileData);
		}
	}, [loading, getCurrentProfile, profile]);

	useEffect(() => {
		if (!profile) getCurrentProfile();
		if (!loading && profile) {
			const profileData = { ...initialState };
			for (const key in profile) {
				if (key in profileData) profileData[key] = profile[key];
			}
		}
	}, [loading, getCurrentProfile, profile]);

	const { phone, address1, address2, city, statee, zip } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		createProfile(formData, history, profile ? true : false);
	};
	return (
		<div className="outerContainer">
			<div className="col-md-12 mx-auto p-0">
				<div className="container py-1">
					<div className="col-md-12 mt-6 bg-white p-0">
						<div className="row justify-content-center">
							<div className="col-md-10 col-sm-11 col-12 mx-auto pb-5">
								<div className="card border-0 shadow-lg my-5">
									<div className="card-body p-0">
										<div className="row justify-content-center">
											<div className="col-lg-12">
												<div className="p-5">
													<Form onSubmit={onSubmit}>
														<Form.Group controlId="phone">
															<Form.Label>Phone Number*</Form.Label>
															<Form.Control
																type="text"
																placeholder="123456789"
																name="phone"
																value={phone}
																onChange={onChange}
																required
															/>
														</Form.Group>

														<Form.Group controlId="formGridAddress1">
															<Form.Label>Address*</Form.Label>
															<Form.Control
																type="text"
																placeholder="1234 Main St"
																name="address1"
																value={address1}
																onChange={onChange}
																required
															/>
														</Form.Group>

														<Form.Group controlId="formGridAddress2">
															<Form.Label>Address 2</Form.Label>
															<Form.Control
																type="text"
																placeholder="Apartment, studio, or floor"
																name="address2"
																value={address2}
																onChange={onChange}
															/>
														</Form.Group>

														<Form.Group controlId="formGridCity">
															<Form.Label>City*</Form.Label>
															<Form.Control
																type="text"
																placeholder="City"
																name="city"
																value={city}
																onChange={onChange}
																required
															/>
														</Form.Group>

														<Form.Group controlId="formGridState">
															<Form.Label>State*</Form.Label>
															<Form.Control
																type="text"
																placeholder="State"
																name="statee"
																value={statee}
																onChange={onChange}
																required
															/>
														</Form.Group>

														<Form.Group controlId="formGridZip">
															<Form.Label>Zip*</Form.Label>
															<Form.Control
																type="text"
																placeholder="Zip"
																name="zip"
																value={zip}
																onChange={onChange}
																required
															/>
														</Form.Group>

														<small>* = required field</small>
														<br />
														<div className="SubmitButtonBar">
															<Button
																id="dash-button3"
																className="btn btn-success"
																name="submit"
																type="submit"
															>
																Submit
															</Button>

															<div className="OtherButtons">
																<Link className="OtherButtons" to="/dashboard">
																	<Button id="dash-button3" variant="danger">
																		Go Back
																	</Button>
																</Link>
															</div>
														</div>
													</Form>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

ProfileForm.propTypes = {
	createProfile: PropTypes.func.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
	ProfileForm
);
