import { Box } from '@material-ui/core';
import { CardIcon } from 'assets/images';
import Button from 'components/Button';
import { TimelineCard, TimelineList } from 'components/Timeline';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useStyles from './style';

const MeterHistory = () => {
  const classes = useStyles();
  const { t } = useTranslation(['common', 'devices']);
  return (
    <>
      <h4>{t('devices:meterHistory')}</h4>
      <Box display={{ sm: 'block', md: 'flex' }} className={classes.tabsGroup}>
        <Button disableElevation variant="outlined" color="inherit">
          {t('common:online')}/{t('common:offline')}
        </Button>

        <Button disableElevation variant="outlined" color="inherit">
          {t('common:faculty')}
        </Button>

        <Button disableElevation variant="outlined" color="inherit">
          {t('common:addressChange')}
        </Button>

        <Button disableElevation variant="outlined" color="inherit">
          {t('devices:installationAndRemoval')}
        </Button>
      </Box>

      <TimelineList title="September 2020">
        <TimelineCard
          icon={<CardIcon />}
          cardTitle={t('devices:meterConnectedToAccount') + 12378812 + t('devices:under') + 'John Doe'}
          cardTimeCaption={new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
            hour: 'numeric',
            hour12: true,
            minute: 'numeric',
          }).format(new Date('2021-03-12T15:52:06.000000Z'))}
        />
        <TimelineCard
          icon={<CardIcon />}
          cardTitle={t('devices:meterConnectedToAccount') + 12378812 + t('devices:under') + 'John Doe'}
          cardTimeCaption={new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
            hour: 'numeric',
            hour12: true,
            minute: 'numeric',
          }).format(new Date('2021-03-12T15:52:06.000000Z'))}
        />
      </TimelineList>
      <TimelineList title="April 2020">
        <TimelineCard
          icon={<CardIcon />}
          cardTitle={t('devices:meterConnectedToAccount') + 12378812 + t('devices:under') + 'John Doe'}
          cardTimeCaption={new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
            hour: 'numeric',
            hour12: true,
            minute: 'numeric',
          }).format(new Date('2021-03-12T15:52:06.000000Z'))}
        />
        <TimelineCard
          icon={<CardIcon />}
          cardTitle={t('devices:meterConnectedToAccount') + 12378812 + t('devices:under') + 'John Doe'}
          cardTimeCaption={new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
            hour: 'numeric',
            hour12: true,
            minute: 'numeric',
          }).format(new Date('2021-03-12T15:52:06.000000Z'))}
        />
      </TimelineList>
    </>
  );
};
export default MeterHistory;
