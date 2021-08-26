import { Box, MenuItem } from '@material-ui/core';
import { BackIcon, BanIcon, DeleteIcon, EditIcon, MoreMenuIcon } from 'assets/images';
import clsx from 'clsx';
import CustomizedDropdown from 'components/Dropdown/CustomizedDropdown';
import Title from 'components/Title';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { decrypt } from 'utils';
import CustomerData from '../CustomerData';
import CustomerDetailTab from './CustomerDetailTab';
import useStyles from './styles';

const CustomerDetail = (props: any) => {
  const { t } = useTranslation(['common', 'customers']);
  const classes = useStyles();
  const history = useHistory();
  const [customerDetailData, setCustomerDetailData] = useState<any>([]);
  const { id } = props.match.params;

  useEffect(() => {
    const decryptedId: unknown = decrypt(id);
    const data = CustomerData.payload[decryptedId as number];
    setCustomerDetailData(data);
  }, [id]);

  const handleEdit = () => {};

  return (
    <div className={classes.innerContainer}>
      <Box display="flex" alignItems="center" flexWrap="wrap" position="relative" className={classes.topBar}>
        <div className={classes.backIcon} onClick={() => history.push('/customers')}>
          <BackIcon />
        </div>
        <Title>{customerDetailData?.account_name}</Title>
        <span className={classes.accountNumber}>A/C No. {customerDetailData?.account_number}</span>
        <span
          className={clsx(
            classes.accountStatus,
            { [classes.statusActive]: customerDetailData.customer_status === 'active' },
            { [classes.statusSuspended]: customerDetailData.customer_status !== 'active' }
          )}
        >
          {customerDetailData.customer_status === 'active' ? t('common:active') : t('common:suspended')}
        </span>

        <CustomizedDropdown
          open={true}
          renderTriggerElement={handleClick => (
            <span onClick={handleClick} className={classes.moreMenuIcon}>
              <MoreMenuIcon />
            </span>
          )}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          {handleClose => (
            <div className={classes.menuList}>
              <MenuItem
                onClick={() => {
                  handleEdit();
                  handleClose();
                }}
              >
                <EditIcon />
                {t('common:editInformation')}
              </MenuItem>
              <MenuItem onClick={e => console.log(e)}>
                <BanIcon />
                {t('common:suspend')}
              </MenuItem>

              <MenuItem onClick={e => console.log(e)} className="deleteMenuItem">
                <DeleteIcon />
                {t('common:disconnect')}
              </MenuItem>
            </div>
          )}
        </CustomizedDropdown>
      </Box>
      <Box display={{ xs: 'block', md: 'flex' }} alignItems="center">
        <p className={classes.customerActivityInfoSummary}>
          <label>Current Balance</label>
          <span>$100</span>
        </p>
        <p className={classes.customerActivityInfoSummary}>
          <label>Last Payment</label>
          <span>$150 on Sep 19,2020</span>
        </p>
        <p className={classes.customerActivityInfoSummary}>
          <label>Last Activity</label>
          <span>Payment of $100 on Sep 19,2020</span>
        </p>
      </Box>

      {/* Customer Detail Tab Panel */}
      <div className={classes.customerDetailTabs}>
        <CustomerDetailTab />
      </div>
    </div>
  );
};

export default CustomerDetail;
