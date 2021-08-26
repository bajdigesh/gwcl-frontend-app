import { Box } from '@material-ui/core';
import { unwrapResult } from '@reduxjs/toolkit';
import { ExclamationIcon, TickIcon } from 'assets/images';
import clsx from 'clsx';
import SearchInput from 'components/SearchInput';
import Table from 'components/Table';
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
  getMetersByConcentratorId,
  resetGetMetersByConcentratorState,
  selectGetMetersByConcentratorIdState,
} from 'store/device/concentrators';
import { decrypt } from 'utils';

const ReadAllMeter = () => {
  const classes = useStyles();
  const { t } = useTranslation(['common', 'devices']);
  const dispatch = useAppDispatch();
  const { id: concentratorId } = useParams<{ id?: string | undefined }>();
  const { status } = useSelector(selectGetMetersByConcentratorIdState);
  const [items, setItems] = useState<Array<any>>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<IGetMetersByConcentratorIdSearchQuery>({
    page: 1,
    page_size: 13,
    meter_status_id: undefined,
    meter_type_id: undefined,
    search: '',
  });

  const columns = [
    {
      width: 150,
      Header: t('devices:meterNumber'),
      accessor: 'meter_number',
    },
    {
      width: 280,
      Header: t('devices:meterVerification'),
      accessor: 'meter_verified',
      Cell: (cellProps: CellValue) => {
        return (
          <div className={clsx(classes.activeStatus, { verified: cellProps.value }, { unverified: !cellProps.value })}>
            {cellProps.value ? (
              <>
                <TickIcon /> {t('devices:verified')}
              </>
            ) : (
              <>
                <ExclamationIcon /> {t('devices:notVerified')}
              </>
            )}
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
      <Box mt={2} mx={-3}>
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreItems}
          hasMore={hasMore}
          scrollThreshold={0.5}
          height={'calc(100vh - 200px)'}
          loader={
            <div className="loader" key={0}>
              {t('common:loading')} ...
            </div>
          }
        >
          <Table
            columns={columns}
            data={items}
            loading={items.length === 0 && status === 'loading'}
            rowsPerPage={searchQuery.page_size}
          />
        </InfiniteScroll>
      </Box>
    </Box>
  );
};

export default ReadAllMeter;
