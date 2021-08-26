type THttpStatus = 'loading' | 'success' | 'failed' | null;

type TAppRoutes = RouteProps & {
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
};
interface ISidebarItem {
  icon: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  path: string;
  label: string;
}
interface ISliceState<T> {
  message?: string | undefined;
  data: T;
  status: THttpStatus;
}
interface IAutoCompleteOption {
  label: string;
  value: any;
}

type IPagination = null | {
  per_page: number;
  total: number;
  per_page: number;
  last_page: number;
  current_page: number;
  from: number;
  to: number;
};
// interface IPagination {
//   per_size: string;
//   number: string;
// }
