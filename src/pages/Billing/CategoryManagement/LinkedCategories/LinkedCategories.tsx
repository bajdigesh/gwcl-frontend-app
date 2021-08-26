import { Grid } from '@material-ui/core';
import CategoryCard, { CategoryCardSkeleton } from 'pages/Billing/CategoryManagement/CategoryCard';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import { getServiceAgreements, selectGetServiceAgreements } from 'store/billing/serviceAgreements';
import { IServiceAgreementQuery } from 'store/billing/serviceAgreements/types';

const LinkedCategories = () => {
  const { t } = useTranslation(['common', 'billing']);
  const dispatch = useAppDispatch();
  const { data, status } = useSelector(selectGetServiceAgreements);
  const [items, setItems] = useState<Array<any>>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<IServiceAgreementQuery>({
    type: 'linked',
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
    dispatch(getServiceAgreements(searchQuery));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const fetchMoreData = () => {
    dispatch(getServiceAgreements(searchQuery));
  };

  return (
    <InfiniteScroll
      style={{ overflow: 'hidden' }}
      dataLength={items.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<CategoryCardSkeleton />}
    >
      {Array.isArray(items) && items.length ? (
        <Grid container spacing={3}>
          {items.map((data: any) => (
            <Grid key={data.id} item xs={12} lg={6} xl={4}>
              <CategoryCard data={data} type="linked" />
            </Grid>
          ))}
        </Grid>
      ) : (
        <CategoryCardSkeleton />
      )}
    </InfiniteScroll>
  );
};

export default LinkedCategories;
