import React from 'react';
import styles from './SignupStepProgressBar.css'
const SignupStepProgressBar = (props) => {
  const stepsText =['Account','Practitioner Detail','Subscription Payment','Agreement','Confirmation'];
  const stepsList = stepsText.map((stepName, i) =>{
    return props.step >= i ?<li key={i} className={styles.active}>{stepName}</li>:<li key={i}>{stepName}</li>
  });
  return(
      <div className={styles.ProgressBar}>
        {stepsList}
      </div>
  );
}

export default SignupStepProgressBar;
