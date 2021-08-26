import { Box, Typography } from '@material-ui/core';
import { unwrapResult } from '@reduxjs/toolkit';
import Button from 'components/Button';
import SearchInput from 'components/SearchInput';
import Table, { IndeterminateCheckbox } from 'components/Table';
import useStyles from 'pages/Devices/RightDrawer/styles';
import { IGetMetersByConcentratorIdSearchQuery } from 'pages/Devices/Shared/types';
import React, { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CellValue } from 'react-table';
import { useAppDispatch } from 'store';
import debounce from 'lodash/debounce';
import {
  bulkUnLinkConcentratorWithMeter,
  getMetersByConcentratorId,
  resetGetMetersByConcentratorState,
  selectBulkUnLinkConcentratorWithMeterState,
  selectGetMetersByConcentratorIdState,
} from 'store/device/concentrators';
import { decrypt } from 'utils';

const DeleteAllMeters = () => {
  const classes = useStyles();
  const { t } = useTranslation(['common', 'devices']);
  const dispatch = useAppDispatch();
  const { id: concentratorId } = useParams<{ id?: string | undefined }>();
  const { status } = useSelector(selectGetMetersByConcentratorIdState);
  const { status: bulkUnlinkConcentratorWithMeterStatus } = useSelector(selectBulkUnLinkConcentratorWithMeterState);
  const [items, setItems] = useState<Array<any>>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<IGetMetersByConcentratorIdSearchQuery>({
    page: 1,
    page_size: 40,
    meter_status_id: undefined,
    meter_type_id: undefined,
  });

  const columns = [
    {
      id: 'selection',
      Header: ({ getToggleAllRowsSelectedProps }: any) => {
        return <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />;
      },
      Cell: ({ row }: any) => {
        return <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />;
      },
    },
    {
      Header: t('devices:meter'),
      Cell: (cellProps: CellValue) => {
        return (
          <div>
            <Typography color="primary" gutterBottom variant="body2">
              {cellProps.row.original?.meter_number}
            </Typography>
            {/* <Box fontWeight="600" component="p">
              {cellProps.row.original?.user_name} |{' '}
              <Box fontWeight="500" component="span">
                {cellProps.row.original?.meter}
              </Box>
            </Box> */}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    if (concentratorId) {
      handleGetMetersByConcentratorId();
    }

    return () => {
      dispatch(resetGetMetersByConcentratorState());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, concentratorId]);

  const fetchMoreItems = () => {
    handleGetMetersByConcentratorId();
  };

  const handleGetMetersByConcentratorId = () => {
    dispatch(
      getMetersByConcentratorId({
        id: decrypt(concentratorId!),
        searchQuery: searchQuery,
      })
    )
      .then(unwrapResult)
      .then(data => {
        const { pagination } = data?.meta_data;
        var totalPages = Math.floor((pagination?.total + +pagination?.per_page - 1) / pagination?.per_page);
        if (totalPages <= pagination?.current_page) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
        setSearchQuery(searchQuery => ({ ...searchQuery, page: pagination?.current_page + 1 }));
        setItems(items => items.concat(data?.payload));
      });
  };

  const handleRemoveMetersButtonClick = (selectedRows: any) => {
    const ids = selectedRows.map((row: any) => row.original.id);
    const bulkUnlinkData = {
      concentratorId: decrypt(concentratorId!),
      postData: { meter_ids: ids },
    };
    dispatch(bulkUnLinkConcentratorWithMeter(bulkUnlinkData))
      .then(unwrapResult)
      .then(() => {
        const updatedItems = items.filter(item => !ids.includes(item.id));
        setItems(updatedItems);
        handleGetMetersByConcentratorId();
      });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearchInputChange = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      const searchValue = e.target.value;
      const updatedSearchQuery = { ...searchQuery, search: searchValue, page: 1 };
      setSearchQuery(updatedSearchQuery);
      setItems([]);
      dispatch(handleGetMetersByConcentratorId);
    }, 500),
    [dispatch]
  );
  return (
    <Box mt={2}>
      <SearchInput placeholderText={t('devices:searchMeters')} onChange={handleSearchInputChange} />
      <Box mt={2} mx={-3} className={classes.meterTableWrapper}>
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreItems}
          hasMore={hasMore}
          height={'calc(100vh - 200px)'}
          scrollThreshold={0.5}
          loader={
            <div className="loader" key={0}>
              {t('common:loading')} ...
            </div>
          }
        >
          <Table
            hideTableHead
            enableRowSelect
            columns={columns}
            data={items}
            loading={!items.length && status === 'loading'}
            rowsPerPage={searchQuery.page_size}
            renderTableFooter={selectedRows => (
              <div className={classes.footerFixedBtn}>
                <Button
                  disableElevation
                  fullWidth
                  btnDanger
                  borderRadius={0}
                  size="large"
                  loading={bulkUnlinkConcentratorWithMeterStatus === 'loading'}
                  onClick={() => handleRemoveMetersButtonClick(selectedRows)}
                >
                  {t('devices:removeSelectedMetersFromConc')} 27364892
                </Button>
              </div>
            )}
          />
        </InfiniteScroll>
      </Box>
    </Box>
  );
};

export default DeleteAllMeters;
