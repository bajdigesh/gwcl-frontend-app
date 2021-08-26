import { unwrapResult } from '@reduxjs/toolkit';
import debounce from 'lodash/debounce';
import React, { useEffect, useState } from 'react';
import { useAppDispatch } from 'store';
import { hasMorePage } from 'utils';

const initialSearchQuery = {
  page: 1,
  page_size: 50,
  search: '',
};

const useLazyAutocomplete = ({
  getItems,
  mapOptions,
}: {
  getItems: Function;
  mapOptions: (item: any) => { label: string; value: string };
}) => {
  const dispatch = useAppDispatch();

  const [loadOptions, setLoadOptions] = useState<any>({
    initialOptions: [],
    options: [],
    initialHasMore: false,
    hasMore: false,
  });
  const [searchQuery, setSearchQuery] = useState<any>(initialSearchQuery);

  useEffect(() => {
    dispatch(getItems(searchQuery))
      .then(unwrapResult)
      .then((payload: any) => {
        const options = payload.payload.map(mapOptions);
        const hasMore = hasMorePage(payload.meta_data?.pagination);
        setLoadOptions({ initialOptions: options, options: options, hasMore, initialHasMore: hasMore });
        setSearchQuery({ ...searchQuery, page: payload?.meta_data?.pagination?.current_page + 1 });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const fetchMoreItems = () => {
    dispatch(getItems(searchQuery))
      .then(unwrapResult)
      .then((payload: any) => {
        const newOptions = payload.payload.map(mapOptions);
        const updatedOptions = [...loadOptions.options, ...newOptions];
        const hasMore = hasMorePage(payload.meta_data.pagination);
        setLoadOptions({ ...loadOptions, options: updatedOptions, hasMore });
        setSearchQuery({ ...searchQuery, page: payload?.meta_data?.pagination?.current_page + 1 });
      });
  };

  /**
   * Checks for empty strings, clear, reset and onchange event to handle data
   */
  const searchItems = debounce((e: React.SyntheticEvent, value: string, reason: string) => {
    if (e?.type === 'change') {
      if (value !== '') {
        const newSearchQuery: any = { ...initialSearchQuery, search: value.toLowerCase() };
        dispatch(getItems(newSearchQuery))
          .then(unwrapResult)
          .then((payload: any) => {
            const newOptions = payload.payload.map(mapOptions);
            const hasMore = hasMorePage(payload.meta_data.pagination);
            setLoadOptions({ ...loadOptions, options: newOptions, hasMore });
            setSearchQuery(initialSearchQuery);
          });
      } else {
        setLoadOptions({ ...loadOptions, options: loadOptions.initialOptions, hasMore: loadOptions.initialHasMore });
      }
    }
    if ((reason === 'clear' || reason === 'reset') && value === '') {
      setLoadOptions({ ...loadOptions, options: loadOptions.initialOptions, hasMore: loadOptions.initialHasMore });
    }
  }, 200);

  return { searchItems, fetchMoreItems, loadOptions };
};

export default useLazyAutocomplete;
