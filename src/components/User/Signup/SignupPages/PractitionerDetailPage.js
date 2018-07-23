import React from 'react';
import buttons from '../../../Recyclable/Button.css';
import styles from './SignupPage.css';
import { Row, Col } from 'react-bootstrap';

const PractitionerPage = (props) => {
  let label={
    firstName: "First name",
    lastName: "Last name",
    gender:"Gender",
    title:"Title",
    dob: "Date of birth",
    pracType:"Practitioner Type",
    serviceProvided:"Service Provided",
    abn:"ABN",
    medicareProNum:"Medicare Provider Number",
    accreditedBodies: "Accredited Bodies",
    businessName:"Business name",
    businessAddress:"Business addresss",
    description:"Description",
    selectedImg:"Profile Pic",
  }
  if(props.errors.firstName!='' && typeof props.errors.firstName != 'undefined'){
    label.firstName = props.errors.firstName;
  }
  if(props.errors.lastName!='' && typeof props.errors.lastName != 'undefined'){
    label.lastName = props.errors.lastName;
  }
  if(props.errors.dob!='' && typeof props.errors.dob != 'undefined'){
    label.dob = props.errors.dob;
  }
  if(props.errors.serviceProvided!='' && typeof props.errors.serviceProvided != 'undefined'){
    label.serviceProvided = props.errors.serviceProvided;
  }
  if(props.errors.abn!='' && typeof props.errors.abn != 'undefined'){
    label.abn = props.errors.abn;
  }
  if(props.errors.medicareProNum!='' && typeof props.errors.medicareProNum != 'undefined'){
    label.medicareProNum = props.errors.medicareProNum;
  }
  if(props.errors.accreditedBodies!='' && typeof props.errors.accreditedBodies != 'undefined'){
    label.accreditedBodies = props.errors.accreditedBodies;
  }
  if(props.errors.businessName!='' && typeof props.errors.businessName != 'undefined'){
    label.businessName = props.errors.businessName;
  }
  if(props.errors.businessAddress!='' && typeof props.errors.businessAddress != 'undefined'){
    label.businessAddress = props.errors.businessAddress;
  }
  if(props.errors.description!='' && typeof props.errors.description != 'undefined'){
    label.description = props.errors.description;
  }
  if(props.errors.pracType!='' && typeof props.errors.pracType != 'undefined'){
    label.pracType = props.errors.pracType;
  }
  if(props.errors.title!='' && typeof props.errors.title != 'undefined'){
    label.title = props.errors.title;
  }
  if(props.errors.gender!='' && typeof props.errors.gender != 'undefined'){
    label.gender = props.errors.gender;
  }
  if(props.errors.selectedImg!='' && typeof props.errors.selectedImg != 'undefined'){
    label.selectedImg = props.errors.selectedImg;
  }
  return(
    <div className={styles.Practitioner}>
      <Row>
      <Col md={6}>
       <div className={styles.center}>
          <Row>
           <span>{label.title}</span>
          </Row>
          <Row>
            <select className={styles} value={props.title} name="title" onChange={props.onChange} onClick={props.onClick}>
              <option value="" disabled selected>Select title</option>
              <option value="Miss.">Miss.</option>
              <option value="Mrs.">Mrs.</option>
              <option value="Mr.">Mr.</option>
              <option value="Ms.">Ms.</option>
              <option value="Dr.">Dr.</option>
              <option value="Prof.">Prof.</option>
            </select>
          </Row>
        </div>
      </Col>
        <Col md={6}>
          <label className={props.errors.firstName != ''&& typeof props.errors.firstName != 'undefined'?
                styles.inpErr: styles.inp}>
            <input type="text"
                   name="firstName"
                   value={props.firstName}
                   label={label.firstName}
                   error={props.errors.firstName}
                   onChange={props.onChange}
                   onBlur={props.onBlur}
                   onClick={props.onClick}
                  placeholder="&nbsp;"/>
            <span className={props.errors.firstName != '' && typeof props.errors.firstName != 'undefined'?
                  styles.labelErr: styles.label}>{label.firstName}</span>
            <span className={styles.border}></span>
          </label>
        </Col>
        <Col md={6}>
          <label className={props.errors.lastName != ''&& typeof props.errors.lastName != 'undefined'?
                styles.inpErr: styles.inp}>
            <input type="text"
                   name="lastName"
                   value={props.lastName}
                   label={label.lastName}
                   error={props.errors.lastName}
                   onChange={props.onChange}
                   onBlur={props.onBlur}
                   onClick={props.onClick}
                   placeholder="&nbsp;"/>
            <span className={props.errors.lastName != '' && typeof props.errors.lastName != 'undefined'?
                  styles.labelErr: styles.label}>{label.lastName}</span>
            <span className={styles.border}></span>
          </label>
        </Col>
        <Col md={6}>
          <div className={styles.center}>
             <Row>
              <span>{label.gender}</span>
             </Row>
             <Row>
              <select value={props.gender} name="gender" onChange={props.onChange} onClick={props.onClick}>
                <option value="" disabled selected>Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </Row>
          </div>
        </Col>
        <Col md={6}>
          <label className={props.errors.dob != ''&& typeof props.errors.dob != 'undefined'?
                styles.inpErr: styles.inp}>
            <input type="date"
                    name="dob"
                    value={props.dob}
                    label={label.dob}
                    error={props.errors.dob}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    onClick={props.onClick}
                    placeholder="&nbsp;"/>
            <span className={props.errors.dob != '' && typeof props.errors.dob != 'undefined'?
                  styles.labelErr: styles.label}>{label.dob}</span>
            <span className={styles.border}></span>
          </label>
        </Col>
        <Col md={6}>
        <div className={styles.center}>
           <Row>
            <span>{label.pracType}</span>
           </Row>
           <Row>
             <select className={styles} value={props.pracType} name="pracType" onChange={props.onChange} onClick={props.onClick}>
               <option value="" disabled selected>Select practitioner type</option>
               <option value="Dietitian">Dietitian</option>
               <option value="Exercise physiologist">Exercise physiologist</option>
               <option value="Physiotherapist">Physiotherapist</option>
             </select>
           </Row>
         </div>
        </Col>
        <Col md={6}>
          <label className={props.errors.serviceProvided != ''&& typeof props.errors.serviceProvided != 'undefined'?
                styles.inpErr: styles.inp}>
            <input type="text"
                    name="serviceProvided"
                    value={props.serviceProvided}
                    label={label.serviceProvided}
                    error={props.errors.serviceProvided}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    onClick={props.onClick}
                    placeholder="&nbsp;"/>
            <span className={props.errors.serviceProvided != '' && typeof props.errors.serviceProvided != 'undefined'?
                  styles.labelErr: styles.label}>{label.serviceProvided}</span>
            <span className={styles.border}></span>
          </label>
        </Col>
        <Col md={6}>
          <label className={props.errors.abn != ''&& typeof props.errors.abn != 'undefined'?
                styles.inpErr: styles.inp}>
            <input type="text"
                    name="abn"
                    value={props.abn}
                    label={label.abn}
                    error={props.errors.abn}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    onClick={props.onClick}
                    placeholder="&nbsp;"/>
            <span className={props.errors.abn != '' && typeof props.errors.abn != 'undefined'?
                  styles.labelErr: styles.label}>{label.abn}</span>
            <span className={styles.border}></span>
          </label>
        </Col>
        <Col md={6}>
          <label className={props.errors.medicareProNum != ''&& typeof props.errors.medicareProNum != 'undefined'?
                styles.inpErr: styles.inp}>
            <input type="text"
                    name="medicareProNum"
                    value={props.medicareProNum}
                    label={label.medicareProNum}
                    error={props.errors.medicareProNum}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    onClick={props.onClick}
                    placeholder="&nbsp;"/>
            <span className={props.errors.medicareProNum != '' && typeof props.errors.medicareProNum != 'undefined'?
                  styles.labelErr: styles.label}>{label.medicareProNum}</span>
            <span className={styles.border}></span>
          </label>
        </Col>
        <Col md={6}>
          <label className={props.errors.accreditedBodies != ''&& typeof props.errors.accreditedBodies != 'undefined'?
                styles.inpErr: styles.inp}>
            <input type="text"
                    name="accreditedBodies"
                    value={props.accreditedBodies}
                    label={label.accreditedBodies}
                    error={props.errors.accreditedBodies}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    onClick={props.onClick}
                    placeholder="&nbsp;"/>
            <span className={props.errors.accreditedBodies != '' && typeof props.errors.accreditedBodies != 'undefined'?
                  styles.labelErr: styles.label}>{label.accreditedBodies}</span>
            <span className={styles.border}></span>
          </label>
        </Col>
        <Col md={6}>
          <label className={props.errors.businessName != ''&& typeof props.errors.businessName != 'undefined'?
                styles.inpErr: styles.inp}>
            <input type="text"
                    name="businessName"
                    value={props.businessName}
                    label={label.businessName}
                    error={props.errors.businessName}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    onClick={props.onClick}
                    placeholder="&nbsp;"/>
            <span className={props.errors.businessName != '' && typeof props.errors.businessName != 'undefined'?
                  styles.labelErr: styles.label}>{label.businessName}</span>
            <span className={styles.border}></span>
          </label>
        </Col>
        <Col md={6}>
          <label className={props.errors.businessAddress != ''&& typeof props.errors.businessAddress != 'undefined'?
                styles.inpErr: styles.inp}>
            <input type="text"
                    name="businessAddress"
                    value={props.businessAddress}
                    label={label.businessAddress}
                    error={props.errors.businessAddress}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    onClick={props.onClick}
                    placeholder="&nbsp;"/>
            <span className={props.errors.businessAddress != '' && typeof props.errors.businessAddress != 'undefined'?
                  styles.labelErr: styles.label}>{label.businessAddress}</span>
            <span className={styles.border}></span>
          </label>
        </Col>
        <Col md={6}>
          <Row>
            <div className={styles.upload}>
              <span>{label.selectedImg}</span>
              <input type="file" name="selectedImg" onClick={props.onClick} onChange={props.onChange}/>
            </div>
          </Row>
        </Col>
        <Col md={6}>
          <label className={props.errors.description != ''&& typeof props.errors.description != 'undefined'?
                styles.textBoxErr: styles.textBox}>
                <span className={props.errors.description != '' && typeof props.errors.description != 'undefined'?
                      styles.labelErr: styles.label}>{label.description}</span>
                <textarea
                          name="description"
                          onClick={props.onClick}
                          onChange={props.onChange}
                          onBlur={props.onBlur}
                          placeholder="Enter description here..."
                        />
          </label>
        </Col>
      </Row>

    </div>
  );

}

export default PractitionerPage;
