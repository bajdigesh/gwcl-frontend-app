import { Box, Grid, ListItem, makeStyles } from '@material-ui/core';
import { PdfIcon } from 'assets/images';
import Button from 'components/Button';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useStyles from '../styles';

const useDetailStyles = makeStyles(theme => ({
  customerAccountDetails: {
    marginTop: theme.spacing(3),
    '& .gwcl-MuiGrid-item': {
      '&:not': {
        '&(:first-of-type)': {
          borderTop: `1px solid ${theme.palette.grey['500']}`,
          [theme.breakpoints.up('md')]: {
            borderTop: 0,
          },
        },
        '&(:nth-of-type(3n))': {
          [theme.breakpoints.up('md')]: {
            borderTop: 0,
            paddingTop: 0,
            paddingBottom: 0,
            borderRight: `1px solid ${theme.palette.grey['500']}`,
          },
        },
      },
    },
    '& h5': {
      fontSize: theme.typography.pxToRem(12),
      fontWeight: 600,
      textTransform: 'uppercase',
    },
    '& p': {
      marginTop: theme.spacing(4.25),
      '& label': {
        color: theme.palette.grey['700'],
        '&:after': {
          content: `':'`,
        },
      },
      '& span': {
        marginLeft: theme.spacing(0.5),
        fontWeight: 600,
      },
      '& a': {
        padding: 0,
        width: 'auto',
        marginLeft: theme.spacing(0.5),
        color: theme.palette.grey['900'],
        fontWeight: 600,
      },
    },
  },
  mapFrame: {
    maxWidth: 400,
    height: 240,
    marginTop: theme.spacing(4.25),
    '& iframe': {
      width: '100%',
      height: '100% !important',
      borderRadius: 8,
      border: 0,
    },
  },
  buttonContainer: {
    marginTop: theme.spacing(4.25),
    maxWidth: 210,
  },
  documentsGrid: {
    '& h5': {
      marginBottom: theme.spacing(3),
    },
  },
  documents: {
    borderRadius: 8,
    border: `1px solid ${theme.palette.grey['500']}`,
    padding: `${theme.spacing(1.75)}px ${theme.spacing(2)}px`,
    marginTop: `${theme.spacing(0.75)}px !important`,
    '& label': {
      marginLeft: theme.spacing(1),
      flex: 1,
      fontWeight: 400,
      color: theme.palette.grey['900'],
      '&:after': {
        content: `'' !important`,
      },
    },
    '& span': {
      color: theme.palette.primary.main,
      justifySelf: 'flex-end',
      cursor: 'pointer',
      fontWeight: '500 !important',
    },
    '&:hover': {
      border: `1px dashed ${theme.palette.primary.main}`,
    },
    '&:last-of-type': {
      marginBottom: theme.spacing(3),
    },
  },
}));

const AccountDetails = () => {
  const { t } = useTranslation(['common', 'customers']);
  const classes = useStyles();
  const detailClasses = useDetailStyles();
  return (
    <Grid container spacing={6} className={detailClasses.customerAccountDetails}>
      {/*============================= General Details =============================*/}
      <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
        <h5>{t('customers:generalDetails')}</h5>
        <Box display="flex" component="p">
          <label>{t('customers:applicationDate')}</label>
          <span>Nov 12, 2020</span>
        </Box>
        <Box display="flex" component="p">
          <label>{t('customers:structureType')}</label>
          <span>Apartment</span>
        </Box>
        <Box display="flex" component="p">
          <label>{t('customers:serviceCategory')}</label>
          <span>Category 1</span>
        </Box>
        <Box display="flex" component="p">
          <label>{t('common:region')}</label>
          <span>Region Name</span>
        </Box>
        <Box display="flex" component="p">
          <label>{t('common:district')}</label>
          <span>District Name</span>
        </Box>
        <Box display="flex" component="p">
          <label>{t('common:route')}</label>
          <span>Route Name</span>
        </Box>
        <Box display="flex" component="p">
          <label>{t('customers:ownerType')}</label>
          <span>Landlord</span>
        </Box>
        <Box display="flex" component="p">
          <label>{t('customers:noOfOccupants')}</label>
          <span>4</span>
        </Box>
        <Box display="flex" component="p">
          <label>{t('customers:purposeOfSupply')}</label>
          <span>Domestic</span>
        </Box>
        <Box display="flex" component="p">
          <label>{t('customers:activityOnPremise')}</label>
          <span>Description</span>
        </Box>
      </Grid>

      {/*============================= Contact Details =============================*/}
      <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
        <h5>{t('customers:contactDetails')}</h5>
        <Box display="flex" component="p">
          <label>{t('common:mobile')} 1</label>
          <span>+1-293-928-8273</span>
        </Box>
        <Box display="flex" component="p">
          <label>{t('common:mobile')} 2</label>
          <span>+1-293-928-8273</span>
        </Box>
        <Box display="flex" component="p">
          <label>{t('common:emailAddress')} 1</label>
          <ListItem component="a" href="mailto:email@company.com">
            email@company.com
          </ListItem>
        </Box>
        <Box display="flex" component="p">
          <label>{t('common:emailAddress')} 1</label>
          <ListItem component="a" href="mailto:email@company.com">
            email@company.com
          </ListItem>
        </Box>
        <Box display="flex" component="p">
          <label>{t('customers:residentialAddress')}</label>
          <span>311 S, Harrington St, Raleigh</span>
        </Box>
        <Box display="flex" component="p">
          <label>{t('customers:gpsCode')}</label>
          <span>92837</span>
        </Box>
        <Box className={detailClasses.mapFrame}>
          <iframe
            title="address-map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3236.949141486848!2d-78.64691458438621!3d35.776625632340995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89ac5f706e1f7ce7%3A0x74c7f828bdb2c467!2s311%20S%20Harrington%20St%2C%20Raleigh%2C%20NC%2027603%2C%20USA!5e0!3m2!1sen!2snp!4v1616396804180!5m2!1sen!2snp"
            width="600"
            height="450"
            loading="lazy"
          />
        </Box>
      </Grid>

      {/*============================= Connection Details =============================*/}
      <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
        <h5>{t('customers:connectionDetails')}</h5>
        <Box display="flex" component="p">
          <label>{t('customers:lengthOfConnection')}</label>
          <span>Nov 15, 2020</span>
        </Box>
        <Box display="flex" component="p">
          <label>{t('customers:sizeOfLine')}</label>
          <span>Nov 15, 2020</span>
        </Box>
        <Box display="flex" component="p">
          <label>{t('customers:meterNumber')}</label>
          <span>2938475</span>
        </Box>
        <Box display="flex" component="p">
          <label>{t('common:meterStatus')}</label>
          <span>Working </span>
        </Box>
        <Box className={detailClasses.buttonContainer}>
          <Button fullWidth borderRadius={8} color="primary" variant="outlined">
            {t('customers:viewMeterDetails')}
          </Button>
        </Box>
      </Grid>

      {/*============================= Documents =============================*/}
      <Grid item xl={4} lg={4} md={4} sm={12} xs={12} className={detailClasses.documentsGrid}>
        <h5>{t('common:documents')}</h5>
        <Button fullWidth borderRadius={8} color="primary" variant="outlined">
          {t('customers:addDocuments')}
        </Button>
        <Box display="flex" alignItems="center" component="p" className={detailClasses.documents}>
          <PdfIcon />
          <label>Document 1</label>
          <span>{t('common:change')}</span>
        </Box>
        <Box display="flex" alignItems="center" component="p" className={detailClasses.documents}>
          <PdfIcon />
          <label>Document 1</label>
          <span>{t('common:change')}</span>
        </Box>
        <Box display="flex" alignItems="center" component="p" className={detailClasses.documents}>
          <PdfIcon />
          <label>Document 1</label>
          <span>{t('common:change')}</span>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AccountDetails;
