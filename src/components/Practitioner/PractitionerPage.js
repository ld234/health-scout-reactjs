import React, {Component} from 'react';
import { connect } from 'react-redux';
import PractitionerProfile from './PractitionerProfile';
import UserGeneralInfo from '../User/UserGeneralInfo';
import { Input, TextArea } from 'mdbreact';
import PractionerAddQualificationForm from './PractitionerAddQualificationForm';
import PractitionerEditQualificationForm  from './PractitionerEditQualificationForm';
import Timeline from '../Recyclable/Timeline';
import PractitionerAddExperienceForm from './PractitionerAddExperienceForm';
import { getUserDetails } from '../../actions/user.actions';
import { logout } from '../../actions/auth.actions';
import { Redirect } from 'react-router-dom';
import LoadingPage from '../Recyclable/LoadingPage';
import { getQualifcations } from '../../actions/qualification.actions';

class PractitionerPage extends Component{
    constructor (props){
        super(props);
    }

    componentDidMount(){
        this.props.getUserDetails();
        this.props.getQualifications();
    }

    render(){
        let qualifications = this.props.qualificationState.qualifications;
        if (typeof qualifications != "undefined"
            && qualifications != null
            && qualifications.length != null
            && qualifications.length > 0){
            qualifications = [...this.props.qualificationState.qualifications];
            qualifications.sort( (a, b) => { return b.graduateYear.localeCompare(a.graduateYear)}) ;
            
        }
        if (this.props.userState.isGetUserSuccess)
            return (
                <div id="practitioner-page" className="right">
                    <UserGeneralInfo />
                    <div className="main-wrapper" >
                        <PractitionerProfile toggle={this.toggle} section="Qualification" 
                            buttonID="add-qualification" 
                            modalTitle="Add qualification"
                            bodyComponent={<Timeline data={qualifications} 
                                        flag="degree" 
                                        timeWrapper="graduateYear" 
                                        desc="description"
                                        modalTitle="Edit qualification"
                                        for="qualification"><PractitionerEditQualificationForm /></Timeline>}>
                            <PractionerAddQualificationForm />
                        </PractitionerProfile>
                        <PractitionerProfile section="Professional Experience" buttonID="add-experience" modalTitle="Add experience">
                            <PractitionerAddExperienceForm />
                        </PractitionerProfile>
                    </div>
                </div>
            );
        else if (this.props.userState.isGetUserPending){
            return <LoadingPage />
        }
        else return null;
    }
}

const mapStateToProps = (state) => {
    return {
        authenticationState: state.authentication,
        userState: state.userDetails,
        qualificationState: state.qualifications,
    };
}
  
const mapDispatchToProps = (dispatch) => {
    return {
        getUserDetails: () => dispatch(getUserDetails()),
        getQualifications: () => dispatch(getQualifcations()),
        logout : () => dispatch(logout())
    };
}
  
export default connect(mapStateToProps,mapDispatchToProps)(PractitionerPage);

/*
<Input label="Institution" />
                    <Input label="Year" />
                    <TextArea label="Description" />*/