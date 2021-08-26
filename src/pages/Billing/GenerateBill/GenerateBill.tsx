import { Box, Step, StepLabel, Stepper } from '@material-ui/core';
import { BackIcon } from 'assets/images';
import clsx from 'clsx';
import Button from 'components/Button';
import Title from 'components/Title';
import ExceptionHandling from 'pages/Billing/GenerateBill/ExceptionHandling';
import FinalizeBills from 'pages/Billing/GenerateBill/FinalizeBills';
import SendInvoices from 'pages/Billing/GenerateBill/SendInvoices';
import SetParameters from 'pages/Billing/GenerateBill/SetParameters';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';

const GenerateBill = () => {
  const { t } = useTranslation(['common', 'billing']);
  const classes = useStyles();
  const history = useHistory();
  const [activeStep, setActiveStep] = useState(0);
  function getSteps() {
    return [
      t('billing:setParameters'),
      t('billing:exceptionHandling'),
      t('billing:finalizeBills'),
      t('billing:sendInvoices'),
    ];
  }
  function getStepContent(step: any) {
    switch (step) {
      case 0:
        return <SetParameters />;
      case 1:
        return <ExceptionHandling />;
      case 2:
        return <FinalizeBills />;
      case 3:
        return <SendInvoices />;
      default:
        return t('billing:unknownStep');
    }
  }
  function getStepConfirmation(step: any) {
    switch (step) {
      case 0:
        return t('billing:rightParameters');
      case 1:
        return '';
      case 2:
        return t('billing:finalizeBillsConfirm');
      case 3:
        return t('billing:customersSelectionConfirm');
      default:
        return t('common:complete');
    }
  }
  const steps = useMemo(() => getSteps(), [t]);
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };
  return (
    <>
      <Box display={{ xs: 'block', md: 'flex' }} justifyContent="space-between" alignItems="center">
        <Box display="flex">
          <BackIcon className={classes.backIcon} onClick={() => history.goBack()} />
          <Title>{t('billing:generateBill')}</Title>
        </Box>
        <Stepper alternativeLabel activeStep={activeStep}>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <div className={clsx('stepperContent', classes.stepperContent)}>
        {getStepContent(activeStep)}
        <Box
          display={{ xs: 'block', md: 'flex' }}
          alignItems="center"
          className={clsx('stepperFooter', classes.stepperFooter)}
        >
          <p>{getStepConfirmation(activeStep)}</p>
          <Box justifySelf="flex-end" ml="auto">
            {activeStep !== 0 && (
              <Button borderRadius={8} disableElevation variant="outlined" color="secondary" onClick={handleBack}>
                {t('billing:cancelBilling')}
              </Button>
            )}
            <Button borderRadius={8} disableElevation variant="contained" color="primary" onClick={handleNext}>
              {activeStep === steps.length - 1 ? t('billing:sendAndFinish') : t('common:continue')}
            </Button>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default GenerateBill;
