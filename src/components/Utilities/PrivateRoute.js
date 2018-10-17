/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * @Dan
 * Description: Route which forces redirection if user is not authenticated
 * Created: 22 Jul 2018
 * Last modified: 29 Jul 2018
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkAuth } from '../../actions/auth.actions';

class PrivateRoute extends React.Component {
	componentDidMount() {
		this.props.checkAuth();
	}
	render() {
		return this.props.authenticationState.isLoginSuccess ? <Route {...this.props} /> : <Redirect to="/login" />;
	}
}

const mapStateToProps = state => {
	return {
		authenticationState: state.authentication,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		checkAuth: () => dispatch(checkAuth()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PrivateRoute);
