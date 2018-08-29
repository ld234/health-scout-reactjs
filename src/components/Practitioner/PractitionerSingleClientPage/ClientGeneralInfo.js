import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoadingPage from '../../Recyclable/LoadingPage';

class ClientGeneralInfo extends Component {
	render() {
		const client = this.props.clientState.currentClient;
		if (client)
			return (
				<div className="userInfo">
					<div className="avatar mx-auto col col-lg-2 ">
						<img
							id="avatar-img"
							src={`http://localhost:8080/api${client.profilePic}`}
							className="rounded-circle img-fluid"
							alt="practitioner avatar"
						/>
					</div>
					<div className="userDetails col col-lg-10">
						<h3>
							{client.title} {client.fName} {client.lName}
						</h3>
						<div>{Math.abs(new Date(Date.now() - new Date(client.dob)).getUTCFullYear() - 1970)} years old</div>
					</div>
				</div>
			);
		else return <LoadingPage />;
	}
}

const mapStateToProps = state => {
	return {
		clientState: state.clients,
	};
};

export default connect(mapStateToProps)(ClientGeneralInfo);

/*<div id="main-hr" className="horizontal-line"> 
                        <hr />
                    </div>*/
