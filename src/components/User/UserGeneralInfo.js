import React, { Component } from 'react';
import { connect } from 'react-redux';
import StarRating from '../Recyclable/PracStarRating';
import LoadingPage from '../Recyclable/LoadingPage';

//https://mdbootstrap.com/img/Photos/Avatars/img (10).jpg

class UserGeneralInfo extends Component {
	render() {
		const { user } = this.props.userState;
		if (user)
			return (
				<div className="userInfo">
					<div className="avatar mx-auto col col-lg-2 ">
						<div className="view overlay">
							<img
								id="avatar-img"
								src={`http://localhost:8080/api${this.props.userState.user.profilePic}`}
								className="rounded-circle img-fluid"
								alt="practitioner avatar"
							/>
							<div id="avatar-overlay" className="rounded-circle mask flex-center rgba-stylish-light">
								<p className="white-text">Change avatar</p>
							</div>
						</div>
					</div>
					<div className="userDetails col col-lg-10">
						<h3>
							{user.title} {user.fName} {user.lName}
						</h3>
						<div className="grey-text">
							<i>{user.pracType}</i>
						</div>
						<StarRating rating={user.rating} size={22} />
					</div>
				</div>
			);
		else return <LoadingPage />;
	}
}

const mapStateToProps = state => {
	return {
		userState: state.userDetails,
	};
};

export default connect(mapStateToProps)(UserGeneralInfo);

/*<div id="main-hr" className="horizontal-line"> 
                        <hr />
                    </div>*/
