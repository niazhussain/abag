import { createSelector } from 'reselect';
import { IStore } from '../interfaces/store';
import { IMarketItem } from '../interfaces/marketItem';

export const sortedMarketData = createSelector(
  (state: IStore) => state.Market.data,
  (state: IStore) => state.Market.sorting,
  (data, sorting) => {
    return data.sort((a: IMarketItem, b: IMarketItem) => {
      if (sorting.orderBy === 'favorites') {
        if ((a.favorite && b.favorite) || (!a.favorite && !b.favorite)) {
          return 0;
        }

        if (a.favorite) {
          return sorting.order === 'desc' ? -1 : 1;
        } else {
          return sorting.order === 'desc' ? 1 : -1;
        }
      } else {
        let valueA;
        let valueB;

        if (sorting.orderBy === 'name') {
          valueA = a.MarketName;
          valueB = b.MarketName;
        } else {
          valueA = a[sorting.orderBy];
          valueB = b[sorting.orderBy];
        }

        if (valueA === valueB) {
          return 0;
        }

        if (valueA > valueB) {
          return sorting.order === 'desc' ? -1 : 1;
        } else {
          return sorting.order === 'desc' ? 1 : -1;
        }
      }
    });
  },
);
