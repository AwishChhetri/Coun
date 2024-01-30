import React from 'react';
import {
  Box,
  Button,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useBreakpointValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
const steps = [
  { title: 'First', description: 'Healthy' },
  { title: 'Second', description: 'Can make it!' },
  { title: 'Third', description: 'Consult' },
];

export const StepperComponent = ({ stage }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  let activeStep = 0;

  if (stage === 3) {
    activeStep = 3;
  } else if (stage === 1) {
    activeStep = 1;
  } else if (stage === 2) {
    activeStep = 2;
  }

  return (
    <Box>
      <Stepper size={isMobile ? 'sm' : 'lg'} orientation={isMobile ? 'vertical' : 'horizontal'} index={activeStep}>
        {steps.map((step, index) => (
          <Step key={index || 0}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box flexShrink="0">
              <StepTitle color="black">{step.title}</StepTitle>
              <StepDescription color="black">{step.description}</StepDescription>
            </Box>

            {index < steps.length - 1 && <StepSeparator />}
          </Step>
        ))}
      </Stepper>

      {activeStep === 3 && (
        <Button colorScheme="teal" mt="4">
         <Link to="/appointment">Book a Session</Link> 
        </Button>
      )}
    </Box>
  );
};
