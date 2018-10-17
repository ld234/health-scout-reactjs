/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * @Tenzin
 * Description: Practitioner's details form (business name, medicare provider number etc.)
 * Created: 13 Jul 2018
 * Last modified: 29 Aug 2018
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Popover, PopoverHeader, PopoverBody } from 'mdbreact';

const PractitionerPage = props => {
	let inputClassNameAtt = 'form-control has-warning';
	let inputClassError = ' is-invalid';
	let label = {
		firstName: 'First name',
		lastName: 'Last name',
		gender: 'Gender',
		title: 'Title',
		dob: 'Date of birth',
		pracType: 'Practitioner Type',
		serviceProvided: 'Service Provided',
		abn: 'ABN',
		medicareProNum: 'Medicare Provider Number',
		accreditedBodies: 'Accredited Bodies',
		businessName: 'Business name',
		businessAddress: 'Business addresss',
		description: 'Description',
		selectedImg: 'Profile Pic',
	};

	return (
		<div className="signup-form-Body-Container">
			<div className="signup-PersonalInfo">
				<div className="row">
					<div className="col-md-3">
						<label className="grey-text">{label.title}</label>
						<select
							className={props.errors.title ? inputClassNameAtt.concat(inputClassError) : inputClassNameAtt}
							value={props.title}
							name="title"
							onChange={props.onChange}
							onClick={props.onClick}
						>
							<option value="" disabled defaultValue>
								Select title
							</option>
							<option value="Miss.">Miss.</option>
							<option value="Mrs.">Mrs.</option>
							<option value="Mr.">Mr.</option>
							<option value="Ms.">Ms.</option>
							<option value="Dr.">Dr.</option>
							<option value="Prof.">Prof.</option>
						</select>
						<label className="errorMsg">{props.errors.title}</label>
					</div>
					<div className="col-md-9" />
					<div className="col-md-6">
						<label className="grey-text">{label.firstName}</label>
						<input
							type="text"
							className={props.errors.firstName ? inputClassNameAtt.concat(inputClassError) : inputClassNameAtt}
							name="firstName"
							value={props.firstName}
							onChange={props.onChange}
							onBlur={props.onBlur}
							onClick={props.onClick}
							placeholder="first name"
						/>
						<label className="errorMsg">{props.errors.firstName}</label>
					</div>
					<div className="col-md-6">
						<label className="grey-text">{label.lastName}</label>
						<input
							type="text"
							className={props.errors.lastName ? inputClassNameAtt.concat(inputClassError) : inputClassNameAtt}
							name="lastName"
							value={props.lastName}
							onChange={props.onChange}
							onBlur={props.onBlur}
							onClick={props.onClick}
							placeholder="last name"
						/>
						<label className="errorMsg">{props.errors.lastName}</label>
					</div>

					<div className="col-md-6">
						<label className="grey-text">{label.dob}</label>
						<input
							type="date"
							className={props.errors.dob ? inputClassNameAtt.concat(inputClassError) : inputClassNameAtt}
							name="dob"
							value={props.dob}
							onChange={props.onChange}
							onBlur={props.onBlur}
							onClick={props.onClick}
						/>
						<label className="errorMsg">{props.errors.dob}</label>
					</div>

					<div className="col-md-6">
						<label className="grey-text">{label.gender}</label>
						<select
							className={props.errors.gender ? inputClassNameAtt.concat(inputClassError) : inputClassNameAtt}
							value={props.gender}
							name="gender"
							onChange={props.onChange}
							onClick={props.onClick}
						>
							<option value="" disabled defaultValue>
								Select Gender
							</option>
							<option value="Male">Male</option>
							<option value="Female">Female</option>
							<option value="Other">Other</option>
						</select>
						<label className="errorMsg">{props.errors.gender}</label>
					</div>
				</div>
			</div>
			<hr />
			<div className="signup-BusinessInfo">
				<div className="row">
					<div className="col-md-6">
						<label className="grey-text">{label.pracType}</label>
						<select
							className={props.errors.pracType ? inputClassNameAtt.concat(inputClassError) : inputClassNameAtt}
							value={props.pracType}
							name="pracType"
							onChange={props.onChange}
							onClick={props.onClick}
						>
							<option value="" disabled defaultValue>
								Select practitioner type
							</option>
							<option value="Dietitian">Dietitian</option>
							<option value="Exercise physiologist">Exercise physiologist</option>
							<option value="Physiotherapist">Physiotherapist</option>
						</select>
						<label className="errorMsg">{props.errors.pracType}</label>
					</div>

					<div className="col-md-6">
						<label className="grey-text">{label.serviceProvided}</label>
						<input
							type="text"
							className={props.errors.serviceProvided ? inputClassNameAtt.concat(inputClassError) : inputClassNameAtt}
							name="serviceProvided"
							value={props.serviceProvided}
							onChange={props.onChange}
							onBlur={props.onBlur}
							onClick={props.onClick}
							placeholder="Weight loss"
						/>
						<label className="errorMsg">{props.errors.serviceProvided}</label>
					</div>

					<div className="col-md-6">
						<label className="grey-text"> {label.accreditedBodies} </label>
						<input
							type="text"
							className={props.errors.accreditedBodies ? inputClassNameAtt.concat(inputClassError) : inputClassNameAtt}
							name="accreditedBodies"
							value={props.accreditedBodies}
							onChange={props.onChange}
							onBlur={props.onBlur}
							onClick={props.onClick}
							placeholder="University of Wollongong"
						/>
						<label className="errorMsg">{props.errors.accreditedBodies}</label>
					</div>

					<div className="col-md-6">
						<label className="grey-text labelPopover">
							{label.medicareProNum}
							<Popover
								className="popOver"
								placement="left"
								popoverBody={
									<div className="popOverContainer">
										<i className="fas fa-question" />
									</div>
								}
							>
								<PopoverBody>
									a 6 digit number that identifies you, such as 123456. 2 other characters that identify your practice
									location, such as 1A
								</PopoverBody>
							</Popover>
						</label>
						<input
							type="text"
							className={props.errors.medicareProNum ? inputClassNameAtt.concat(inputClassError) : inputClassNameAtt}
							name="medicareProNum"
							value={props.medicareProNum}
							onChange={props.onChange}
							onBlur={props.onBlur}
							onClick={props.onClick}
							placeholder="XXXXXXAB"
						/>
						<label className="errorMsg">{props.errors.medicareProNum}</label>
					</div>

					<div className="col-md-6">
						<label className="grey-text labelPopover">
							{label.abn}
							<Popover
								className="popOver"
								placement="right"
								popoverBody={
									<div className="popOverContainer">
										<i className="fas fa-question" />
									</div>
								}
							>
								<PopoverBody>
									{' '}
									unique 11 digit number that identifies your business or organisation to the government and community
								</PopoverBody>
							</Popover>
						</label>
						<input
							type="text"
							className={props.errors.abn ? inputClassNameAtt.concat(inputClassError) : inputClassNameAtt}
							name="abn"
							value={props.abn}
							onChange={props.onChange}
							onBlur={props.onBlur}
							onClick={props.onClick}
							placeholder="XXXXXXXXXXX"
						/>
						<label className="errorMsg">{props.errors.abn}</label>
					</div>

					<div className="col-md-6">
						<label className="grey-text"> {label.businessName} </label>
						<input
							type="text"
							className={props.errors.businessName ? inputClassNameAtt.concat(inputClassError) : inputClassNameAtt}
							name="businessName"
							value={props.businessName}
							onChange={props.onChange}
							onBlur={props.onBlur}
							onClick={props.onClick}
							placeholder=""
						/>
						<label className="errorMsg">{props.errors.businessName}</label>
					</div>
					<div className="col-md-12">
						<div className="input">
							<label className="grey-text"> {label.businessAddress} </label>
							<input
								type="text"
								className={props.errors.businessAddress ? inputClassNameAtt.concat(inputClassError) : inputClassNameAtt}
								name="businessAddress"
								value={props.businessAddress}
								onChange={props.onChange}
								onBlur={props.onBlur}
								onClick={props.onClick}
								placeholder="21 streetname etc"
							/>
							<label className="errorMsg">{props.errors.businessAddress}</label>
						</div>
					</div>

					<div className="col-md-12">
						<div className=" input">
							<label className="grey-text"> {label.selectedImg} </label>
							<div className="custom-file">
								<input
									type="file"
									className="custom-file-input is-invlaid"
									name="selectedImg"
									onClick={props.onClick}
									onChange={props.onChange}
									required
								/>
								<label className={props.errors.selectedImg ? 'custom-file-label' : 'custom-file-label is-invalid'}>
									{props.filename != '' ? props.filename : 'Choose profile image... '}
								</label>
							</div>
							<label className="errorMsg">{props.errors.selectedImg}</label>
						</div>
					</div>

					<div className="col-md-12">
						<div className="textArea">
							<label className="grey-text">{label.description}</label>
							<textarea
								className={props.errors.description ? inputClassNameAtt.concat(inputClassError) : inputClassNameAtt}
								rows="7"
								name="description"
								onClick={props.onClick}
								onChange={props.onChange}
								onBlur={props.onBlur}
								placeholder="Enter description here..."
							/>
							<label className="errorMsg">{props.errors.description}</label>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PractitionerPage;
