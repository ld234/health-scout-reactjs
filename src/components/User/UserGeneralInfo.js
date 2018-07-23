import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import StarRating from '../Recyclable/PracStarRating';

//https://mdbootstrap.com/img/Photos/Avatars/img (10).jpg

class UserGeneralInfo extends Component {
    render(){
        if (this.props.userState.user){
            const {user} = this.props.userState;
            console.log('rating',user.rating);
            if (this.props.userState.user.pracType)
                return (
                    <div className="userInfo">
                        <div className="avatar mx-auto col col-lg-2">
                            <div className="view overlay">
                                <img id="avatar-img" src="https://mdbootstrap.com/img/Photos/Avatars/img (10).jpg" className="rounded-circle img-fluid" alt="practitioner avatar" />
                                <div id="avatar-overlay" className="rounded-circle mask flex-center rgba-black-light">
                                    <p className="white-text">Change avatar</p>
                                </div>
                            </div>
                        </div>
                        <div className="userDetails col col-lg-10">
                            <h3>{user.title} {user.fName} {user.lName}</h3>
                            <div>{user.pracType}</div>
                            <StarRating rating={user.rating} />
                        </div> 
                        
                    </div>
                );
        }
        else
            return <Redirect to="/login" />;
    }
}
 

const mapStateToProps = (state) => {
    return {
      userState: state.userDetails
    };
}

export default connect(mapStateToProps)(UserGeneralInfo);

/*<div id="main-hr" className="horizontal-line"> 
                        <hr />
                    </div>*/