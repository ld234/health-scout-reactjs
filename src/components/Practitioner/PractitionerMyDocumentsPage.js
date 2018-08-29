import React, {Component} from 'react';
import UserGeneralInfo from '../User/UserGeneralInfo';
import MyDocuments from './PractitionerMyDocuments';
import PractitionerAddDocument from './PractitionerAddDocumentForm';
class PractitionerMyDocumentPage extends Component{
    constructor (props){
        super(props);
    }

    render (){
        return(
        <div id="practitioner-page" className="right">
            
                    <UserGeneralInfo />
                    <div className="main-wrapper" >
                        <MyDocuments
                        addComponent={PractitionerAddDocument}/>
                    </div>
        </div>
        );
    }

}

export default PractitionerMyDocumentPage;
