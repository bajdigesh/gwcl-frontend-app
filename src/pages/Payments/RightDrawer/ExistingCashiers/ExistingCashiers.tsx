import { Box, IconButton, makeStyles, Typography } from '@material-ui/core';
import { BackIcon } from 'assets/images';
import Button from 'components/Button';
import SearchInput from 'components/SearchInput';
import Table, { IndeterminateCheckbox } from 'components/Table';
import Title from 'components/Title';
import useStyles from 'pages/Payments/RightDrawer/styles';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ExistingCashierData from './ExistingCashierData';

const inlineStyles = makeStyles(theme => ({
  titleContainer: {
    '& h3': {
      margin: 0,
    },
  },

  existingCashierList: {
    width: 'calc(100% + 48px)',
    marginLeft: -24,

    [theme.breakpoints.up('md')]: {
      marginTop: -8,
    },
  },
}));

interface IProps {
  toggleCashier: () => void;
}

const ExistingCashiers: React.FC<IProps> = ({ toggleCashier }) => {
  const { t } = useTranslation(['common', 'payment']);
  const styles = inlineStyles();
  const classes = useStyles();

  const [existingCashierData, setExistingCashierData] = useState<any>([]);

  useEffect(() => {
    const data = ExistingCashierData.payload;
    setExistingCashierData(data);
  }, []);

  const columns = [
    {
      id: 'selection',
      width: 0,
      Header: '',
      Cell: ({ row }: any) => {
        return <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />;
      },
    },
    {
      Header: '',
      accessor: 'cashier_name',
      Cell: (data: any) => (
        <>
          <p>{data.row.original.cashier_name}</p>
          <Typography variant="subtitle2">{data.row.original.cashier_code}</Typography>
        </>
      ),
    },
  ];
  return (
    <>
      <Box display="flex" alignItems="center" mb={3} className={styles.titleContainer}>
        <IconButton onClick={() => toggleCashier()}>
          <BackIcon />
        </IconButton>
        <Title>{t('payment:selectExistingCashiers')}</Title>
      </Box>

      <SearchInput placeholderText={t('payment:searchCashiers')} />

      <Box className={styles.existingCashierList}>
        <Table enableRowSelect columns={columns} data={existingCashierData} />
      </Box>

      <div className={classes.drawerFooter}>
        <Button type="submit" fullWidth size="large" borderRadius={0}>
          {t('payment:addCashiers')}
        </Button>
      </div>
    </>
  );
};

export default ExistingCashiers;
