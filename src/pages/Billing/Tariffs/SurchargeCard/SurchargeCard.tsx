import { Box, Card, CardContent, Grid, Tooltip, Typography } from '@material-ui/core';
import { EditIcon } from 'assets/images';
import clsx from 'clsx';
import { ControllableDrawer } from 'components/Drawer';
import { format } from 'date-fns';
import { YEAR_MONTH_DAY_HYPHEN_FORMAT } from 'global/constants';
import AddSurcharge from 'pages/Billing/RightDrawer/AddSurcharge';
import { surchargeInitialData } from 'pages/Billing/RightDrawer/AddSurcharge/schema';
import TariffHistory from 'pages/Billing/RightDrawer/TariffHistory';
import useStyles from 'pages/Billing/Tariffs/style';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface IProps {
  cardData: any;
  actionBtn?: ActionBtn;
}

interface ActionBtn {
  show: boolean;
  text?: string;
}

const SurchargeCard: React.FC<IProps> = ({ cardData, actionBtn }) => {
  const classes = useStyles();
  const { t } = useTranslation(['common', 'billing']);

  const [formData, setFormData] = useState<typeof surchargeInitialData>(surchargeInitialData);

  const handleEditIconClick = (handleToggle: Function) => {
    const formData = {
      id: cardData?.id ?? '',
      code: cardData?.code ?? '',
      name: cardData?.name ?? '',
      active: cardData?.active ? 'yes' : 'no',
      is_flat: cardData?.is_flat ? 'yes' : 'no',
      rate: cardData?.rate ?? '',
      start_date: cardData.start_date ? new Date(cardData.start_date) : '',
      description: cardData?.description ?? '',
    };

    setFormData(formData);

    handleToggle();
  };

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent className={classes.cardContent}>
        <Box>
          <div className={classes.titleContainer}>
            <Typography variant="h6" className={classes.title}>
              {cardData?.name}
            </Typography>
          </div>
          <div className={classes.subTitleContainer}>
            <Typography variant="h6" className={classes.subTitle}>
              {t('billing:effectiveFrom')} {format(new Date(cardData?.start_date), YEAR_MONTH_DAY_HYPHEN_FORMAT)}
            </Typography>
          </div>
        </Box>

        <div className={classes.info}>
          <Grid container spacing={2}>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <div className={classes.infoItem}>
                <div>
                  <Typography variant="h6" className={classes.infoTitle}>
                    {t('common:rate')}
                  </Typography>
                </div>
                <div className={classes.infoDataContainer}>
                  <Box mt={1.4} className={classes.infoData}>
                    <Typography variant="body2" color="textPrimary" component="span">
                      {cardData?.rate}
                    </Typography>
                  </Box>
                </div>
              </div>
            </Grid>

            {/* <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <div className={classes.infoItem}>
                <div>
                  <Typography variant="h6" className={classes.infoTitle}>
                    ASD
                  </Typography>
                </div>
                <div className={classes.infoDataContainer}>
                  <Box mt={1.4} className={classes.infoData}>
                    <Typography variant="body2" color="textPrimary" component="span">
                      {cardData?.rate}
                    </Typography>
                  </Box>
                </div>
              </div>
            </Grid> */}
          </Grid>
        </div>
        <div className={clsx(classes.hoverActionBtns, 'hoverActions')}>
          <ControllableDrawer
            toggleElement={handleToggle => (
              <p onClick={() => handleEditIconClick(handleToggle)}>
                <Tooltip title={t('billing:editTariff')} arrow>
                  <EditIcon />
                </Tooltip>
              </p>
            )}
          >
            {toggleDrawer => <AddSurcharge formData={formData} toggleDrawer={toggleDrawer} />}
          </ControllableDrawer>
        </div>
        {actionBtn?.show && (
          <div className={classes.actionBtns}>
            <ControllableDrawer
              toggleElement={handleToggle => (
                <Typography variant="h6" color="primary" onClick={handleToggle}>
                  {actionBtn.text}
                </Typography>
              )}
            >
              {toggleDrawer => <TariffHistory />}
            </ControllableDrawer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
export default SurchargeCard;
