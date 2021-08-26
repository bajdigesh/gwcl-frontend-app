import { Box, IconButton, Typography } from '@material-ui/core';
import { BackIcon } from 'assets/images';
import Button from 'components/Button';
import SearchInput from 'components/SearchInput';
import Table, { IndeterminateCheckbox } from 'components/Table';
import useStyles from 'pages/Customer/RightDrawer/styles';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { CellValue } from 'react-table';

interface IProps {
  toggleOpen: () => void;
}

const Routes: React.FC<IProps> = ({ toggleOpen }) => {
  const { t } = useTranslation(['common', 'customers']);
  const classes = useStyles();

  const columns = [
    {
      id: 'selection',
      minWidth: 18,
      width: 18,
      Header: ({ getToggleAllRowsSelectedProps }: any) => {
        return <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />;
      },
      Cell: ({ row }: any) => {
        return <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />;
      },
    },
    {
      Header: 'customers',
      Cell: (cellProps: CellValue) => {
        return (
          <div>
            <Typography color="textPrimary" gutterBottom variant="body2">
              {cellProps.row.original?.name}
            </Typography>
            <Typography variant="subtitle2" component="p">
              {cellProps.row.original?.region}, {cellProps.row.original?.district} |{' '}
              {cellProps.row.original?.servicePoints} {t('customers:servicePoints')}
            </Typography>
          </div>
        );
      },
    },
  ];

  const routesData = Array.from(new Array(20)).map(item => ({
    name: 'Route Name',
    region: 'Region Name',
    district: 'District Name',
    servicePoints: '12',
  }));

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
  };

  return (
    <>
      <Box display="flex" alignItems="center" mb={3}>
        <IconButton onClick={() => toggleOpen()}>
          <BackIcon />
        </IconButton>
        <Typography variant="h3">{t('customers:selectExistingRoutes')}</Typography>
      </Box>
      <div className={classes.drawerContent}>
        <SearchInput placeholderText={t('customers:searchRoutes')} onChange={handleSearchInputChange} />
        <Box mt={1} mx={-3}>
          <Table
            hideTableHead
            enableRowSelect
            columns={columns}
            data={routesData}
            renderTableFooter={() => {
              return (
                <div className={classes.drawerFooter}>
                  <Button fullWidth size="large" borderRadius={0}>
                    {t('customers:addRoutes')}
                  </Button>
                </div>
              );
            }}
          />
        </Box>
      </div>
    </>
  );
};

export default Routes;
