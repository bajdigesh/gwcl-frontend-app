export interface ITabHeaderItem {
  title: string;
}

export interface IRouteTabHeaderItem {
  title: string;
  pathname: string;
}

export interface ITabPanelItem {
  component: React.ReactNode;
}
