import { Box, Grid } from '@material-ui/core';
import Button from 'components/Button';
import { ControllableDrawer } from 'components/Drawer';
import AddNewWaterRate from 'pages/Billing/RightDrawer/AddNewWaterRate';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import {
  getServiceRatesByServiceAgreements,
  selectGetServiceRatesByServiceAgreement,
} from 'store/billing/serviceRates';
import { IServiceRatesByServiceAgreement } from 'store/billing/serviceRates/types';
import WaterRateCard, { WaterRateCardSkeleton } from '../WaterRateCard';
import useStyles from './style';

const WaterRates = () => {
  const { t } = useTranslation(['common', 'billing']);
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { status, data } = useSelector(selectGetServiceRatesByServiceAgreement);
  const [items, setItems] = useState<Array<any>>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<IServiceRatesByServiceAgreement>({
    page: 1,
    page_size: 9,
  });
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current && status === 'success') {
      if (data.resetData) {
        window.scrollTo(0, 0);
        setItems(data?.payload);
      } else {
        setItems(items => items.concat(data?.payload));
      }

      const { pagination } = data?.meta_data;
      var totalPages = Math.floor((pagination?.total + +pagination?.per_page - 1) / pagination?.per_page);
      if (totalPages <= pagination?.current_page) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
      setSearchQuery(searchQuery => ({ ...searchQuery, page: pagination?.current_page + 1 }));
    }

    if (!didMountRef.current) {
      didMountRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useEffect(() => {
    dispatch(getServiceRatesByServiceAgreements(searchQuery));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const fetchMoreData = () => {
    dispatch(getServiceRatesByServiceAgreements(searchQuery));
  };

  console.log(status, data);

  return (
    <Box position="relative" mt={1}>
      <ControllableDrawer
        toggleElement={handleToggle => (
          <Button disableElevation className={classes.btnAction} onClick={handleToggle}>
            {t('billing:addWaterRate')}
          </Button>
        )}
      >
        {toggleDrawer => <AddNewWaterRate toggleDrawer={toggleDrawer} />}
      </ControllableDrawer>

      <InfiniteScroll
        style={{ overflow: 'hidden' }}
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<WaterRateCardSkeleton />}
      >
        {Array.isArray(items) && items.length ? (
          <Grid container spacing={3}>
            {items.map((data: any) => (
              <Grid key={data.id} item xs={12} md={6} xl={4}>
                <WaterRateCard cardData={data} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <WaterRateCardSkeleton />
        )}
      </InfiniteScroll>
    </Box>
  );
};
export default WaterRates;
