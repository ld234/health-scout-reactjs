import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class PrivateRoute extends React.Component {
	render() {
		return this.props.authenticationState.isLoginSuccess ? <Route {...this.props} /> : <Redirect to="/login" />;
	}
}

const mapStateToProps = state => {
	return {
		authenticationState: state.authentication,
	};
};

const mapStateTo = state => {
	return {
		authenticationState: state.authentication,
	};
};

export default connect(mapStateToProps)(PrivateRoute);
