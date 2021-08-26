import { Box, Grid, InputAdornment, TextField } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useStyles from './styles';

const SetParameters = () => {
  const { t } = useTranslation(['common', 'billing']);
  const classes = useStyles();
  return (
    <>
      <Box className={classes.waterRatesForm}>
        <h3 className={classes.heading}>{t('billing:waterRates')}</h3>
        <Grid container spacing={2}>
          <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
            <h4 className={classes.subHeading}>{t('common:domestic')}</h4>
            <Box
              display="grid"
              gridGap={24}
              gridTemplateColumns="repeat(auto-fit, minmax(min-content, 175px))"
              alignItems="center"
              mt={{ xs: 2, md: 3 }}
            >
              <label className={classes.sectionLabel}>{t('common:0-5')}</label>
              <TextField label={t('common:rate')} value="5%" />
              <TextField label={t('common:serviceCharges')} value="6.0000" />
            </Box>
            <Box
              display="grid"
              gridGap={24}
              gridTemplateColumns="repeat(auto-fit, minmax(min-content, 175px))"
              alignItems="center"
              mt={{ xs: 2, md: 3 }}
            >
              <label className={classes.sectionLabel}>{t('common:5Above')}</label>
              <TextField label={t('common:rate')} />
              <TextField label={t('common:serviceCharges')} />
            </Box>
          </Grid>

          <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
            <Box
              display="grid"
              gridGap={24}
              gridTemplateColumns="repeat(auto-fit, minmax(min-content, 175px))"
              alignItems="center"
              mt={{ xs: 2, md: 3 }}
            >
              <label className={classes.subHeading}>{t('common:commercial')}</label>
              <TextField label={t('common:rate')} value="5%" />
              <TextField label={t('common:serviceCharges')} value="" />
            </Box>

            <Box
              display="grid"
              gridGap={24}
              gridTemplateColumns="repeat(auto-fit, minmax(min-content, 175px))"
              alignItems="center"
              mt={{ xs: 2, md: 3 }}
            >
              <label className={classes.subHeading}>{t('common:industrial')}[673]</label>
              <TextField label={t('common:rate')} value="5%" />
              <TextField label={t('common:serviceCharges')} value="" />
            </Box>
          </Grid>

          <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
            <Box
              display="grid"
              gridGap={24}
              gridTemplateColumns="repeat(auto-fit, minmax(min-content, 175px))"
              alignItems="center"
              mt={{ xs: 2, md: 3 }}
            >
              <label className={classes.subHeading}>{t('common:commercial')}</label>
              <TextField label={t('common:rate')} value="5%" />
              <TextField label={t('common:serviceCharges')} value="" />
            </Box>

            <Box
              display="grid"
              gridGap={24}
              gridTemplateColumns="repeat(auto-fit, minmax(min-content, 175px))"
              alignItems="center"
              mt={{ xs: 2, md: 3 }}
            >
              <label className={classes.subHeading}>{t('common:industrial')}[673]</label>
              <TextField label={t('common:rate')} value="5%" />
              <TextField label={t('common:serviceCharges')} value="" />
            </Box>
          </Grid>

          <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
            <Box
              display="grid"
              gridGap={24}
              gridTemplateColumns="repeat(auto-fit, minmax(min-content, 175px))"
              alignItems="center"
              mt={{ xs: 2, md: 3 }}
            >
              <label className={classes.subHeading}>{t('common:commercial')}</label>
              <TextField label={t('common:rate')} value="5%" />
              <TextField label={t('common:serviceCharges')} value="" />
            </Box>

            <Box
              display="grid"
              gridGap={24}
              gridTemplateColumns="repeat(auto-fit, minmax(min-content, 175px))"
              alignItems="center"
              mt={{ xs: 2, md: 3 }}
            >
              <label className={classes.subHeading}>{t('common:industrial')}[673]</label>
              <TextField label={t('common:rate')} value="5%" />
              <TextField label={t('common:serviceCharges')} value="" />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box className={classes.subChargesInfo} mt={{ xs: 2, md: 4 }} display="grid" gridGap={20}>
        <h3 className={classes.heading}>{t('billing:surcharges')}</h3>
        <TextField
          label={t('billing:fireFighting')}
          value="5%"
          InputProps={{
            endAdornment: (
              <>
                <InputAdornment position="end">%</InputAdornment>
                <InputAdornment position="end">$</InputAdornment>
              </>
            ),
          }}
        />
        <TextField
          label={t('billing:ruralWater')}
          value="$20"
          InputProps={{
            endAdornment: (
              <>
                <InputAdornment position="end">%</InputAdornment>
                <InputAdornment position="end">$</InputAdornment>
              </>
            ),
          }}
        />
      </Box>
    </>
  );
};

export default SetParameters;
