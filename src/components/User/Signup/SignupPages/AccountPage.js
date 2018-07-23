import React from 'react';
import buttons from '../../../Recyclable/Button.css';
import Aux from '../../../../hoc/Aux';
import styles from './SignupPage.css';
import { Row, Col } from 'react-bootstrap';
const AccountPage = (props) => {

    let password1Label ="New Password";
    let password2Label ="Confirm Password";
    let usernameLabel = "Username";
    let emailLabel = "Email";

    if(props.errors.username!='' && typeof props.errors.username != 'undefined'){
      usernameLabel = props.errors.username;
    }
    if(props.errors.newPassword!='' && typeof props.errors.newPassword != 'undefined'){
      password1Label = props.errors.newPassword;
    }
    if(props.errors.confirmPassword!='' && typeof props.errors.confirmPassword != 'undefined'){
      password2Label = props.errors.confirmPassword;
    }
    if(props.errors.email!='' && typeof props.errors.email != 'undefined'){
      emailLabel = props.errors.email;
    }
    return(
      <Aux>
        <div className={styles.Account}>
          <label className={props.errors.email != ''&& typeof props.errors.email != 'undefined'?
                styles.inpErr: styles.inp}>
            <input type="email"
                    name="email"
                    value={props.email}
                    label="email"
                    error={props.errors.email}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    onClick={props.onClick}
                    placeholder="&nbsp;"/>
            <span className={props.errors.email != '' && typeof props.errors.email != 'undefined'?
                  styles.labelErr: styles.label}>{emailLabel}</span>
            <span className={styles.border}></span>
          </label>

          <label className={props.errors.username != ''&& typeof props.errors.username != 'undefined'?
                styles.inpErr: styles.inp}>
            <input type="text"
                  name="username"
                  value={props.username}
                  label="username"
                  error={props.errors.username}
                  onChange={props.onChange}
                  onBlur={props.onBlur}
                  onClick={props.onClick}
                  placeholder="&nbsp;"/>
            <span className={props.errors.username != '' && typeof props.errors.username != 'undefined'?
                  styles.labelErr: styles.label}>{usernameLabel}</span>
            <span className={styles.border}></span>
          </label>
          <label className={props.errors.newPassword != ''  && typeof props.errors.newPassword != 'undefined'?
                styles.inpErr: styles.inp}>
            <input type="password"
                  name="newPassword"
                  value={props.newPassword}
                  label="newPassword"
                  error={props.errors.newPassword}
                  onChange={props.onChange}
                  onBlur={props.onBlur}
                  onClick={props.onClick}
                  placeholder="&nbsp;"/>
            <span className={props.errors.newPassword != ''  && typeof props.errors.newPassword != 'undefined'?
                  styles.labelErr: styles.label}
                  >{password1Label}</span>
            <span className={styles.border}></span>
          </label>
          <label className={props.errors.confirmPassword != '' && typeof props.errors.confirmPassword != 'undefined'?
                styles.inpErr: styles.inp}>
            <input type="password"
                  name="confirmPassword"
                  value={props.confirmPassword}
                  label="confirmPassword"
                  error={props.errors.confirmPassword}
                  onChange={props.onChange}
                  onBlur={props.onBlur}
                  onClick={props.onClick}
                  placeholder="&nbsp;"/>
            <span className={props.errors.confirmPassword != '' && typeof props.errors.confirmPassword != 'undefined'?
                  styles.labelErr: styles.label}
                  >{password2Label}</span>
            <span className={styles.border}></span>
          </label>
        </div>
      </Aux>
    );
  }


export default AccountPage;
