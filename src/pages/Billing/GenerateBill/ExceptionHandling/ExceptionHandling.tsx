import React from 'react';
import { useTranslation } from 'react-i18next';

const ExceptionHandling = () => {
  const { t } = useTranslation(['common', 'billing']);
  return (
    <div>
      <p>{t('billing:exceptionHandling')}</p>
    </div>
  );
};

export default ExceptionHandling;
