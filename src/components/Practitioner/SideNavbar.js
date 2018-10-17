/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * @Dan
 * Description: Side Navigation Bar allowing practitioner to navigate all the functionality
 * Created: 25 Jul 2018
 * Last modified: 9 Sep 2018
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth.actions';
import { Redirect, Link } from 'react-router-dom';
import LogoDiv from './LogoDiv';

class SideNavbar extends React.Component {
	constructor(props) {
		super(props);
		let idx = null;
		if (this.props.path === '/myclients') {
			idx = 0;
		} else if (this.props.path === '/profile') {
			idx = 1;
		} else if (this.props.path === '/mydocs') {
			idx = 2;
		} else if (this.props.path === '/settings') {
			idx = 3;
		} else if (this.props.path.match('^/client/[0-9].*$')) {
			idx = 0;
		}
		this.state = {
			clickedItem: idx,
		};
	}

	onItemClick = clickedItem => {
		this.setState({ clickedItem });
	};

	render() {
		let tos = ['/myclients', '/profile', '/mydocs', '/settings', '/login'];
		let firstSpans = ['fas fa-users', 'fas fa-user-md', 'fas fa-file-medical', 'fas fa-cogs', 'fas fa-sign-out-alt'];
		let secondSpans = ['My Clients', 'Profile', 'My Documents', 'Settings', 'Logout'];
		if (this.props.authenticationState.isLoginSuccess)
			return (
				<div className="left">
					<ul>
						<LogoDiv />
						{secondSpans.map((itemName, idx) => {
							if (idx === 4)
								return (
									<Link key={`navitem${idx}`} to={tos[idx]} onClick={this.props.logout}>
										<li className="item-menu nav-link">
											<span className={firstSpans[idx]} />
											<span className="menu">{itemName}</span>
										</li>
									</Link>
								);
							else if (idx === this.state.clickedItem)
								return (
									<Link key={`navitem${idx}`} to={tos[idx]} onClick={() => this.onItemClick(idx)}>
										<li className="item-menu nav-link clicked">
											<span className={firstSpans[idx]} />
											<span className="menu">{itemName}</span>
										</li>
									</Link>
								);
							else
								return (
									<Link key={`navitem${idx}`} to={tos[idx]} onClick={() => this.onItemClick(idx)}>
										<li className="item-menu nav-link">
											<span className={firstSpans[idx]} />
											<span className="menu">{itemName}</span>
										</li>
									</Link>
								);
						})}
					</ul>
				</div>
			);
		return <Redirect to="/login" />;
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
)(SideNavbar);
