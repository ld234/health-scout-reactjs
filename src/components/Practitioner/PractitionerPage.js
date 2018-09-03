import React, { Component } from 'react';
import { connect } from 'react-redux';
import PractitionerProfile from './PractitionerProfile';
import UserGeneralInfo from '../User/UserGeneralInfo';
import PractionerAddQualificationForm from './PractitionerAddQualificationForm';
import PractitionerEditQualificationForm from './PractitionerEditQualificationForm';
import PractitionerAddExperienceForm from './PractitionerAddExperienceForm';
import PractitionerSpecialtyList from './PractitionerSpecialtyList';
import PractitionerAddSpecialtyForm from './PractitionerAddSpecialtyForm';
import { getUserDetails } from '../../actions/user.actions';
import { logout } from '../../actions/auth.actions';
import LoadingPage from '../Recyclable/LoadingPage';
import { getQualifications } from '../../actions/qualification.actions';
import { getPracTypeSpecialties, getSpecialties } from '../../actions/specialty.actions';

class PractitionerPage extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		console.log('comp did mount');
		this.props.getUserDetails(this.props.getPracTypeSpecialties);
		this.props.getQualifications();
		this.props.getSpecialties();
	}

	render() {
		let qualifications = this.props.qualificationState.qualifications;
		// if (typeof qualifications != "undefined"
		//     && qualifications != null
		//     && qualifications.length != null
		//     && qualifications.length > 0){
		//     qualifications = [...this.props.qualificationState.qualifications];
		//     qualifications.sort( (a, b) => { return b.graduateYear.localeCompare(a.graduateYear)}) ;

		// }
		if (this.props.userState.isGetUserSuccess)
			return (
				<div id="practitioner-page" className="right animated fadeIn">
					<UserGeneralInfo />
					<div className="main-wrapper">
						<PractitionerProfile
							toggle={this.toggle}
							section="Qualifications"
							buttonID="add-qualification"
							for="qualification"
							data={qualifications}
							flag="degree"
							timeWrapper="graduateYear"
							subtext="institution"
							desc="description"
							editComponent={PractitionerEditQualificationForm}
							addComponent={PractionerAddQualificationForm}
						/>
						<PractitionerProfile
							section="Professional Experience"
							buttonID="add-experience"
							for="experience"
							flag="degree"
							timeWrapper="graduateYear"
							desc="description"
							editComponent={PractitionerEditQualificationForm}
							addComponent={PractionerAddQualificationForm}
						/>
						<PractitionerProfile
							section="Specialties"
							buttonID="add-specialty"
							for="specialty"
							addComponent={PractitionerAddSpecialtyForm}
							editComponent={null}
							list={PractitionerSpecialtyList}
						/>
					</div>
				</div>
			);
		else if (
			this.props.userState.isGetUserPending ||
			this.props.qualificationState.isGetQualificationPending ||
			this.props.specialtyState.isGetPracTypeSpecialtyPending
		) {
			return <LoadingPage />;
		} else return null;
	}
}
/*

<div className="specialty-wrapper">
							<div className="practitioner-profile-head" className="row justify-content-between">
								<div className="col col-md-8 profile-title">
									<h4>Specialties</h4>
								</div>

								<div className="horizontal-line"><hr/></div>
							</div>
							<PractitionerAddSpecialtyForm />
						</div>*/

const mapStateToProps = state => {
	return {
		authenticationState: state.authentication,
		userState: state.userDetails,
		qualificationState: state.qualifications,
		specialtyState: state.specialties,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getUserDetails: cb => dispatch(getUserDetails(cb)),
		getQualifications: () => dispatch(getQualifications()),
		getPracTypeSpecialties: pracType => dispatch(getPracTypeSpecialties(pracType)),
		getSpecialties: () => dispatch(getSpecialties()),
		logout: () => dispatch(logout()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PractitionerPage);

/*
<Input label="Institution" />
                    <Input label="Year" />
                    <TextArea label="Description" />*/
