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
		console.log('rerenders', this.state.clickedItem);

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

/*
<Link to="/myclients">
                            <li className="item-menu nav-link">
                                <span className="fas fa-users"></span> 
                                <span className="menu">My Clients</span>
                            </li>
                        </Link> 
                        <Link to="/profile">
                            <li className="item-menu nav-link">
                                <span className="fas fa-user-md"></span> 
                                <span className="menu">Profile</span>
                            </li>
                        </Link> 
                        <Link to="/mydocs">
                            <li className="item-menu nav-link">
                                <span className="fas fa-file-medical"></span>
                                <span className="menu">My Documents</span>
                            </li>
                        </Link> 
                        <Link to="/settings">
                            <li className="item-menu nav-link">
                                <span className="fas fa-cogs"></span> 
                                <span className="menu">Settings</span>
                            </li>
                        </Link>
                        <a onClick={this.props.logout}>
                            <li className="item-menu nav-link">
                                <span className="fas fa-sign-out-alt"></span> 
                                <span className="menu">Logout</span>
                            </li>
                        </a>
                        */
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
