import { Box, Button, Card, CardContent, IconButton, Typography } from '@material-ui/core';
import { PenIcon } from 'assets/images';
import Drawer, { ControllableDrawer } from 'components/Drawer';
import AddNewWaterRate from 'pages/Billing/RightDrawer/AddNewWaterRate/AddNewWaterRate';
import { waterRateInitialData } from 'pages/Billing/RightDrawer/AddNewWaterRate/schema';
import WaterRateHistory from 'pages/Billing/RightDrawer/WaterRateHistory';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDrawerToggle } from 'utils/hooks';
import useStyles from './styles';

interface IProps {
  cardData: { id: number; name: string; children_linked_categories_count: number; service_rates: Array<any> };
}

const WaterRateCard: React.FC<IProps> = ({ cardData }) => {
  const classes = useStyles();
  const { t } = useTranslation(['billing', 'common']);
  const { openDrawer, toggleDrawer } = useDrawerToggle();
  const [formData, setFormData] = useState<typeof waterRateInitialData>(waterRateInitialData);

  const handleEditIconClick = (serviceRate: any) => {
    setFormData({
      ...formData,
      id: serviceRate?.id,
      service_agreement_id: { label: cardData?.name, value: cardData?.id },
      limit_lower: serviceRate?.limit_lower ?? '',
      limit_upper: serviceRate?.limit_upper ?? '',
      rate: serviceRate?.rate ?? '',
      start_date: serviceRate.start_date ? new Date(serviceRate.start_date) : null,
      end_date: serviceRate?.end_date ? new Date(serviceRate.end_date) : null,
    });

    toggleDrawer();
  };

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent className={classes.cardContent}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h6">{cardData?.name}</Typography>
          <Typography variant="h6" color="primary">
            {cardData?.children_linked_categories_count} {t('billing:linked')}
          </Typography>
        </Box>

        {Array.isArray(cardData.service_rates) && cardData.service_rates.length
          ? cardData.service_rates.map((serviceRate, index) => {
              return (
                <Box mb={2} display="flex" alignItems="center" textAlign="center">
                  <Box flex=" 0 0 50%">
                    {index === 0 && (
                      <Typography
                        variant="subtitle2"
                        style={{ textTransform: 'uppercase' }}
                        component="h6"
                        gutterBottom
                      >
                        Rate (GHp/1000 Litres)
                        {t('billing:rate')}
                      </Typography>
                    )}
                    <Typography variant="body2">{serviceRate?.rate}</Typography>
                    <Typography variant="subtitle2" color="textPrimary">
                      (for {serviceRate?.limit_lower} - {serviceRate?.limit_upper || 'above'})
                    </Typography>
                  </Box>
                  <Box flex=" 0 0 50%">
                    {index === 0 && (
                      <Typography
                        variant="subtitle2"
                        style={{ textTransform: 'uppercase' }}
                        component="h6"
                        gutterBottom
                      >
                        {t('common:actions')}
                      </Typography>
                    )}

                    <IconButton onClick={() => handleEditIconClick(serviceRate)}>
                      <PenIcon />
                    </IconButton>
                  </Box>
                </Box>
              );
            })
          : null}
        <Drawer open={openDrawer} toggleDrawer={toggleDrawer}>
          <AddNewWaterRate formData={formData} toggleDrawer={toggleDrawer} />
        </Drawer>
        <ControllableDrawer
          toggleElement={handleToggle => (
            <Button disableElevation onClick={handleToggle} color="primary">
              {t('billing:viewTariffHistory')}
            </Button>
          )}
        >
          {toggleDrawer => <WaterRateHistory serviceAgreementId={'' + cardData.id} />}
        </ControllableDrawer>
      </CardContent>
    </Card>
  );
};
export default WaterRateCard;
