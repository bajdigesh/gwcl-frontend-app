import { Typography } from '@material-ui/core';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Row } from 'react-table';
import useStyles from './styles';

interface ITableFooter {
  selectedRows: Row<any>[];
  children?: React.ReactNode;
}

const TableFooter: React.FC<ITableFooter> = ({ selectedRows, children }) => {
  const classes = useStyles();
  const { t } = useTranslation(['common']);
  return (
    <div className={classes.tableFooter}>
      <Typography variant="body2">
        {selectedRows.length} {t('common:selected')}
      </Typography>

      <div className={classes.tableFooterButtons}>{children && children}</div>
    </div>
  );
};

export default memo(TableFooter);
