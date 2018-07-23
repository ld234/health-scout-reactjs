import React, {Component } from 'react';
import {connect} from 'react-redux';
import {logout} from '../../../actions/auth.actions';
import {Link } from 'react-router-dom';

class Navbar extends Component {

	constructor(props) {
		super(props);
	}

	renderLoggedIn = () => {
		if(this.props.authenticationState.isLoginSuccess ){
			return (
			  <div className="navbar-collapse collapse w-100 order-3 dual-collapse2" id="navbarSupportedContent">
				<ul className="navbar-nav ml-auto">
				  <li className="nav-item">
					<span className="nav-link nav-text" >Hi {this.props.authenticationState.user.fName} </span>
				  </li>
				  <li className="nav-item">
					<a onClick={this.props.logout} className="nav-link nav-text" href="#">Logout</a>
				  </li>
				</ul>
			  </div>
			)
		}
		else{
			return (
			  <div className="navbar-collapse collapse w-100 order-3 dual-collapse2" id="navbarSupportedContent">
				<ul className="navbar-nav ml-auto">
					<li className="nav-item">
						<Link to="/register" className="nav-link nav-text" href="#">Register</Link>
					</li>
				  <li className="nav-item">
						<Link to="/login" className="nav-link nav-text" href="#">Login</Link>
				  </li>
				</ul>
			  </div>
			)
		}
	}

	render(){
		console.log('success?', this.props);
		return (
			<nav id="navigation" className="navbar navbar-expand-lg">
				<Link to="/" className="navbar-brand" >
				<img src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" width="30" height="30" className="d-inline-block align-top" alt="" />
				HealthScout
				</Link>
				{this.renderLoggedIn()}
			</nav>);
	}
}

const mapStateToProps = (state) => {
  return {
    authenticationState : state.authentication
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Navbar);
