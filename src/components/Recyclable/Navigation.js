import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Navbar from './Header/Navbar';
import SideNavbar from '../Practitioner/SideNavbar';
import HamburgerButton from './HamburgerButton';

class Navigation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			width: window.innerWidth,
		};
	}

	handleWindowSizeChange = () => {
		this.setState({ width: window.innerWidth });
	};

	render() {
		const { pathname } = this.props.location;
		if (
			pathname === '/' ||
			pathname === '/register' ||
			pathname === '/login' ||
			pathname === '/resetPassword' ||
			pathname === '/forgotPassword'
		) {
			return <Navbar />;
		} /*if (this.state.width > 768) */ else return <SideNavbar path={pathname} id="side-nav" />;
		// else return (<HamburgerButton />);
	}
}

export default withRouter(props => <Navigation {...props} />);
