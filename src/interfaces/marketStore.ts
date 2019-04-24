import { IMarketItem } from './marketItem';

export interface IMarketStore {
  loading: boolean;
  data: IMarketItem[];
  hasError: boolean;
  defaultCurrency: null | string;
  sorting: {
    order: 'desc' | 'asc';
    orderBy: 'name' | 'Bid' | 'Ask' | 'favorites';
  };
}
