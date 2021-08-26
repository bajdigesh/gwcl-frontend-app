import { Box } from '@material-ui/core';
import { BillingIcon, CardIcon, ComplaintIcon } from 'assets/images';
import Button from 'components/Button';
import { FilterSearch } from 'components/Filters';
import { TimelineCard, TimelineList } from 'components/Timeline';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import useStyles from '../styles';

const All = () => {
  const { t } = useTranslation(['common', 'customers']);
  const classes = useStyles();
  const onSearchFieldChange = () => {};
  return (
    <>
      <Box display={{ xs: 'block', md: 'flex' }} alignItems="center" justifyContent="space-between">
        <Box display="flex" flexWrap="wrap" className={classes.tabsGroup}>
          <Button color="inherit" variant="outlined" disableElevation>
            {t('common:payments')}
          </Button>
          <Button color="inherit" variant="outlined" disableElevation>
            {t('common:billing')}
          </Button>
          <Button color="inherit" variant="outlined" disableElevation>
            {t('common:adjustments')}
          </Button>
          <Button color="inherit" variant="outlined" disableElevation>
            {t('common:meterReading')}
          </Button>
          <Button color="inherit" variant="outlined" disableElevation>
            {t('common:complaints')}
          </Button>
        </Box>

        <FilterSearch onChange={onSearchFieldChange} />
      </Box>

      <div className={classes.customerTimeline}>
        <TimelineList title="September 2020">
          <TimelineCard
            icon={<CardIcon />}
            cardTitle={
              <>
                Payment of $150 for Aug 2020 completed. <Link to="./#">View Details</Link>
              </>
            }
            cardTimeCaption="Sep 19, 2020 03:29 PM"
            cardClass="customerTimelineCard"
          />

          <TimelineCard
            icon={<BillingIcon />}
            cardTitle={
              <>
                Bill amount for Aug 2020 changed to $150 from $164 by Ryan Beesly with reason “Incorrect amount noted
                during meter reading”.
              </>
            }
            cardTimeCaption="Sep 19, 2020 03:29 PM"
            cardClass="customerTimelineCard"
          />

          <TimelineCard
            icon={<BillingIcon />}
            cardTitle={
              <>
                Bill for Aug 2020 generated. <Link to="./#">View Details</Link>
              </>
            }
            cardTimeCaption="Sep 19, 2020 03:29 PM"
            cardClass="customerTimelineCard"
          />
        </TimelineList>

        <TimelineList title="August 2020">
          <TimelineCard
            icon={<ComplaintIcon />}
            cardTitle={<>Customer category changed from Commercial to Domestic.</>}
            cardTimeCaption="Sep 5, 2020 03:29 PM"
            cardClass="customerTimelineCard"
          />

          <TimelineCard
            icon={<ComplaintIcon />}
            cardTitle={<>Customer complaint #20394 ‘Meter not working’ resolved.</>}
            cardTimeCaption="Sep 19, 2020 03:29 PM"
            cardClass="customerTimelineCard"
          />

          <TimelineCard
            icon={<ComplaintIcon />}
            cardTitle={<>Technician assigned for complaint #20394 ‘Meter not working.</>}
            cardTimeCaption="Sep 5, 2020 03:29 PM"
            cardClass="customerTimelineCard"
          />
        </TimelineList>
      </div>
    </>
  );
};

export default All;
