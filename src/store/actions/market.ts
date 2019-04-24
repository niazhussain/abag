import { IMarketItem } from '../../interfaces/marketItem';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import axios, { AxiosPromise, AxiosResponse, AxiosError } from 'axios';
import { BACKEND_URL, FRONTEND_PREFIX } from '../../const/backend';

export const actions = {
  LOAD_MARKET_ITEMS_SUCCESS: 'LOAD_MARKET_ITEMS_SUCCESS',
  LOAD_MARKET_ITEMS_FAILURE: 'LOAD_MARKET_ITEMS_FAILURE',
  LOAD_MARKET_ITEMS_START: 'LOAD_MARKET_ITEMS_START',
  SET_FAVORITE_SUCCESS: 'SET_FAVORITE_SUCCESS',
  SET_SORTING: 'SET_SORTING',
  SET_DEFAULT_SUCCESS: 'SET_DEFAULT_SUCCESS',
};

export const defaultCurrencyKey = 'defaultCurrency';

export const LOAD_MARKET_ITEMS_SUCCESS = (data: IMarketItem[]) => ({
  type: actions.LOAD_MARKET_ITEMS_SUCCESS,
  data,
});

export const LOAD_MARKET_ITEMS_FAILURE = () => ({
  type: actions.LOAD_MARKET_ITEMS_FAILURE,
});

export const LOAD_MARKET_ITEMS_START = () => ({
  type: actions.LOAD_MARKET_ITEMS_START,
});

export const LOAD_MARKET_ITEMS = (): ThunkAction<
  AxiosPromise<any>,
  {},
  { isServer?: boolean },
  AnyAction
> => {
  return (dispatch, getState, extraParams = {}) => {
    dispatch(LOAD_MARKET_ITEMS_START());

    return axios
      .get(
        `${
          extraParams.isServer ? '' : FRONTEND_PREFIX
        }${BACKEND_URL}/public/getmarketsummaries`,
        {
          validateStatus: (status: number) => {
            return status < 400;
          },
        },
      )
      .then(
        (response: AxiosResponse) => {
          dispatch(
            LOAD_MARKET_ITEMS_SUCCESS(
              response.data.result.map((item: IMarketItem) => {
                if (typeof localStorage !== 'undefined') {
                  item.favorite = !!localStorage.getItem(item.MarketName);
                }

                return item;
              }),
            ),
          );

          return response;
        },
        (error: AxiosError) => {
          dispatch(LOAD_MARKET_ITEMS_FAILURE());

          throw error;
        },
      );
  };
};

export const SET_FAVORITE_SUCCESS = (MarketName: string, state: boolean) => ({
  type: actions.SET_FAVORITE_SUCCESS,
  MarketName,
  state,
});

export const SET_SORTING = (name: string) => ({
  type: actions.SET_SORTING,
  name,
});

export const SET_FAVORITE = (
  MarketName: string,
  state: boolean,
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch) => {
    if (state) {
      localStorage.setItem(MarketName, 'true');
    } else {
      localStorage.removeItem(MarketName);
    }

    dispatch(SET_FAVORITE_SUCCESS(MarketName, state));
  };
};

export const SET_DEFAULT_SUCCESS = (MarketName: string) => ({
  type: actions.SET_DEFAULT_SUCCESS,
  name: MarketName,
});

export const SET_DEFAULT = (
  MarketName: string,
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch) => {
    localStorage.setItem(defaultCurrencyKey, MarketName);
    dispatch(SET_DEFAULT_SUCCESS(MarketName));
  };
};
