import { lazy } from 'react';
const Table = lazy(() => import(/* webpackChunkName: "Table" */ './Table'));

export { default as IndeterminateCheckbox } from './IndeterminateCheckbox';
export { default as TableFooter } from './TableFooter';
export { default as TablePagination } from './TablePagination';

export default Table;
