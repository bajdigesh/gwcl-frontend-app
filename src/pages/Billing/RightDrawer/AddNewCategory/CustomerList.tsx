import { Box, IconButton, Typography } from '@material-ui/core';
import { BackIcon } from 'assets/images';
import SearchInput from 'components/SearchInput';
import Table, { IndeterminateCheckbox } from 'components/Table';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { CellValue } from 'react-table';
import useStyles from './style';

interface IProps {
  toggleOpen: () => void;
}

const CustomerList: React.FC<IProps> = ({ toggleOpen }) => {
  const { t } = useTranslation(['common', 'billing']);
  const classes = useStyles();

  const columns = [
    {
      id: 'selection',
      minWidth: 18,
      width: 18,
      Header: ({ getToggleAllRowsSelectedProps }: any) => {
        return (
          <div style={{ marginLeft: '8px' }}>
            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
          </div>
        );
      },
      Cell: ({ row }: any) => {
        return (
          <div style={{ marginLeft: '8px' }}>
            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
          </div>
        );
      },
    },
    {
      Header: t('common:customers'),
      Cell: (cellProps: CellValue) => {
        console.log(cellProps);
        return (
          <div>
            <Typography color="primary" gutterBottom variant="body2">
              {cellProps.row.original?.name}
            </Typography>
            <Box fontWeight="600" component="p">
              {cellProps.row.original?.category} |{' '}
              <Box fontWeight="500" component="span">
                {cellProps.row.original?.no}
              </Box>
            </Box>
          </div>
        );
      },
    },
  ];

  const customersData = Array.from(new Array(20)).map(item => ({
    name: 'John Doe',
    category: 'Commercial',
    no: '87263818823',
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
        <Typography variant="h3">{t('billing:searchCustomers')}</Typography>
      </Box>
      <SearchInput placeholderText={t('billing:searchCustomers')} onChange={handleSearchInputChange} />
      <Box mt={1} mx={-3}>
        <Table hideTableHead enableRowSelect columns={columns} data={customersData} />
      </Box>
    </>
  );
};

export default CustomerList;
