import React from 'react';
import {connect} from 'react-redux';
import {logout} from '../../actions/auth.actions';
import {Redirect} from 'react-router-dom';

class SideNavbar extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        if (this.props.authenticationState.isLoginSuccess)
        return (
                <div className="left">
                    <ul>
                        <a href="#">
                            <li className="item-menu waves-effect">
                                <span className="fas fa-users"></span> 
                                <span className="menu">My Clients</span>
                            </li>
                        </a> 
                        <a href="#">
                            <li className="item-menu">
                                <span className="fas fa-user-md"></span> 
                                <span className="menu">Profile</span>
                            </li>
                        </a>
                        <a href="#">
                            <li className="item-menu">
                                <span className="fas fa-file-medical"></span>
                                <span className="menu">My Documents</span>
                            </li>
                        </a> 
                        <a href="#">
                            <li className="item-menu">
                                <span className="fas fa-cogs"></span> 
                                <span className="menu">Settings</span>
                            </li>
                        </a>
                        <a onClick={this.props.logout}>
                            <li className="item-menu">
                                <span className="fas fa-sign-out-alt"></span> 
                                <span className="menu">Logout</span>
                            </li>
                        </a>
                    </ul>
                </div>
        );
        return <Redirect to="/login" />
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
  
  export default connect(mapStateToProps,mapDispatchToProps)(SideNavbar);