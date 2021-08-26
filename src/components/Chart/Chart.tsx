import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { LEGEND_CONTAINER_ID } from 'global/constants';
import React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Props as RechartProps } from 'react-chartjs-2/dist/types';
import HtmlLegendPlugin from './htmlLegendPlugin';

interface ChartProps extends RechartProps {
  customLegend?: boolean;
}

const useStyles = makeStyles(theme => ({
  chartContainer: {
    '& canvas': {
      width: '100% !important',
      height: 'auto !important',
    },
  },
}));

const Chart: React.FC<ChartProps> = ({ customLegend, plugins, type, ...props }) => {
  const classes = useStyles();
  const renderChart = () => {
    switch (type) {
      case 'line':
        return <Line {...props} type={type} plugins={customLegend ? [HtmlLegendPlugin] : plugins} />;

      case 'bar':
        return <Bar {...props} type={type} plugins={customLegend ? [HtmlLegendPlugin] : plugins} />;

      case 'pie':
        return <Pie {...props} type={type} plugins={customLegend ? [HtmlLegendPlugin] : plugins} />;
      default:
        return null;
    }
  };

  return (
    <>
      {customLegend && <div id={LEGEND_CONTAINER_ID}></div>}
      <div className={clsx(classes.chartContainer, 'chart-container')}>{renderChart()}</div>
    </>
  );
};

export default Chart;
