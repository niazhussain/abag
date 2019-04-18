import { LOAD_MARKET_ITEMS } from '../../store/actions/market';

export const loadMarketItems = async ({ store, res }) => {
  await LOAD_MARKET_ITEMS()(store.dispatch, store.getState, {
    isServer: !!res,
  });

  return {};
};
