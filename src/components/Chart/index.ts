// export { htmlLegendPlugin } from './htmlLegendPlugin';
import { lazy } from 'react';
const Chart = lazy(() => import(/* webpackChunkName: "Chart" */ './Chart'));

export { lineChartDefaultOptions, stackedBarChartDefaultOption } from './options';
export { configureTooltipPosition, createTooltipElement, toggleTooltip } from './Tooltip';
export default Chart;
