import React, {Component} from 'react';
import buttons from '../../../Recyclable/Button.css';
import styles from './SignupPage.css';
import Aux from '../../../../hoc/Aux';

class AgreementPage extends Component{
  constructor(props){
    super(props);
    this.props.setAgreement(true);
  }


  render(){
  return(
      <Aux>
      <input type="checkbox" name="agreement" onChange={this.props.toggle} />
      </Aux>
    );
  }

}

export default AgreementPage;
