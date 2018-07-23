import React, {Component} from 'react';
import { Row, Col } from 'react-bootstrap';
import buttons from '../../../Recyclable/Button.css';
import styles from './SignupPage.css';
import pageCss from './SubscriptionPaymentPage.css';
import moment from 'moment';
import {Elements, StripeProvider, injectStripe, CardNumberElement,CardExpiryElement,CardCVCElement} from 'react-stripe-elements';

class SubscriptionPaymentPage extends Component{

  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      subPackDetails :[
        {
          title:'Only Subscription',
          price:'12',
          bundleType:'',
          description:'description input here',
        },
        {
          title:'Subscription + package 1',
          price:'13',
          bundleType:'basic',
          description:'description input here',
        },
        {
          title:'Subscription + package 2',
          price:'14',
          bundleType:'standard',
          description:'description input here',
        },
        {
          title:'Subscription + package 3',
          price:'15',
          bundleType:'premium',
          description:'description input here',
        },
      ],
    };
  }

  async handleSubmit () {
   let {token} = await this.props.stripe.createToken({name: "Name"});
   props.setToken(token);
   this.props.next;

  }


  render(){
    let subPackCards = this.state.subPackDetails.map((card,i) =>{
     return this.state.toggleSubscriptionSelected === i ?
     <div className={[pageCss.card, pageCss.selected].join(' ')} key={i}>
       <h4>{card.title}</h4>
       <h5>{card.price}</h5>
       <h6>{card.description}</h6>
       <button name="bundle" value={card.bundleType} onClick={this.props.onChange}>{card.bundleType}</button>
     </div>
     :
     <div className={pageCss.card} key={i} >
       <h4>{card.title}</h4>
       <h5>{card.price}</h5>
       <h6>{card.description}</h6>
       <button name="bundle" value={card.bundleType} onClick={this.props.onChange}>{card.bundleType}</button>
     </div>
    });


    return(
      <div>
        <Row>
          <Col md={6}>
            {subPackCards}
          </Col>
          <Col md={6}>
            <div>
               <label>
                 Card number
                 <CardNumberElement
                 />
               </label>
               <label>
                 Expiration date
                 <CardExpiryElement
                 />
               </label>
               <label>
                 CVC
                 <CardCVCElement
                 />
               </label>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default injectStripe(SubscriptionPaymentPage);
