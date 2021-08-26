import { Box, Link, makeStyles, Typography } from '@material-ui/core';
import { VerifiedIconOutlined } from 'assets/images';
import Button from 'components/Button';
import React from 'react';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  meterDetails: {
    marginTop: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(6),
    },
    '& > p': {
      marginBottom: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        marginTop: theme.spacing(4),
      },
      '& > label': {
        color: theme.palette.grey['700'],
        '&:after': {
          content: `':'`,
          display: 'inline-block',
          margin: theme.spacing(0, 0.5),
        },
      },
      '& > span': {
        '& > a ': {
          marginLeft: theme.spacing(0.5),
        },
      },
      '& a': {
        textDecoration: 'none',
        pointerEvents: 'none',
      },
    },
    '& button': {
      marginTop: theme.spacing(1),
      [theme.breakpoints.up('md')]: {
        marginTop: theme.spacing(2),
      },
    },
  },
  acceptChangesBtn: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
    },
    '& svg': {
      color: theme.palette.primary.contrastText,
      '& path': {
        fill: 'currentColor',
      },
    },
  },
}));

const MeterDetails = () => {
  const { t } = useTranslation(['common', 'devices']);
  const classes = useStyles();
  return (
    <>
      <Typography variant="h3">{t('devices:meterDetails')}</Typography>
      <Box className={classes.meterDetails}>
        <p>
          <label>{t('common:meterNumber')}</label>
          <span>27364892</span>
        </p>
        <p>
          <label>{t('common:meterType')}</label>
          <span>
            {t('common:smart')} | {t('devices:concentrator')}:
            <Link href="#" color="primary">
              #273840203
            </Link>
          </span>
        </p>
        <p>
          <label>{t('common:accountName')}</label>
          <Link href="#" color="primary">
            John Doe
          </Link>
        </p>
        <p>
          <label>{t('common:accountNumber')}</label>
          <Link href="#" color="primary">
            1827392910
          </Link>
        </p>
        <p>
          <label>{t('devices:meterModal')}</label>
          <span>Model Name</span>
        </p>
        <p>
          <label>{t('devices:meterSize')}</label>
          <span>20 meters</span>
        </p>
        <p>
          <label>{t('devices:meterFactor')}</label>
          <span>2</span>
        </p>
        <p>
          <label>{t('devices:meterReader')}</label>
          <span>Barima Kwarteng</span>
        </p>
        <p>
          <label>{t('common:installedOn')}</label>
          <span>Dec 2, 2020</span>
        </p>
        <p>
          <label>{t('common:installedBy')}</label>
          <span>Kellie Katako</span>
        </p>
        <p>
          <label>{t('devices:lastReadingAmount')}</label>
          <span>200</span>
        </p>
        <p>
          <label>{t('devices:lastReadingDate')}</label>
          <span>Dec 2, 2020</span>
        </p>
        <Button color="primary" disableElevation size="small" variant="text" borderRadius={8}>
          {t('devices:viewPreviousMeterInfo')}
        </Button>
      </Box>
      <Button
        disableElevation
        type="submit"
        size="large"
        borderRadius={0}
        fullWidth
        startIcon={<VerifiedIconOutlined />}
        className={classes.acceptChangesBtn}
      >
        {t('common:acceptChanges')}
      </Button>
    </>
  );
};

export default MeterDetails;
