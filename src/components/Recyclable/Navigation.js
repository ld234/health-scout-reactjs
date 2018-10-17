/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * @Dan
 * Description: Determines which navigation component to render
 * Created: 13 Aug 2018
 * Last modified: 28 Sep 2018
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Navbar from './Header/Navbar';
import SideNavbar from '../Practitioner/SideNavbar';

class Navigation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			width: window.innerWidth,
		};
	}

	render() {
		const { pathname } = this.props.location;
		if (
			pathname === '/' ||
			pathname === '/register' ||
			pathname === '/login' ||
			pathname.match('^/resetPassword.*$') ||
			pathname === '/forgotPassword' ||
			pathname.match('^/verify.*$')
		) {
			return <Navbar />;
		} else return <SideNavbar path={pathname} id="side-nav" />;
	}
}

export default withRouter(props => <Navigation {...props} />);
