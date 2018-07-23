import React from 'react';
import { Route,Redirect } from "react-router-dom";
import {connect} from 'react-redux';
import { checkAuth } from "../../actions/auth.actions";

class PrivateRoute extends React.Component{
    render() {
        return (
            this.props.authenticationState.isLoginSuccess
            ? <Route {...this.props} />
            : <Redirect to="/login" />
        )
    }
    
}

const mapStateToProps = (state) => {
    return {
      authenticationState: state.authentication
    };
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      checkAuth: () => dispatch(checkAuth())
    };
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(PrivateRoute);
    