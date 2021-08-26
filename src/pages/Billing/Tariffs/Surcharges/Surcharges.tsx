import { Box, Grid } from '@material-ui/core';
import Button from 'components/Button';
import { ControllableDrawer } from 'components/Drawer';
import AddSurcharge from 'pages/Billing/RightDrawer/AddSurcharge';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import { getSurcharges, selectGetSurcharges } from 'store/billing/surcharges';
import { ISurcharges } from 'store/billing/surcharges/types';
import SurchargeCard, { SurchargeCardSkeleton } from '../SurchargeCard';
import useStyles from './style';

const Surcharges = () => {
  const classes = useStyles();
  const { t } = useTranslation(['billing']);
  const dispatch = useAppDispatch();
  const { status, data } = useSelector(selectGetSurcharges);

  const [items, setItems] = useState<Array<any>>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<ISurcharges>({
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
    dispatch(getSurcharges(searchQuery));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const fetchMoreData = () => {
    dispatch(getSurcharges(searchQuery));
  };

  return (
    <Box position="relative" mt={1}>
      <ControllableDrawer
        toggleElement={handleToggle => (
          <Button disableElevation className={classes.btnAction} onClick={handleToggle}>
            {t('billing:addSurcharge')}
          </Button>
        )}
      >
        {toggleDrawer => <AddSurcharge toggleDrawer={toggleDrawer} />}
      </ControllableDrawer>

      {/* {status === 'loading' && <SurchargeCardSkeleton />}

      {status === 'success' && Array.isArray(data?.payload) && !data?.payload?.length ? (
        <div>No Data found!!</div>
      ) : null}

      {status === 'success' && Array.isArray(data?.payload) && data?.payload.length ? (
        <Grid container spacing={3}>
          {data.payload.map((cardData: any) => (
            <Grid item xs={12} lg={6} xl={4}>
              <SurchargeCard cardData={cardData} />
            </Grid>
          ))}
        </Grid>
      ) : null} */}

      <InfiniteScroll
        style={{ overflow: 'hidden' }}
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<SurchargeCardSkeleton />}
      >
        {Array.isArray(items) && items.length ? (
          <Grid container spacing={3}>
            {items.map((cardData: any) => (
              <Grid key={cardData.id} item xs={12} lg={6} xl={4}>
                <SurchargeCard cardData={cardData} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <SurchargeCardSkeleton />
        )}
      </InfiniteScroll>
    </Box>
  );
};
export default Surcharges;
