import React,{Component} from 'react';
import Aux from '../../hoc/Aux';


class SignupForm extends Component{
  state={
    pageNo:1,
    errors: {},
    submitError: null,

    //Payment Detail
    cardType:'',
    cardNumber:'',
    expiryDate:'',
    Cvv:'',
    cardHolderName:'',
    country:'',
    state:'',
    address1:'',
    address2:'',
    address3:'',

    //Practitioner bankDetail
    firstName:'',
    lastName:'',
    email:'',
    dob:'',
    gender:'',
    title:'',
    serviceProvided:[''],
    abn:'',
    medicalProNum: '',
    accreditedBodies:[''],
    businessName:'',
    businessAddress:'',
    selectedImg: null,
    agreement: false,

  };
  previousPageHandler(){

  };
  nextPageHandler(){
    const oldPageNo = this.pageNo;
    const newPageNo = oldPageNo + 1;
    this.setState(pageNo: newPageNo);
  };

  render(){
    return(
      <Aux>

        <p>Wizard</p>
        <p>Pages</p>
        <p>Pagination</p>
      </Aux>
    );
  }
}

export default SignupForm;
