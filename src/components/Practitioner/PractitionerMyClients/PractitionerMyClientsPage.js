import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserGeneralInfo from '../../User/UserGeneralInfo';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import '../../../../style/MyClientPage.css';
import { getClients, getNewClients, acceptConnection, chooseClient } from '../../../actions/client.view.actions';
import { getUserDetails } from '../../../actions/user.actions';
import escapeRegexCharacters from '../../Utilities/EscapeRegexCharacters';
import { Link } from 'react-router-dom';

class MyClientPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
			searchInput: '',
			modal: false,
			errorModal: false,
			justClicked: null,
		};
	}

	toggle = () => {
		this.setState({
			errorModal: !this.state.errorModal,
		});
	};

	toggle2 = () => {
		this.setState({
			modal: !this.state.modal,
		});
	};

	onChange = e => {
		this.setState({ searchInput: e.target.value });
	};

	renderClientListHead = (listTitle, count) => {
		return (
			<div className="practitioner-profile-head row justify-content-between">
				<div className="col col-md-8 profile-title">
					<h4>
						{listTitle} ({count})
					</h4>
				</div>
				<div className="horizontal-line">
					<hr />
				</div>
			</div>
		);
	};

	componentDidMount() {
		this.props.getClients();
		this.props.getNewClients();
		this.props.getUserDetails();
	}

	renderCardList = (clients, buttonText, newC) => {
		console.log('c', clients);
		if (!clients) clients = [];
		return (
			<div id="movie-card-list">
				{clients
					.filter(c => {
						return (
							c.fName.toLowerCase().match(`^.*${escapeRegexCharacters(this.state.searchInput.toLowerCase())}.*$`) ||
							c.lName.toLowerCase().match(`^.*${escapeRegexCharacters(this.state.searchInput.toLowerCase())}.*$`)
						);
					})
					.map((client, idx) => {
						return (
							<div key={`client${idx}`} className="movie-card">
								<div className="color-overlay">
									<div className="avatar mx-auto col col-lg-2 client-avatar-div">
										<div className="view overlay client-overlay">
											<img
												src={`http://localhost:8080/api${client.profilePic}`}
												className="rounded-circle img-fluid client-avatar"
												alt="client-avatar"
											/>
										</div>
									</div>
									<div className="movie-content">
										<div className="movie-header">
											<h3 className="movie-title">
												{client.title} {client.fName} {client.lName}
											</h3>
											<h4 className="movie-info">
												Last visit: {client.lastConsultation ? client.lastConsultation : 'N/A'}
											</h4>
										</div>

										<Link
											to={newC ? '/myclients' : `/client/${idx}`}
											className="btn btn-outline"
											onClick={
												newC
													? () => {
															parseInt(this.props.userState.user.availableConnections) > 0
																? this.toggle2()
																: this.toggle();
															this.setState({ justClicked: idx });
													  }
													: () => {
															this.props.chooseClient(idx);
													  }
											}
										>
											{buttonText}
										</Link>
									</div>
								</div>
							</div>
						);
					})}
			</div>
		);
	};

	render() {
		let newClient = this.props.clientState.newClients;
		let clients = this.props.clientState.clients;
		return (
			<div id="practitioner-client-page" className="right">
				<UserGeneralInfo />
				<div className="main-wrapper2">
					<div className="search-wrapper">
						<div className="search-container">
							<input onChange={this.onChange} value={this.state.searchInput} type="text" placeholder="Search..." />
							<div className="search" onClick={() => this.setState({ searchInput: '' })} />
						</div>
					</div>
					{newClient && newClient.length > 0 ? this.renderClientListHead('New Clients', newClient.length) : null}
					{newClient && newClient.length > 0 ? this.renderCardList(newClient, 'Connect with this client', true) : null}
					{clients ? this.renderClientListHead('Clients', clients.length) : null}
					{clients ? this.renderCardList(clients, 'View client', false) : null}
				</div>
				<Modal id="confirm-accept-modal" isOpen={this.state.modal} toggle={this.toggle2}>
					<ModalHeader toggle={this.toggle2}>Confirmation</ModalHeader>
					<ModalBody>Are you sure you want to accept this incoming connection?</ModalBody>
					<ModalFooter>
						<div className="buttons">
							<a onClick={this.toggle2}>Cancel</a>
							<a
								onClick={() => {
									this.props.acceptConnection(
										this.state.justClicked != null &&
										this.props.clientState.newClients &&
										this.props.clientState.newClients.length >= this.state.justClicked + 1
											? this.props.clientState.newClients[this.state.justClicked].patientUsername
											: null,
										this.state.justClicked,
										() => {
											this.props.getClients();
											this.props.getUserDetails();
										}
									);
									this.toggle2();
								}}
								className="confirm-accept"
							>
								Accept
							</a>
						</div>
					</ModalFooter>
				</Modal>
				<Modal id="client-error-modal" isOpen={this.state.errorModal} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Error!</ModalHeader>
					<ModalBody>
						You do not have enough connections available to connect. Please purchase extra connections.
					</ModalBody>
					<ModalFooter />
				</Modal>
			</div>
		);
	}
}
/*
let newClient = this.props.clientState.newClients;
        let clients =this.props.clientState.clients;
        return (
            <div id="practitioner-client-page" className="right">
                <UserGeneralInfo />
                <div className="main-wrapper2">
                    <div className="search-wrapper">
                        <div className="search-container">
                            <input onChange={this.onChange} value={this.state.searchInput} type="text" placeholder="Search..." />
                            <div className="search" onClick={() => this.setState({searchInput:""})}></div>
                        </div>
                    </div>
                    {newClient && newClient.length > 0? this.renderClientListHead("New Clients", newClient.length): null}
                    {newClient && newClient.length > 0? this.renderCardList(newClient, "Connect with this client",true): null}
                    {clients? this.renderClientListHead("Clients",clients.length): null}
                    {clients? this.renderCardList(clients, "View client",false): null}
                </div>
                <Modal id="confirm-accept-modal" isOpen={this.state.modal} toggle={this.toggle2}>
                    <ModalHeader toggle={this.toggle2}>Confirmation</ModalHeader>
                    <ModalBody>
                        Are you sure you want to accept this incoming connection?
                    </ModalBody>
                    <ModalFooter>
                        <div className="buttons">
                            <a onClick={this.toggle2} >Cancel</a>
                            <a onClick={() => {
                                this.props.acceptConnection(
                                    this.state.justClicked!=null && 
                                    this.props.clientState.newClients && 
                                    this.props.clientState.newClients.length >= this.state.justClicked + 1
                                        ? this.props.clientState.newClients[this.state.justClicked].patientUsername
                                        : null,
                                    this.state.justClicked,
                                    () => {
                                        this.props.getClients();
                                    }
                                )
                                this.toggle2();
                            }} className="confirm-accept" 
                            >Accept</a>
                        </div>
                    </ModalFooter>
                </Modal>
                <Modal id="error-modal" isOpen={this.state.errorModal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Error!</ModalHeader>
                    <ModalBody>
                        You do not have enough connections available to connect. Please purchase extra connections.
                    </ModalBody>
                    <ModalFooter>
                        
                    </ModalFooter>
                </Modal>
            </div>
        );*/

/*
<p className="movie-desc">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer scelerisque enim justo. 
                                Praesent felis urna, tempor at lectus ut, euismod volutpat mauris. 
                                </p>
                                */

const mapStateToProps = state => {
	return {
		authenticationState: state.authentication,
		userState: state.userDetails,
		clientState: state.clients,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getClients: () => dispatch(getClients()),
		getNewClients: () => dispatch(getNewClients()),
		acceptConnection: (patientUsername, idx, cb) => dispatch(acceptConnection(patientUsername, idx, cb)),
		getUserDetails: () => dispatch(getUserDetails()),
		chooseClient: i => dispatch(chooseClient(i)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MyClientPage);