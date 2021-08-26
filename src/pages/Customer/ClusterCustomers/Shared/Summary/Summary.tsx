import { Box, MenuItem, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { ArrowDownIcon } from 'assets/images';
import Button from 'components/Button';
import CustomizedDropdown from 'components/Dropdown/CustomizedDropdown';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useStyles from './styles';

const options = ['10', '30', '90'];

const summaryDetails = [
  { label: 'Billing Amount', value: '$1000' },
  { label: 'Total Receivable', value: '12' },
  { label: 'Amount Paid', value: '$800' },
  { label: 'Adjustments', value: '12' },
];

const Summary = () => {
  const classes = useStyles();
  const { t } = useTranslation(['common', 'customers']);
  const [selectedIndex, setSelectedIndex] = useState<number>(1);

  return (
    <div className={classes.wrapper}>
      <Box className={classes.header}>
        <Typography variant="h6">{t('customers:summary')}</Typography>
        <CustomizedDropdown
          open={true}
          renderTriggerElement={handleClick => (
            <Button
              disableElevation
              color="default"
              size="small"
              variant="outlined"
              endIcon={<ArrowDownIcon />}
              onClick={handleClick}
            >
              {t('customers:last')} {options[selectedIndex]} {t('common:days')}
            </Button>
          )}
        >
          {handleClose =>
            options.map((item: string, index: number) => (
              <MenuItem
                onClick={() => {
                  handleClose();
                  setSelectedIndex(index);
                }}
              >
                {item}
              </MenuItem>
            ))
          }
        </CustomizedDropdown>
      </Box>
      <Grid container spacing={3}>
        {summaryDetails.map(summary => {
          return (
            <>
              <Grid item>
                <Typography variant="h6" className={classes.value}>
                  {summary.value}
                </Typography>
                <Typography variant="body2" className={classes.label}>
                  {summary.label}
                </Typography>
              </Grid>
            </>
          );
        })}
      </Grid>
    </div>
  );
};

export default Summary;
