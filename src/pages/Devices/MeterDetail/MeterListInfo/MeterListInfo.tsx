import { Box, Grid } from '@material-ui/core';
import Map from 'components/Map';
import ColumnListing from 'pages/Devices/MeterDetail/ColumnListing';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectGetMeterByIdState } from 'store/device/meters';
import useStyles from './style';

const MeterListInfo = () => {
  const classes = useStyles();
  const { t } = useTranslation(['common', 'devices']);
  const { data } = useSelector(selectGetMeterByIdState);
  const columnData1 = [
    {
      id: '1',
      label: t('common:meterType'),
      data: () => {
        return (
          <>
            {data?.payload?.type?.name ? (
              <>
                {data.payload.type?.name} | Concentrator:
                <i>{data?.payload?.concentrator_id || 'N/A'}</i>
              </>
            ) : (
              ''
            )}
          </>
        );
      },
    },
    {
      id: '2',
      label: t('devices:meterSize'),
      data: () => {
        return <>{data?.payload?.size?.name || 'N/A'}</>;
      },
    },
    {
      id: '3',
      label: t('common:installedOn'),
      data: () => {
        return (
          <>
            <span>N/A</span>
          </>
        );
      },
    },
    {
      id: '4',
      label: t('devices:lastReadingDate'),
      data: () => {
        return (
          <>
            <span>N/A</span>
          </>
        );
      },
    },
    {
      id: '5',
      label: t('devices:meterReader'),
      data: () => {
        return (
          <>
            <span>N/A</span>
          </>
        );
      },
    },
  ];
  const columnData2 = [
    {
      id: '6',
      label: t('devices:meterModal'),
      data: () => {
        return <>{data?.payload?.model?.name || 'N/A'}</>;
      },
    },
    {
      id: '7',
      label: t('devices:meterFactor'),
      data: () => {
        return <>{data?.payload?.size?.factor || 'N/A'}</>;
      },
    },
    {
      id: '8',
      label: t('common:installedBy'),
      data: () => {
        return <>N/A</>;
      },
    },
    {
      id: '9',
      label: t('devices:lastReadingAmount'),
      data: () => {
        return <>N/A</>;
      },
    },
  ];
  const columnData3 = [
    {
      id: '10',
      label: t('common:location'),
      data: () => {
        return (
          <>
            <span>
              {data?.payload?.premises?.address_1}, {data?.payload?.premises?.address_2}
            </span>
            <Map
              mapStyles={{ height: '300px' }}
              zoom={13}
              latLng={{
                lat: parseInt(data?.payload?.premises?.latitude, 10) || 0.0,
                lng: parseInt(data?.payload?.premises?.longitude, 10) || 0.0,
              }}
              markers={[
                {
                  lat: parseInt(data?.payload?.premises?.latitude, 10) || 0.0,
                  lng: parseInt(data?.payload?.premises?.longitude, 10) || 0.0,
                },
              ]}
            ></Map>
          </>
        );
      },
    },
  ];
  return (
    <Box mb={{ sm: 1, lg: 3 }} className={classes.meterDetails}>
      <Grid container spacing={2}>
        <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
          <ColumnListing columns={columnData1} />
        </Grid>
        <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
          <ColumnListing columns={columnData2} />
        </Grid>
        <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
          <ColumnListing columns={columnData3} />
        </Grid>
      </Grid>
    </Box>
  );
};
export default MeterListInfo;
