import { lazy } from 'react';

const AddNewCategory = lazy(() => import(/* webpackChunkName: "AddNewCategory" */ './AddNewCategory'));
export default AddNewCategory;
