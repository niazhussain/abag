import { AnyAction } from 'redux';
import { IMarketStore } from '../../interfaces/marketStore';
import { actions } from '../actions/market';
import { IMarketItem } from '../../interfaces/marketItem';

export function Market(
  state: IMarketStore = {
    loading: false,
    data: [],
    hasError: false,
    sorting: {
      order: 'desc',
      orderBy: 'name',
    },
    defaultCurrency: null,
  },
  action: AnyAction,
): IMarketStore {
  switch (action.type) {
    case actions.LOAD_MARKET_ITEMS_START:
      return {
        ...state,
        loading: true,
        hasError: false,
      };
    case actions.LOAD_MARKET_ITEMS_SUCCESS:
      return {
        ...state,
        data: action.data,
        hasError: false,
        loading: false,
      };
    case actions.LOAD_MARKET_ITEMS_FAILURE:
      return {
        ...state,
        hasError: true,
        loading: false,
      };
    case actions.SET_FAVORITE_SUCCESS:
      return {
        ...state,
        data: state.data.map((item: IMarketItem) => {
          if (item.MarketName === action.MarketName) {
            item.favorite = action.state;
          }

          return item;
        }),
      };
    case actions.SET_DEFAULT_SUCCESS:
      return {
        ...state,
        defaultCurrency: action.name,
      };
    case actions.SET_SORTING:
      let order: 'desc' | 'asc' = 'desc';

      if (state.sorting.orderBy === action.name) {
        order = state.sorting.order === 'desc' ? 'asc' : 'desc';
      }

      return {
        ...state,
        sorting: {
          order,
          orderBy: action.name,
        },
      };
    default:
      return state;
  }
}
