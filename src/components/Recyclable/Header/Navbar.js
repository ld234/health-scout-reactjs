import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../../actions/auth.actions';
import { Link } from 'react-router-dom';

class Navbar extends Component {
	constructor(props) {
		super(props);
	}

	renderLoggedIn = () => {
		if (this.props.authenticationState.isLoginSuccess) {
			return (
				<div className="navbar-collapse collapse w-100 order-3 dual-collapse2" id="navbarSupportedContent">
					<ul className="navbar-nav ml-auto">
						<li className="nav-item">
							<span className="nav-text nav-link" id="greetings">
								Hi {this.props.authenticationState.user.fName}{' '}
							</span>
						</li>
						<li className="nav-item navLink">
							<Link to="/myclients" className="nav-link waves-effect">
								Dashboard
							</Link>
						</li>
						<li className="nav-item navLink">
							<Link to="/login" onClick={this.props.logout} className="nav-link" href="#">
								Logout
							</Link>
						</li>
					</ul>
				</div>
			);
		} else {
			return (
				<div className="navbar-collapse collapse w-100 order-3 dual-collapse2" id="navbarSupportedContent">
					<ul className="navbar-nav ml-auto">
						<li className="nav-item navLink">
							<Link to="/login" className="nav-link waves-effect">
								Login
							</Link>
						</li>
						<li className="nav-item navLink">
							<Link to="/register" className="nav-link waves-effect">
								Register
							</Link>
						</li>
					</ul>
				</div>
			);
		}
	};
	//https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg
	render() {
		return (
			<nav id="navigation" className="animated fadeInDown navbar navbar-expand-lg">
				<Link to="/" className="navbar-brand">
					<img
						id="nav-logo"
						src="../../../../style/img/healthscout_logo.png"
						background-color="white"
						width="22"
						height="30"
						className="d-inline-block align-top"
						alt=""
					/>
					HealthScout
				</Link>
				{this.renderLoggedIn()}
			</nav>
		);
	}
}

const mapStateToProps = state => {
	return {
		authenticationState: state.authentication,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		logout: () => dispatch(logout()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Navbar);
