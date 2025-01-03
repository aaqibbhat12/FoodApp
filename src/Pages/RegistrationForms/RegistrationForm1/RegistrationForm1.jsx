import React, { useState } from 'react';
import RestaurantDocs from '../../../Components/Registration/RestaurantDocs/RestaurantDocs';
import RestaurantInfo from '../../../Components/Registration/Restaurantinfo/restaurantInfo';
import Contract from '../../../Components/Registration/RestaurantContract/Contract';
import styles from '../RegistrationForm1/RegistrationForm1.module.css';

const steps = ['RestaurantInfo', 'RestaurantDocs', 'Contract'];

const RegistrationForm1 = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0); 
  const renderStepComponent = () => {
    switch (steps[currentStepIndex]) {
      case 'RestaurantInfo':
        return <RestaurantInfo id="restaurant-info" />;
      case 'RestaurantDocs':
        return <RestaurantDocs id="restaurant-docs" />;
      case 'Contract':
        return <Contract id="contract"  />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.FoodCart}>
          <div>Food Kart for Restaurants</div>
        </div>
        <div className={styles.stepsdiv}>
          {steps.map((step, index) => (
            <div
              key={step}
              className={`${styles.step1div} ${
                currentStepIndex === index ? styles.activeStep : ''
              }`}
              onClick={() => setCurrentStepIndex(index)}
            >
              <div className={styles.resturantinfo}>
                <div className={styles.checkbox}>
                  <input
                    type="checkbox"
                    name="step"
                    checked={currentStepIndex === index}
                    readOnly
                  />
                </div>
                {`STEP ${index + 1} : ${step.replace(/([A-Z])/g, ' $1').trim()}`}
              </div>
            </div>
          ))}
        </div>
      </div>

      {renderStepComponent()}
    </>
  );
};

export default RegistrationForm1;
