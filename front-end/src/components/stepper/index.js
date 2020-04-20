import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';


function getSteps() {
  return ["Chọn Ghế", "Thông Tin Khách Hàng", "Thanh Toán"];
}

export default function DatVeStepper(props) {
  const steps = getSteps();
  return (
    <div >
     <Stepper activeStep={props.activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
    </div>
  );
}
