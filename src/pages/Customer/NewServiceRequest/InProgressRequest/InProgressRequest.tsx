import { Box, Typography } from '@material-ui/core';
import { InfoIcon, MailIcon, PhoneIcon } from 'assets/images';
import CustomizedDropdown from 'components/Dropdown/CustomizedDropdown';
import { FilterContainer } from 'components/Filters';
import Table, { IndeterminateCheckbox } from 'components/Table';
import { sortingOrder } from 'global/constants';
import debounce from 'lodash/debounce';
import useStyles from 'pages/Customer/NewServiceRequest/styles';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Filter from './Filter';

const InProgressRequest = ({ inProgressServiceRequest }: any) => {
  const classes = useStyles();
  const { t } = useTranslation(['customers']);
  const [filterSchema, setFilterSchema] = useState<any>({
    page: 1,
    page_size: 10,
    category: '',
    status: '',
    startDate: '',
    endData: '',
    search: '',
    orderBy: 'id',
    order: sortingOrder.ASCENDING,
  });

  const columns = [
    {
      id: 'selection',
      width: 0,
      Header: ({ getToggleAllRowsSelectedProps }: any) => {
        return <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />;
      },
      Cell: ({ row }: any) => {
        return <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />;
      },
    },
    {
      Header: t('customers:applicationID'),
      accessor: 'application_id',
      Cell: (data: any) => {
        return (
          <>
            <Typography variant="body2" gutterBottom>
              {data.row.original.application_id}
            </Typography>
            <Typography variant="subtitle2" component="p">
              Applied on {data.row.original.applied_on}
            </Typography>
          </>
        );
      },
    },
    {
      Header: t('customers:applicantName'),
      accessor: 'applicant_name',
      Cell: (data: any) => {
        return (
          <Box display="flex" alignItems="center">
            <Typography variant="h6" color="primary">
              {data.row.original.applicant_name}
            </Typography>
            <CustomizedDropdown
              open={true}
              renderTriggerElement={handleClick => (
                <Box ml={1} className={classes.infoIcon} onClick={handleClick}>
                  <InfoIcon />
                </Box>
              )}
            >
              {handleClose => (
                <Box className={classes.infoBox}>
                  <Typography className={classes.infoTitle}>John Doe</Typography>
                  <p className={classes.infoContent}>
                    <span>
                      <MailIcon />
                    </span>{' '}
                    {data.row.original.applicant_mail}
                  </p>
                  <p className={classes.infoContent}>
                    <span>
                      <PhoneIcon />
                    </span>{' '}
                    {data.row.original.applicant_number}
                  </p>
                </Box>
              )}
            </CustomizedDropdown>
          </Box>
        );
      },
    },
    {
      Header: t('customers:requestStatus'),
      accessor: 'request_status',
      Cell: (data: any) => {
        const status = data.row.original.request_status;
        const requestDate = data.row.original.request_date;

        return (
          <>
            <Typography variant="body2" gutterBottom>
              {status}
            </Typography>
            <Typography variant="subtitle2" component="p">
              {status === 'Pending' ? 'since' : 'on'} {requestDate}
            </Typography>
          </>
        );
      },
    },
    {
      Header: t('customers:address'),
      accessor: 'address',
    },
  ];

  //Filter form handler
  const handleFilterFormSubmit = useCallback((values: any) => {
    // const updatedFilterSchema = {
    //   ...filterSchema,
    //   region_id: values.region_id?.value,
    //   district_id: values.district_id?.value,
    // };
    // setFilterSchema(updatedFilterSchema);
    // dispatch(getUsers(updatedFilterSchema));
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearchInputChange = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      // const searchValue = e.target.value;
      // const updatedFilterSchema = { ...filterSchema, search: searchValue };
      // setFilterSchema(updatedFilterSchema);
      // dispatch(getUsers(updatedFilterSchema));
    }, 500),
    []
  );

  const handleSortingMenuChange = useCallback((data: IAutoCompleteOption) => {
    // console.log(data);
    // if (data.value === filterSchema.order) return;
    // const updatedFilterSchema = { ...filterSchema, order: data.value };
    // setFilterSchema(updatedFilterSchema);
    // dispatch(getUsers(updatedFilterSchema));
  }, []);

  return (
    <Box className={classes.componentContainer}>
      <Typography variant="h5" className={classes.componentTitle}>
        {inProgressServiceRequest.length} {t('customers:inProgress')}
      </Typography>
      <FilterContainer>
        <Filter
          sortedOrder={filterSchema.order!}
          handleSearchInputChange={handleSearchInputChange}
          handleFilterFormSubmit={handleFilterFormSubmit}
          handleSortingMenuChange={handleSortingMenuChange}
        />
      </FilterContainer>
      <Table columns={columns} data={inProgressServiceRequest} enableRowSelect />
    </Box>
  );
};
export default InProgressRequest;
