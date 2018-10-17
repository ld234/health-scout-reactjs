/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * @Tenzin
 * Description: Helper to validate registration form data
 * Created: 29 Jul 2018
 * Last modified: 28 Aug 2018
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
import Validator from 'validator';
import _ from 'lodash';
import moment from 'moment';

export function validateFirstPageRegister(data) {
	let errors = {};
	if (_.isEmpty(data.username)) {
		errors.username = '*Username required';
	}
	if (data.username.length < 8) {
		errors.username = '*Username must contain more than 8 characters';
	}
	if (!Validator.isEmail(data.email)) {
		errors.email = 'Email is invalid';
	}
	if (_.isEmpty(data.newPassword)) {
		errors.newPassword = '*New password required';
	} else if (data.newPassword.length < 8) {
		errors.newPassword = 'Password needs to have at least 8 characters';
	} else if (!/\d/.test(data.newPassword)) {
		errors.newPassword = 'Password needs to contain at least 1 digit.';
	}
	if (_.isEmpty(data.confirmPassword)) {
		errors.confirmPassword = '*Confirm password required';
	}
	if (!Validator.equals(data.newPassword, data.confirmPassword)) {
		errors.confirmPassword = 'Passwords must match';
	}
	return {
		errors,
		isValid: _.isEmpty(errors),
	};
}

export function validateSecondPageRegister(data) {
	let errors = {};
	if (_.isEmpty(data.firstName)) {
		errors.firstName = '*First name required';
	}
	if (_.isEmpty(data.lastName)) {
		errors.lastName = '*last name required';
	}

	if (_.isEmpty(data.dob)) {
		errors.dob = '*Dob required';
	}
	if (_.isEmpty(data.serviceProvided)) {
		errors.serviceProvided = '*Service provided required';
	}
	if (_.isEmpty(data.abn)) {
		errors.abn = '*ABN required';
	}
	if (_.isEmpty(data.medicareProNum)) {
		errors.medicareProNum = '*Medical provider number required';
	}
	if (_.isEmpty(data.accreditedBodies)) {
		errors.accreditedBodies = '*Accredited required';
	}
	if (_.isEmpty(data.businessName)) {
		errors.businessName = '*Business name required';
	}
	if (_.isEmpty(data.description)) {
		errors.description = '*description required';
	}
	if (_.isEmpty(data.businessAddress)) {
		errors.businessAddress = '*Business address required';
	}
	if (_.isEmpty(data.gender)) {
		errors.gender = '*Gender required';
	}
	if (_.isEmpty(data.title)) {
		errors.title = '*Title required';
	}
	if (_.isEmpty(data.pracType)) {
		errors.pracType = '*Pracitioner type required';
	}
	if (data.selectedImg == null) {
		errors.selectedImg = '*Profile Picture required';
	}

	return {
		errors,
		isValid: _.isEmpty(errors),
	};
}

export function validateThirdPageRegister(data) {
	let errors = {};

	return {
		errors,
		isValid: _.isEmpty(errors),
	};
}
export function validateFourthPageRegister(data) {
	let errors = {};

	return {
		errors,
		isValid: _.isEmpty(errors),
	};
}

export function validateRegister(data, page) {
	if (typeof page === 'number' && page >= 0) {
		switch (page) {
			case 0: {
				return validateFirstPageRegister(data);
			}
			case 1: {
				return validateSecondPageRegister(data);
			}
			case 2: {
				return validateThirdPageRegister(data);
			}
			case 3: {
				return validateFourthPageRegister(data);
			}
		}
	}
}
